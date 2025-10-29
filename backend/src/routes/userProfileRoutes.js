// routes/userRoutes.js
import express from 'express';

import { editUser, deleteUser} from '../controllers/userProfileController.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// Map URLs to controller functions
router.post('/edit',verifyToken, editUser);
router.post('/delete',verifyToken, deleteUser)


export { router as userProfileRoutes };

