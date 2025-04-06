// index.js

// Import necessary libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes'); // Import routes for user (for example)
const donationRoutes = require('./routes/donationRoutes');


dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an instance of an Express app

// Middleware setup
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming requests with JSON payloads

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});