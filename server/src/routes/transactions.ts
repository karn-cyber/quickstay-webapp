import express from 'express';
import { getTransactions, createTransaction } from '../controllers/transactions';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/', authMiddleware, getTransactions);
router.post('/', authMiddleware, createTransaction);

export default router;
