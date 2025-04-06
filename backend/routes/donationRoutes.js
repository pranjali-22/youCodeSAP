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
      const donations = await Donation.find().populate('userId', '_id firstName lastName').populate('pickedBy', 'firstName lastName');      // You can add filters here if needed
        res.status(200).json(donations);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching donations', details: err });
    }
});

router.put('/dispatch', async (req, res) => {
    try {
      const { donationIds, dispatcherId } = req.body; // expects an array of IDs
  
      if (!Array.isArray(donationIds) || donationIds.length === 0) {
        return res.status(400).json({ message: 'No donation IDs provided' });
      }
  
      const result = await Donation.updateMany(
        { _id: { $in: donationIds } },
        { $set: { dispatched: true, pickedBy: dispatcherId } }
      );
  
      res.json({ message: 'Dispatch updated successfully', updatedCount: result.modifiedCount });
    } catch (error) {
      console.error('Error updating dispatch:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
module.exports = router;
