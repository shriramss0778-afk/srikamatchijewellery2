const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  order: { type: Number, required: true, default: 0 },
  isUsed: { type: Boolean, default: false },
  usedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

imageSchema.index({ order: 1 });

module.exports = mongoose.model('Image', imageSchema);