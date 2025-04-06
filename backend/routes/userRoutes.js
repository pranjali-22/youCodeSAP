// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST route to create a new user
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, type} = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    //test
    // Create a new user
    const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        type
    });

    try {
        // Save the new user
        await newUser.save();
        res.status(201).json({
            message: 'User created successfully',
            user: {
              id: newUser._id,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email
            }
          });          
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

// POST /login route
router.post('/login', async (req, res) => {
    const { email, password, type } = req.body;
    console.log("here");

    try {
        const user = await User.findOne({ email });
        console.log("found user");
        console.log(email);
        console.log(user);

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

router.get('/getUser', async (req, res) => {
    try {
        const { userId } = req.query;
        const user = await User.findById(userId);

        res.status(200).json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            type: user.type
        });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching user', details: err });
    }
});

module.exports = router;
