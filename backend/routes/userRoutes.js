// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST route to create a new user
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password} = req.body;

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
        password
    });

    try {
        // Save the new user
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

// POST /login route
router.post('/login', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                //type: user.type
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error during login' });
    }
});

module.exports = router;
