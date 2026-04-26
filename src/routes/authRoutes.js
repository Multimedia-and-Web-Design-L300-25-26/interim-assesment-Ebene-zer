import express from 'express';
import {
	getProfile,
	getRegisteredUsers,
	loginUser,
	logoutUser,
	registerUser,
} from '../controllers/authController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.post('/auth/logout', logoutUser);
router.get('/auth/profile', protect, getProfile);
router.get('/auth/admin/users', protect, adminOnly, getRegisteredUsers);

export default router;
