const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connexion MongoDB réussie');
  } catch (error) {
    console.error('Erreur MongoDB :', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
