// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();

// module.exports = function verifyToken(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "Token manquant" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // gère l’expiration
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Token invalide ou expiré" });
//   }
// };


