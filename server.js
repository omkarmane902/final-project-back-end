require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const orderRoutes = require('./routes/orderRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/feedback', feedbackRoutes);

// Promo code route (optional)
app.post('/api/promocodes', (req, res) => {
  const { code, timestamp } = req.body;
  console.log(`Promo code applied: ${code} at ${timestamp}`);
  res.status(200).json({ message: 'Promo code usage recorded' });
});

// DB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));





app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
