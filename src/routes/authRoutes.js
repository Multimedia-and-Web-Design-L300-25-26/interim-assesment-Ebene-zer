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

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getProfile);
router.get('/admin/users', protect, adminOnly, getRegisteredUsers);

export default router;
