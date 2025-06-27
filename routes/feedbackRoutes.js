const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: 'Feedback saved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving feedback', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching feedbacks', error: err.message });
  }
});

module.exports = router;
