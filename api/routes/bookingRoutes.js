// routes/bookingRoutes.js
const express = require('express');
const { createBooking, getBookings } = require('../controllers/bookingController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/booking', authenticate, createBooking);
router.get('/booking', authenticate, getBookings);

module.exports = router;
