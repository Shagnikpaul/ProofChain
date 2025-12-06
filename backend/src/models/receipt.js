import mongoose from 'mongoose';

// Define the schema for a bill
const billSchema = new mongoose.Schema({
    product_name: { type: String, required: true },       
    bill_photo_url: { type: String, required: true },     
    warranty_expiration_date: { type: Date},
    purchase_date: { type: Date },
    uuid: { type: String, required: true },
    keywords: { type: [String] }
});

// Export the model for use in controllers
const receipt = mongoose.model('receipt', billSchema);
export default receipt;
