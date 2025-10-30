import receipt from '../models/receipt.js';

const uploadBill = async (req, res) => {
    const { product_name, bill_photo_url, warranty_expiration_date, purchase_date, keywords } = req.body;
    if (!product_name || !bill_photo_url ) {
        return res.status(400).json({ error: 'Product name, bill photo URL are required' });
    }
    try{
        const newBill = new receipt({ product_name, 
                                    bill_photo_url, 
                                    warranty_expiration_date: warranty_expiration_date ? new Date(warranty_expiration_date) : new Date('2025-12-31'),
                                    purchase_date: purchase_date ? new Date(purchase_date) : new Date('2025-10-29'), 
                                    uuid: req.userId, 
                                    keywords 
                                });
        await newBill.save();
        res.status(201).json({ message: 'Bill uploaded successfully', bill: newBill });
    }
    catch(err){
        console.error('Error uploading bill:', err);
        res.status(500).json({ error: 'Internal server error' });
    }   
};

const searchBills = async (req, res) => {
    const {product_name} = req.body;
    const user_id = req.userId;
    try{
        const bills = await receipt.find({ uuid: user_id, product_name});  
        res.status(201).json({ message: 'This is your bill', bill: bills });

        if (bills.length === 0) {
         return res.status(404).json({ message: "No bills found for this product" });
        }
    }
    catch(err){
        console.error('Error searching bill:', err);
        res.status(500).json({ error: 'Internal server error' });
    }   
}


const deleteBill = async (req, res) => {
    const {product_name} = req.body;
    const user_id = req.userId;
    try{
        const bills = await receipt.findOneAndDelete({ uuid:user_id, product_name}); 
        res.status(201).json({ message: 'Bill deleted successfully'});

        if(!bills){
         return res.status(404).json({ message: "No bills found for this product" });
        }
    }
    catch(err){
        console.error('Error searching bill:', err);
        res.status(500).json({ error: 'Internal server error' });
    }   
}

const editBill = async (req, res) => {
    const {product_name} = req.body;
    const user_id = req.userId;

    const updatedData = req.body;
    try {
        const updatedBill = await receipt.findOneAndUpdate(
            { uuid: user_id,product_name: product_name },       
            updatedData             
        );

        if (!updatedBill) {
            return res.status(404).json({ error: 'Bill not found' });
        }

        res.status(200).json({ message: 'Bill updated successfully', bill: updatedBill });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update bill' });
    } 
}

export { uploadBill, searchBills, deleteBill, editBill };

