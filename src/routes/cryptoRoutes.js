import express from 'express';
import {
  createCrypto,
  getAllCryptos,
  getNewListings,
  getTopGainers,
} from '../controllers/cryptoController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllCryptos);
router.get('/gainers', getTopGainers);
router.get('/new', getNewListings);
router.post('/', protect, adminOnly, createCrypto);

export default router;
