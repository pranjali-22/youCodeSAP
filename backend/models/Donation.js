// models/Donation.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the donation schema
const donationSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    perishable: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: Date, // Store the expiry date as a Date
        required: true
    },
    location: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the timestamp when the donation is created
    },
    dispatched: {
        type: Boolean,
        default: false
    },
    pickedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // references dispatcher (user model)
        default: null
    }  
});

// Create the Donation model
const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
