const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Moderator = require('../models/modmodel');

// Register
router.post('/register', async (req, res) => {
  try {
    const existing = await Moderator.findOne({ email: req.body.email });
    if (existing) return res.status(400).json({ message: 'Moderator already exists' });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const moderator = new Moderator({ ...req.body, password: hashedPassword });
    await moderator.save();
    res.status(201).json({ message: 'Moderator registered!', moderator });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const moderator = await Moderator.findOne({ email: req.body.email });
    if (!moderator) return res.status(404).json({ message: 'Moderator not found' });

    const isMatch = await bcrypt.compare(req.body.password, moderator.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const { password, ...modData } = moderator.toObject();
    res.json({ message: 'Login successful', moderator: modData });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
