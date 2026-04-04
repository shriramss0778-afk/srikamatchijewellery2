# 💎 Sri Kamatchi Jewellery — Poster Generator

A production-ready web application for generating branded jewellery promotional posters with automatic product image cycling, gold rate display, and WhatsApp sharing.

---

## ✅ What's Been Done

### 🖼️ Poster Canvas Redesign
- Product image now **covers the full poster canvas** as a background
- Dark gradient overlay (top + bottom) ensures text is always readable over any image
- Goddess image, logo, gold divider, rate box, and contact info are all **layered on top of the image**
- Empty state shows a placeholder when no image is generated yet

### 📱 Mobile Responsive Layout
- Full page is now mobile-friendly — stacks vertically on small screens, side-by-side on `lg+`
- Header simplified: logo on left, metal mode toggle on right
- Control panel and poster preview both scroll naturally on mobile
- `html, body, #root` overflow changed to allow scroll on mobile

### 💾 Download Fix
- Download now **waits for all images inside the poster to fully load** before capturing with html2canvas
- `backgroundColor` set to `#1a0a00` (no more transparent/black bleed)
- `allowTaint: false` + `useCORS: true` for correct cross-origin image rendering
- Anchor element appended/removed from `document.body` to fix silent download failures on some browsers

### 🌱 Database Seeding
- Added `server/seed.js` — clears the DB and seeds all 8 images from `KAAMACHI JEWELLERS/` folder
- All 8 images copied to `server/uploads/`
- Run once to populate MongoDB: `node seed.js`

### 🔄 Auto-Sync on Server Start
- Server automatically scans `uploads/` folder on every start via `autoSync()`
- If folder contents changed, DB is re-seeded preserving existing `isUsed` state
- No manual seeding needed after first setup

---

## 📋 Features

- **Automatic Image Cycling** — Cycles through all images in order (1 → 2 → ... → N → 1), never repeating until all are shown
- **Full-Canvas Product Image** — Product photo fills the entire poster; text overlays on top
- **Live Poster Preview** — Instant poster update with each "Generate" click
- **Gold Rate Display** — Enter live rates for 1g/8g gold (22K) and 1g silver (999)
- **Download Poster** — High-quality PNG export via html2canvas (2x resolution), fixed for all browsers
- **WhatsApp Sharing** — Web Share API with image Blob, fallback to auto-download + wa.me link
- **Mobile Responsive** — Works on phones, tablets, and desktops
- **Luxury Gold UI** — Cinzel + Playfair Display fonts, dark gold aesthetic

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Image Capture | html2canvas |
| File Uploads | Multer |

---

## ⚙️ Prerequisites

- Node.js v18+
- MongoDB running locally (or MongoDB Atlas URI)
- npm v9+

---

## 🚀 Setup & Installation

### 1. Clone / Extract the project

```bash
cd sri-kamatchi-jewellery
```

### 2. Configure Environment

Edit `server/.env`:

```env
MONGO_URI=mongodb://localhost:27017/sri-kamatchi-jewellery
PORT=5000
```

### 3. Install Dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 4. Seed the Database (first time only)

```bash
cd server
node seed.js
```

This clears the DB and inserts all 8 images from `server/uploads/`.

> After first setup, the server auto-syncs `uploads/` on every start — no need to re-run seed.

---

## ▶️ Running the Application

### Start MongoDB (if running locally)

```bash
mongod
```

### Start Backend Server

```bash
cd server
npm run dev       # development (nodemon)
# or
npm start         # production
```

Server runs at: `http://localhost:5000`

### Start Frontend Dev Server

```bash
cd client
npm run dev
```

App runs at: `http://localhost:5173`

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/next-image` | Get next unused image in order (auto-resets cycle when exhausted) |
| `POST` | `/api/reset-images` | Manually reset all images to unused (restart from #1) |
| `GET` | `/api/images` | Stats: total, used, remaining, next image order |
| `POST` | `/api/rescan` | Rescan `uploads/` folder and re-sync DB |
| `GET` | `/health` | Server health check |

---

## 🖼️ Image Cycling Logic

1. Images are sorted by `order` (filename prefix number, e.g. `IMAGE 1.png` → order 1)
2. First unused image (lowest order) is selected and marked `isUsed = true`
3. When all images are used → all reset to `isUsed = false` → cycle restarts from #1
4. On server start, `autoSync()` scans `uploads/` and updates DB if files changed

---

## 📁 Project Structure

```
sri-kamatchi-jewellery/
├── KAAMACHI JEWELLERS/            # Source images (IMAGE 1.png … IMAGE 8.png)
├── client/                        # React Vite frontend
│   ├── src/
│   │   ├── pages/
│   │   │   └── Editor.jsx         # Main layout, state, download/share logic
│   │   ├── components/
│   │   │   ├── PosterCanvas.jsx   # Full-canvas poster (image bg + text overlay)
│   │   │   └── ControlPanel.jsx   # Sidebar controls
│   │   ├── assets/
│   │   │   ├── logo_transparent.png
│   │   │   └── LOGO-removebg-preview.png
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css              # Tailwind + luxury gold styles
│   ├── vite.config.js             # Proxy: /api + /uploads → localhost:5000
│   └── package.json
├── server/
│   ├── models/Image.js            # Mongoose schema (imageUrl, order, isUsed, usedAt)
│   ├── routes/imageRoutes.js      # API routes + autoSync()
│   ├── uploads/                   # IMAGE 1.png … IMAGE 8.png (served statically)
│   ├── seed.js                    # One-time DB seeder
│   ├── server.js                  # Express entry + MongoDB connect + autoSync
│   ├── .env                       # MONGO_URI, PORT
│   └── package.json
└── README.md
```

---

## 🎨 Brand Details

| Field | Value |
|-------|-------|
| Shop Name | Sri Kamatchi Jewellery |
| Tagline | Premium Gold & Silver Collections |
| Contact | +91 9443565847 |
| Address | 156/1 S.S Kovil Street, Pollachi |

---

## 📱 WhatsApp Share Message

```
✨ Sri Kamatchi Jewellery 💎
💍 Premium Gold & Silver Collections
📍 Pollachi
📞 +91 9443565847
```

---

## 🔧 Production Build

```bash
cd client
npm run build
```

Serve `client/dist` with any static file server or configure Express to serve it.

---

## 📝 License

Private — Sri Kamatchi Jewellery, Pollachi
