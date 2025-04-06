import mongoose from 'mongoose';

const dispatchedDonationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    donationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',
        required: true
    },
    dispatchDate: {
        type: Date,
        default: Date.now
    }
});

const DispatchedDonation = mongoose.model('DispatchedDonation', dispatchedDonationSchema);
export default DispatchedDonation;
