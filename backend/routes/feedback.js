const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');


router.post('/', async (req, res) => {
  try {
    const { name, rating, feedback } = req.body;

    const newFeedback = new Feedback({ name, rating, feedback });
    await newFeedback.save();

    console.log('✅ New Feedback Saved:', {
      name: newFeedback.name,
      rating: newFeedback.rating,
      feedback: newFeedback.feedback
    });

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error('❌ Error saving feedback:', err.message);
    res.status(500).json({ message: 'Error saving feedback' });
  }
});

module.exports = router;
