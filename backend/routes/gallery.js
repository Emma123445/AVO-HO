const express = require("express");
const router = express.Router();
const AnalyzedPagne = require("../models/AnalyzedPagne");

router.get("/", async (req, res) => {
  try {
    const pagnes = await AnalyzedPagne.find().sort({ createdAt: -1 });
    res.json(pagnes);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
