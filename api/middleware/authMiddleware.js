// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

function authenticate(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, jwtSecret, (err, userData) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.user = userData;
    next();
  });
}

function getUserDataFromToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, (err, userData) => {
      if (err) reject(err);
      resolve(userData);
    });
  });
}

module.exports = { authenticate, getUserDataFromToken };
