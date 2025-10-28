// models/User.js
const mongoose = require('mongoose');
const { use } = require('react');

// Define the schema for a user
const billSchema = new mongoose.Schema({
    product_name: { type: String, required: true },       // Name is required
    bill_photo_url: { type: String, required: true },     // Email is required and unique
    warranty_expiration_date: { type: Date},
    purchase_date: { type: Date },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    keywords: { type: [String] }
});

// Export the model for use in controllers
module.exports = mongoose.model('Bill', billSchema);
