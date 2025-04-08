const mongoose = require('mongoose');

const moderatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  university: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Moderator', moderatorSchema);
