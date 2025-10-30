import mongoose from 'mongoose';

// Define the schema for a bill
const billSchema = new mongoose.Schema({
    product_name: { type: String, required: true },       
    bill_photo_url: { type: String, required: true },     
    warranty_expiration_date: { type: Date},
    purchase_date: { type: Date },
    user_id: { type: String, required: true },
    keywords: { type: [String] }
});

// Export the model for use in controllers
const Bill = mongoose.model('Bill', billSchema);
export default Bill;
