// models/Pagne.js
const mongoose = require('mongoose');

const pagneSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  analysis: { type: String },
  uploadedAt: { type: Date, default: Date.now },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // facultatif
});

module.exports = mongoose.model('Pagne', pagneSchema);
