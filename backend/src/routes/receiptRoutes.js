import express from 'express';

import { uploadBill, searchBills, deleteBill, editBill } from '../controllers/receiptController.js';
import verifyToken  from '../middleware/auth.js';

const router = express.Router();

// Map URLs to controller functions
router.post('/upload', verifyToken, uploadBill);
router.post('/search', verifyToken, searchBills);
router.post('/delete/:billId', verifyToken,deleteBill);
router.post('/edit/:billId', verifyToken, editBill);

export { router as receiptRoutes };
