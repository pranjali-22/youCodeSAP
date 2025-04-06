import express from 'express';
import DispatchedDonation from '../models/DispatchedDonation.js';

const router = express.Router();

// GET all dispatched donations
router.get('/', async (req, res) => {
    try {
        const donations = await DispatchedDonation.find()
            .populate('userId', 'firstName lastName email')  // optional
            .populate('donationId'); // optional
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
