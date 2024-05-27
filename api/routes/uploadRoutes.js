// routes/uploadRoutes.js
const express = require('express');
const { uploadByLink, upload, uploadmulter } = require('../controllers/uploadController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/upload-by-link', authenticate, uploadByLink);
router.post('/upload', authenticate, uploadmulter.array('photos', 100), upload);

module.exports = router;
