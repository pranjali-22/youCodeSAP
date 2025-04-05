// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST route to create a new user
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, type } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        type,
    });

    try {
        // Save the new user
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

module.exports = router;
