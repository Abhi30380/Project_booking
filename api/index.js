// server.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { port } = require('./config');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const placeRoutes = require('./routes/placeRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));

app.use('/api', authRoutes);
app.use('/api', placeRoutes);
app.use('/api', uploadRoutes);
app.use('/api', bookingRoutes);

app.get('/test', (req, res) => {
  res.json('test ok');
});

app.listen(port, () => {
  console.log(`Listening on port ${port} ....`);
});
