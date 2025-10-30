import Bill from '../models/Bill.js';

const uploadBill = async (req, res) => {
    uuid = req.params.uuid;
    const { product_name, bill_photo_url, warranty_expiration_date, purchase_date, keywords } = req.body;
    if (!product_name || !bill_photo_url ) {
        return res.status(400).json({ error: 'Product name, bill photo URL are required' });
    }
    try{
        const newBill = new Bill({ product_name, 
                                    bill_photo_url, 
                                    warranty_expiration_date:new Date('2025-12-31') || warranty_expiration_date, 
                                    purchase_date: new Date('2025-10-29'), 
                                    uuid, 
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

const searchBill = async (req, res) => {
    product_name = req.body.product_name;
    try{
        const bills = await Bill.find({ product_name: product_name }); 
        res.status(201).json({ message: 'This is your bill', bill: bills });
    }
    catch(err){
        console.error('Error searching bill:', err);
        res.status(500).json({ error: 'Internal server error' });
    }   
}


const deleteBill = async (req, res) => {
    product_name = req.body.product_name;
    try{
        const bills = await Bill.findOneAndDelete({ product_name: product_name }); 
        res.status(201).json({ message: 'Bill deleted successfully'});
    }
    catch(err){
        console.error('Error searching bill:', err);
        res.status(500).json({ error: 'Internal server error' });
    }   
}

const editBill = async (req, res) => {
    product_name = req.body.product_name;
    const updatedData = req.body;
    try {
        const updatedBill = await User.findOneAndUpdate(
            { product_name: product_name },       
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

export { uploadBill, searchBill, deleteBill, editBill };

