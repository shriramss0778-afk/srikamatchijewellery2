require('dotenv').config();
const mongoose = require('mongoose');
const Image = require('./models/Image');

const images = [
  'IMAGE 1.png','IMAGE 2.png','IMAGE 3.png','IMAGE 4.png',
  'IMAGE 5.png','IMAGE 6.png','IMAGE 7.png','IMAGE 8.png',
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Image.deleteMany({});
  await Image.insertMany(
    images.map((file, i) => ({
      imageUrl: `/uploads/${file}`,
      order: i + 1,
      isUsed: false,
      usedAt: null,
    }))
  );
  console.log(`✅ Seeded ${images.length} images`);
  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });
