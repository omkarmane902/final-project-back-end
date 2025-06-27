const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  feedback: { type: String, required: true },
  serviceRating: { type: Number, required: true },
  foodQualityRating: { type: Number, required: true },
  atmosphereRating: { type: Number, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);
