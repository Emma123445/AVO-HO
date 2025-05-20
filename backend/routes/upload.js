require('dotenv').config();
const multer = require("multer");
const express = require("express");
const path = require("path");
const fs = require("fs");
const { OpenAI } = require("openai");
const Pagne = require("../models/pagne");

const router = express.Router();

// Config multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Format d'image non autorisé. JPG ou PNG requis."), false);
  }
};

const upload = multer({ storage, fileFilter });

const xaiClient = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier n’a été envoyé." });
    }

    const imagePath = path.join(__dirname, "..", "uploads", req.file.filename);
    const base64Image = fs.readFileSync(imagePath, { encoding: "base64" });

    const imageSizeMB = Buffer.byteLength(base64Image, "base64") / (1024 * 1024);
    if (imageSizeMB > 4) {
      fs.unlinkSync(imagePath);
      return res.status(400).json({ error: "L’image dépasse la limite de 4 Mo." });
    }

    const mimeType = req.file.mimetype;

    const response = await xaiClient.chat.completions.create({
      model: "grok-2-vision-1212",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Décris ce pagne africain sous forme JSON structuré avec les champs suivants :
              {
                "name": "Nom du pagne",
                "origin": "Pays ou région d'origine",
                "story": "Histoire culturelle et traditionnelle",
                "evolution": "Évolution dans le temps et utilisation moderne"
              }`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const content = response.choices?.[0]?.message?.content || "{}";

    let data;
    try {
      data = JSON.parse(content);
    } catch (parseError) {
      console.warn("Réponse non JSON, on renvoie texte brut.");
      return res.status(200).json({
        analysis: content,
        raw: true,
      });
    }

    await Pagne.create({
      imageName: req.file.originalname,
      imageData: base64Image,
      description: JSON.stringify(data),
    });

    fs.unlinkSync(imagePath);

    res.status(200).json({ data });
  } catch (err) {
    console.error("Erreur upload ou appel API xAI :", err);
    res.status(500).json({
      error: err.message || "Erreur lors de la description.",
    });
  }
  
});

module.exports = router;
