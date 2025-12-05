import express from 'express';
import { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom } from '../controllers/rooms';
import { authMiddleware, isAdmin } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getAllRooms); // Get all rooms with pagination/filtering
router.get('/:id', getRoomById); // Get specific room

// Admin routes
router.post('/', authMiddleware, isAdmin, createRoom);
router.put('/:id', authMiddleware, isAdmin, updateRoom);
router.delete('/:id', authMiddleware, isAdmin, deleteRoom);

export default router;
