const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Student = require('../models/studentmodel');

// Register
router.post('/register', async (req, res) => {
  try {
    const existing = await Student.findOne({ email: req.body.email });
    if (existing) return res.status(400).json({ message: 'Student already exists' });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const student = new Student({ ...req.body, password: hashedPassword });
    await student.save();
    res.status(201).json({ message: 'Student registered!', student });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.body.email });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const isMatch = await bcrypt.compare(req.body.password, student.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const { password, ...studentData } = student.toObject();
    res.json({ message: 'Login successful', student: studentData });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
