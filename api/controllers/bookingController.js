// controllers/bookingController.js
const Booking = require('../models/booking');
const { getUserDataFromToken } = require('../middleware/authMiddleware');

const createBooking = async (req, res) => {
  const userData = await getUserDataFromToken(req);
  const { place, checkIn, checkOut, mobile, numberOfGuests, name, price } = req.body;
  try {
    const booking = await Booking.create({
      place,
      checkIn,
      checkOut,
      mobile,
      numberOfGuests,
      name,
      price,
      user: userData.id,
    });
    res.json(booking);
  } catch (err) {
    res.status(422).json(err);
  }
};

const getBookings = async (req, res) => {
  const userData = await getUserDataFromToken(req);
  const bookings = await Booking.find({ user: userData.id }).populate('place');
  res.json(bookings);
};

module.exports = { createBooking, getBookings };
