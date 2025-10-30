import mongoose from 'mongoose';

// Define the schema for a user
const userSchema = new mongoose.Schema({
    uuid: { type: String, required: true, unique: true }, // Unique identifier from Supabase
    name: { type: String, required: true },       // Name is required
    email: { type: String, required: true },     // Email is required and unique
    createdAt: { type: Date, default: Date.now } // Auto-generate timestamps
});

// Export the model for use in controllers
const User = mongoose.model('User', userSchema);
export default User;