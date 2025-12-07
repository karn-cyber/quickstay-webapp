import express from 'express';
import { createBooking, getMyBookings, getAllBookings, getBookingStats, cancelBooking, updateBookingStatus } from '../controllers/bookings';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/', authMiddleware, createBooking);
router.get('/my-bookings', authMiddleware, getMyBookings);
router.get('/stats', authMiddleware, adminMiddleware, getBookingStats);
router.get('/', authMiddleware, adminMiddleware, getAllBookings);
router.patch('/:id/cancel', authMiddleware, cancelBooking);
router.patch('/:id/status', authMiddleware, adminMiddleware, updateBookingStatus);

export default router;
