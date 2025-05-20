const mongoose = require("mongoose");

const analyzedPagneSchema = new mongoose.Schema({
  name: String,
  origin: String,
  story: String,
  evolution: String,
  imageUrl: String, // Optionnel si tu sauvegardes l’image ou l’URL
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AnalyzedPagne", analyzedPagneSchema);
