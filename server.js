const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());

// ✅ Serve frontend files like login.html from public/
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ Mongo Error:', err));

// Routes
const studentRoutes = require('./routes/students');
const modRoutes = require('./routes/moderators');
const oppRoutes = require('./routes/opportunities');

app.use('/api/students', studentRoutes);
app.use('/api/moderators', modRoutes);
app.use('/api/opportunities', oppRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
