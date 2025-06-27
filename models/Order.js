const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{ name: String, price: Number, quantity: Number, image: String }],
  totalPrice: Number,
  packingCharge: Number,
  discount: Number,
  finalPrice: Number,
  tableNumber: String,
  paymentScreenshot: String, // base64 string
  status: { type: String, default: 'Pending' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
