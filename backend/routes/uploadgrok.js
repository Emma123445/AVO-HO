const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { OpenAI } = require("openai");
const verifyToken = require("../middlewares/verifyToken");
const Pagne = require("../models/pagne");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

// Configuration du client pour l'API xAI
const xaiClient = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1", // URL de l'API xAI
});

// Route POST : Upload d’image + description avec Grok-2-vision-1212
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    // Vérifier si un fichier a été envoyé
    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier n’a été envoyé." });
    }

    // Chemin de l'image temporaire
    const imagePath = path.join(__dirname, "..", req.file.path);
    const base64Image = fs.readFileSync(imagePath, { encoding: "base64" });

    // Vérifier la taille de l'image (limite de 4 Mo pour xAI)
    const imageSizeMB =
      Buffer.byteLength(base64Image, "base64") / (1024 * 1024);
    if (imageSizeMB > 4) {
      fs.unlinkSync(imagePath); // Supprimer l'image temporaire
      return res
        .status(400)
        .json({ error: "L’image dépasse la limite de 4 Mo." });
    }

    // Appel à l'API xAI pour Grok-2-vision-1212
    const response = await xaiClient.chat.completions.create({
      model: "grok-2-vision-1212", // Modèle Grok pour la vision
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Décris ce pagne africain de manière artistique et culturelle.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 300, // Ajuste selon tes besoins
      temperature: 0.7, // Pour une réponse équilibrée (ajuste si besoin)
    });

    // Extraire la description
    const description =
      response.choices?.[0]?.message?.content || "Aucune description générée.";

    // Sauvegarde dans MongoDB
    await Pagne.create({
      imageName: req.file.originalname,
      imageData: base64Image,
      description,
    });

    // Suppression de l'image temporaire
    fs.unlinkSync(imagePath);

    // Réponse au client
    res.json({ analysis: description });
  } catch (err) {
    console.error("Erreur upload ou appel API xAI :", err);
    res.status(500).json({ error: "Erreur lors de la description." });
  }
});

module.exports = router;
