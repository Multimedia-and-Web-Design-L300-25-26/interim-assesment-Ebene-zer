import express from 'express';
import { loginUser, logoutUser, registerUser, getProfile} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.post('/auth/logout', logoutUser);
router.get('/auth/profile', protect, getProfile);

export default router;
