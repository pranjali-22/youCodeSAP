const express = require('express');
const router = express.Router();
const DispatchedDonation = require('../models/DispatchedDonation');


// GET all dispatched donations
router.get('/getDispatchedDonations', async (req, res) => {
    
    try {
            const donations = await DispatchedDonation.find(); // You can add filters here if needed
            res.status(200).json(donations);
        } catch (err) {
            res.status(500).json({ error: 'Error fetching donations', details: err });
        }
});
router.post('/addDispatch', async (req, res) => {
    const { userId, donationId, dispatchDate } = req.body;

    if (!userId || !donationId) {
        return res.status(400).json({ message: 'userId and donationId are required.' });
    }

    try {
        const newDispatchedDonation = new DispatchedDonation({
            userId,
            donationId,
            dispatchDate: dispatchDate || Date.now()
        });

        const savedDonation = await newDispatchedDonation.save();
        res.status(201).json(savedDonation);
    } catch (error) {
        res.status(500).json({ message: 'Error saving dispatched donation', error });
    }
});
module.exports = router;
