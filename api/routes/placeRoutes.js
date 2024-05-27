// routes/placeRoutes.js
const express = require('express');
const { addPlace, getUserPlaces, getPlaceById, updatePlace, getAllPlaces } = require('../controllers/placeController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/places', authenticate, addPlace);
router.get('/user-places', authenticate, getUserPlaces);
router.get('/places/:id', getPlaceById);
router.put('/places', authenticate, updatePlace);
router.get('/places', getAllPlaces);

module.exports = router;
