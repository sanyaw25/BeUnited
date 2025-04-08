const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  university: { type: String, required: true },
  year: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resumeURL: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
