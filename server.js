const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const weatherRoutes = require('./routes/weather');

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection with graceful fallback
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.log('MongoDB Warning: Running without DB history persistence (Check local MongoDB or Atlas URI).'));

// Routes
app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
});
