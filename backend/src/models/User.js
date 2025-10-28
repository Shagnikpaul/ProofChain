const mongoose = require('mongoose');

// Define the schema for a user
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },       // Name is required
    email: { type: String, required: true },     // Email is required and unique
    createdAt: { type: Date, default: Date.now } // Auto-generate timestamps
});

// Export the model for use in controllers
module.exports = mongoose.model('User', userSchema);
