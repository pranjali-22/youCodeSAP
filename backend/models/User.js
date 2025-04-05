// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For hashing passwords

// Define the User schema
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure the email is unique
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Basic email validation
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['donor', 'dispatch'], // Only allow 'donor' or 'dispatch'
    },
});

// Pre-save hook to hash password before saving it
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next(); // Skip if the password is not modified
    }

    // Generate a salt for hashing the password
    const salt = await bcrypt.genSalt(10);

    // Hash the password
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

// Method to compare passwords during login
UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Export the User model
const User = mongoose.model('User', UserSchema);
module.exports = User;
