import express from 'express';
import { getRooms, getRoom, createRoom, updateRoom, deleteRoom } from '../controllers/rooms';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/', getRooms);
router.get('/:id', getRoom);
router.post('/', authMiddleware, adminMiddleware, createRoom);
router.put('/:id', authMiddleware, adminMiddleware, updateRoom);
router.delete('/:id', authMiddleware, adminMiddleware, deleteRoom);

export default router;
