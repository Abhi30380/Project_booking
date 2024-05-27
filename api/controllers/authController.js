// controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });
    res.json(user);
  } catch (e) {
    res.status(422).json(e);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
      jwt.sign({ email: user.email, id: user._id }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(user);
      });
    } else {
      res.status(422).json('wrong password');
    }
  } else {
    res.json('not found');
  }
};

const profile = async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (user) {
    res.json({ name: user.name, email: user.email, _id: user._id });
  } else {
    res.json(null);
  }
};

const logout = (req, res) => {
  res.cookie('token', '').json(true);
};

module.exports = { register, login, profile, logout };
