require('dotenv').config();
const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");
const Pagne = require("../models/pagne");

// Configuration du client pour l'API xAI
const xaiClient = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

const analyzePagne = async (req, res) => {
  let imagePath = null;
  try {
    // Vérifier si un fichier a été envoyé
    if (!req.file) {
      return res.status(400).json({ error: "Aucune image reçue" });
    }

    // Chemin de l'image temporaire
    const imagePath = path.join(__dirname, "..", "Uploads", req.file.filename);
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

    // Prompt pour Grok-2-vision-1212
    const prompt = `Tu es un expert en culture africaine. En analysant cette image, renvoie un objet JSON avec :
    - name : le **nom culturel ou local** du pagne s'il est connu (par exemple : “Nana Benz”, “Mon mari est capable”, “Fleurs de mariage”),
    - origin : le pays ou la région,
    - story : une histoire liée à ce motif de pagne,
    - evolution : son usage dans le temps.`;


    // Appel à l'API xAI
    const completion = await xaiClient.chat.completions.create({
      model: "grok-2-vision-1212",
      messages: [
        {
          role: "system",
          content: "Tu es un expert culturel africain en général et du Bénin en particulier.",
        },
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
      temperature: 0.7, // Pour une réponse équilibrée
    });

    // Extraire l'analyse
    const analysis =
      completion.choices[0].message.content || "Aucune analyse générée.";

    // Sauvegarde dans MongoDB
    const newPagne = new Pagne({
      imageUrl: `/Uploads/${req.file.filename}`, // ou cloudinary
      analysis,
      uploadedBy: req.user?.id || null, // Si authentification
    });

    await newPagne.save();

    // Supprimer l'image temporaire
    fs.unlinkSync(imagePath);

    // Réponse au client
    res.json({
      filename: req.file.filename,
      analysis,
      saved: true,
    });
  } catch (error) {
    console.error("Erreur lors de l’analyse :", error.message);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // Assurer la suppression en cas d'erreur
    }
    res.status(500).json({ error: "Erreur lors de l’analyse du pagne" });
  }
};

module.exports = { analyzePagne };
