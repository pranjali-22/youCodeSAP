const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    expirationDate: Date,
    location: String,
    donor: String,
    status: { type: String, default: 'available' }
});

module.exports = mongoose.model('FoodItem', FoodItemSchema);
