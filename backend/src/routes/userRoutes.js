// routes/userRoutes.js
import express from 'express';

import { loginUser } from '../controllers/userController.js';
import { registerUser } from '../controllers/userController.js';

const router = express.Router();

// Map URLs to controller functions
router.post('/login', loginUser);     
router.post('/register', registerUser); 

export { router as userRoutes };
