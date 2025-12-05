import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import { AuthRequest } from '../middleware/auth';

export const getTransactions = async (req: AuthRequest, res: Response) => {
    try {
        const transactions = await Transaction.find({ user: req.userId }).populate('booking');
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions' });
    }
};

export const createTransaction = async (req: AuthRequest, res: Response) => {
    try {
        const { booking, amount, type } = req.body;

        const newTransaction = new Transaction({
            user: req.userId,
            booking,
            amount,
            type,
            status: 'success' // Simulating successful payment
        });

        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Error creating transaction' });
    }
};
