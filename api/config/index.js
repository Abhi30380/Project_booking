// config/index.js
require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "ajsdjfoienfsdfja",
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT || 3000,
};