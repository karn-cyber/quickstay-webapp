import express from 'express';
import { createPaymentIntent, verifyPayment } from '../controllers/payments';
import { authMiddleware as auth } from '../middleware/auth';

const router = express.Router();

// Protect payment routes with auth middleware
router.post('/create-intent', auth, createPaymentIntent); // Keeping name for compatibility, but it creates Order
router.post('/verify', auth, verifyPayment);

export default router;
