import express from 'express';
import { search, getHotelById, getAllHotels, createHotel, updateHotel, deleteHotel } from '../controllers/hotels';
import { authMiddleware, isAdmin } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/search', search); // Legacy endpoint for Amadeus/mock
router.get('/all', getAllHotels); // New endpoint with pagination/sorting/filtering
router.get('/:id', getHotelById);

// Admin routes
router.post('/', authMiddleware, isAdmin, createHotel);
router.put('/:id', authMiddleware, isAdmin, updateHotel);
router.delete('/:id', authMiddleware, isAdmin, deleteHotel);

export default router;
