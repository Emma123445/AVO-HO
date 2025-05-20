require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Dossier des uploads
const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}
const uploadRoute = require('./routes/upload'); // Chemin correct vers ton fichier de route

app.use('/api', uploadRoute); // ou app.use('/api/upload', uploadRoute);


// Configurer multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// Route de test d'upload + "IA"
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucune image reçue' });
    }

    // Simule une "réponse IA"
    const fakeResponse = {
      name: "Kita",
      origin: "Mali",
      story: "Le pagne Kita est tissé à la main et symbolise la noblesse.",
      evolution: "Utilisé dans les cérémonies modernes au Mali et au Ghana.",
    };

    return res.json({ data: fakeResponse });
  } catch (err) {
    console.error("Erreur upload :", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(5000, () => {
  console.log('Serveur backend démarré sur http://localhost:5000');
});
