// routes/donationRoutes.js
const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// POST route to add a donation
router.post('/add', async (req, res) => {
    const { userId, perishable, type, quantity, expiryDate, location } = req.body;

    // Ensure expiryDate is in the correct format (it should be a Date object)
    const donationExpiryDate = new Date(expiryDate);

    // Create a new donation instance
    const newDonation = new Donation({
        userId,
        perishable,
        type,
        quantity,
        expiryDate: donationExpiryDate,
        location
    });

    try {
        // Save the donation to the database
        await newDonation.save();
        res.status(201).json({ message: 'Donation added successfully', donation: newDonation });
    } catch (err) {
        res.status(500).json({ error: 'Error adding donation', details: err });
    }
});


// GET route to fetch all donations
router.get('/getDonations', async (req, res) => {
    try {
        const donations = await Donation.find(); // You can add filters here if needed
        res.status(200).json(donations);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching donations', details: err });
    }
});

module.exports = router;
