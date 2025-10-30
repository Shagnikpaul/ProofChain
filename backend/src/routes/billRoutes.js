import express from 'express';

import { uploadBill, searchBill, deleteBill, editBill } from '../controllers/billController.js';
import verifyToken  from '../middleware/auth.js';

const router = express.Router();

// Map URLs to controller functions
router.post('/upload', verifyToken, uploadBill);
router.post('/search', verifyToken, searchBill);
router.post('/delete', verifyToken,deleteBill);
router.post('/edit', verifyToken, editBill);

export { router as billRoutes };
