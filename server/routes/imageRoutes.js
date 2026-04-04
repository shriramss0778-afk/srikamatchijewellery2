const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Image = require('../models/Image');

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const IMAGE_EXTS = /\.(jpg|jpeg|png|webp|gif)$/i;

function nextUploadOrder() {
  const files = scanUploads();
  const maxOrder = files.reduce((max, file) => {
    const value = extractOrder(file);
    return value !== null ? Math.max(max, value) : max;
  }, 0);

  return maxOrder + 1;
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    if (typeof _req._nextUploadOrder !== 'number') {
      _req._nextUploadOrder = nextUploadOrder();
    }

    const safeBase = path
      .basename(file.originalname, path.extname(file.originalname))
      .replace(/[^a-zA-Z0-9-_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'image';

    const order = _req._nextUploadOrder++;
    cb(null, `${order}-${safeBase}${path.extname(file.originalname).toLowerCase()}`);
  },
});

const upload = multer({
  storage,
  limits: { files: 20, fileSize: 15 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (IMAGE_EXTS.test(file.originalname)) return cb(null, true);
    cb(new Error('Only image files are allowed'));
  },
});

// Extract leading number from filename e.g. "1_ring.jpg" → 1
function extractOrder(name) {
  const m = name.match(/^(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

// Scan uploads folder and return sorted file list
function scanUploads() {
  return fs.readdirSync(uploadsDir)
    .filter(f => IMAGE_EXTS.test(f))
    .sort((a, b) => {
      const na = extractOrder(a), nb = extractOrder(b);
      if (na !== null && nb !== null) return na - nb;
      return a.localeCompare(b);
    });
}

// Auto-sync: called on server start — seeds DB from uploads folder
async function autoSync() {
  const files = scanUploads();
  if (files.length === 0) {
    console.log('📂 No images in uploads/ folder. Add images and restart.');
    return;
  }

  const existing = await Image.find({}).sort({ order: 1 });
  const existingUrls = existing.map(i => i.imageUrl);
  const newUrls = files.map(f => `/uploads/${f}`);

  // Check if folder contents changed
  const same = existingUrls.length === newUrls.length &&
    existingUrls.every((u, i) => u === newUrls[i]);

  if (same) {
    console.log(`✅ Auto-sync: ${files.length} images already in DB (no changes).`);
    return;
  }

  // Re-seed DB preserving used status where possible
  const usedMap = {};
  existing.forEach(img => { usedMap[img.imageUrl] = { isUsed: img.isUsed, usedAt: img.usedAt }; });

  await Image.deleteMany({});

  const docs = files.map((f, i) => {
    const url = `/uploads/${f}`;
    const prev = usedMap[url];
    return {
      imageUrl: url,
      order: i + 1,
      isUsed: prev ? prev.isUsed : false,
      usedAt: prev ? prev.usedAt : null,
      createdAt: new Date(),
    };
  });

  await Image.insertMany(docs);
  console.log(`🔄 Auto-sync: ${docs.length} images loaded from uploads/ in order.`);
}

// GET /api/next-image — strict order cycling 1 → 2 → ... → N → 1
router.get('/next-image', async (req, res) => {
  try {
    const total = await Image.countDocuments();
    if (total === 0)
      return res.status(404).json({ error: 'No images found. Add images to server/uploads/ and restart.' });

    let image = await Image.findOne({ isUsed: false }).sort({ order: 1 });

    if (!image) {
      // Full cycle complete — reset and restart from 1
      await Image.updateMany({}, { $set: { isUsed: false, usedAt: null } });
      image = await Image.findOne({ isUsed: false }).sort({ order: 1 });
    }

    image.isUsed = true;
    image.usedAt = new Date();
    await image.save();

    const remaining = await Image.countDocuments({ isUsed: false });
    res.json({ imageUrl: image.imageUrl, order: image.order, remaining, total });
  } catch (err) {
    console.error('Next image error:', err);
    res.status(500).json({ error: 'Failed to get image', details: err.message });
  }
});

// POST /api/reset-images — restart cycle from image 1
router.post('/reset-images', async (req, res) => {
  try {
    const result = await Image.updateMany({}, { $set: { isUsed: false, usedAt: null } });
    res.json({ message: `Cycle reset. ${result.modifiedCount} images ready from #1.` });
  } catch (err) {
    res.status(500).json({ error: 'Reset failed', details: err.message });
  }
});

// POST /api/upload-images — upload photos from app and refresh DB order
router.post('/upload-images', upload.array('photos', 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No photos uploaded' });
    }

    await autoSync();

    res.json({
      message: `${req.files.length} photo${req.files.length > 1 ? 's' : ''} uploaded successfully.`,
      files: req.files.map((file) => ({
        filename: file.filename,
        imageUrl: `/uploads/${file.filename}`,
      })),
    });
  } catch (err) {
    console.error('Upload images error:', err);
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});


// GET /api/images — stats
router.get('/images', async (req, res) => {
  try {
    const total = await Image.countDocuments();
    const used = await Image.countDocuments({ isUsed: true });
    const next = await Image.findOne({ isUsed: false }).sort({ order: 1 });
    res.json({ total, used, remaining: total - used, nextImageOrder: next?.order || null });
  } catch (err) {
    res.status(500).json({ error: 'Failed', details: err.message });
  }
});

// GET /api/image-library — full image list for manual picking
router.get('/image-library', async (req, res) => {
  try {
    const files = scanUploads();

    res.json({
      images: files.map((file, index) => ({
        id: file,
        imageUrl: `/uploads/${file}`,
        order: index + 1,
        isUsed: false,
        usedAt: null,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load image library', details: err.message });
  }
});

module.exports = { router, autoSync };
