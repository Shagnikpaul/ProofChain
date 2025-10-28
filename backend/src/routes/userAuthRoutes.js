// routes/userRoutes.js
import express from 'express';

import { loginUser, refreshToken } from '../controllers/userAuthController.js';
import { registerUser } from '../controllers/userAuthController.js';

const router = express.Router();

// Map URLs to controller functions
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/refreshToken', refreshToken)


export { router as userRoutes };
