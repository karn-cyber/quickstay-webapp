import express from 'express';
import { createPaymentIntent } from '../controllers/payments';
import { authMiddleware as auth } from '../middleware/auth';

const router = express.Router();

// Protect payment routes with auth middleware
router.post('/create-intent', auth, createPaymentIntent);

export default router;
