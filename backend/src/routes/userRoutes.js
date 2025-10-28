// routes/userRoutes.js
import express from 'express';

import {loginUser} from '../controllers/userController.js';
import {registerUser} from '../controllers/userController.js';

const router = express.Router();

// Map URLs to controller functions
router.get('/', loginUser);     // GET /users → fetch all users
router.post('/', registerUser);  // POST /users → create a new user

module.exports = router;
