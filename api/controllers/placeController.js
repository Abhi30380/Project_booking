// controllers/placeController.js
const Place = require('../models/place');

const addPlace = async (req, res) => {
  const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
  const { id } = req.user;
  try {
    const place = await Place.create({
      owner: id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(place);
  } catch (e) {
    res.status(422).json(e);
  }
};

const getUserPlaces = async (req, res) => {
  const { id } = req.user;
  const places = await Place.find({ owner: id });
  res.json(places);
};

const getPlaceById = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  res.json(place);
};

const updatePlace = async (req, res) => {
  const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
  const place = await Place.findById(id);
  if (req.user.id === place.owner.toString()) {
    place.set({
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    await place.save();
    res.json('ok');
  } else {
    res.status(403).json('Forbidden');
  }
};

const getAllPlaces = async (req, res) => {
  const places = await Place.find({});
  res.json(places);
};

module.exports = { addPlace, getUserPlaces, getPlaceById, updatePlace, getAllPlaces };
