const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String, // "internship", "workshop", etc.
  postedBy: String,
  link: String
});

module.exports = mongoose.model('Opportunity', opportunitySchema);
