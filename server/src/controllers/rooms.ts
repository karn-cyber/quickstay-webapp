import { Request, Response } from 'express';
import Room from '../models/Room';
import { AuthRequest } from '../middleware/auth';

// GET all rooms with pagination, sorting, and filtering
export const getAllRooms = async (req: Request, res: Response) => {
    try {
        const {
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            order = 'desc',
            minPrice,
            maxPrice,
            type,
            hotelId
        } = req.query;

        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        // Build filter query
        const filter: any = {};

        // Price range filtering
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseInt(minPrice as string);
            if (maxPrice) filter.price.$lte = parseInt(maxPrice as string);
        }

        // Room type filtering
        if (type) {
            filter.type = type;
        }

        // Hotel filtering
        if (hotelId) {
            filter.hotel = hotelId;
        }

        // Build sort object
        const sortOrder = order === 'asc' ? 1 : -1;
        const sort: any = { [sortBy as string]: sortOrder };

        // Execute query with hotel population
        const rooms = await Room.find(filter)
            .populate('hotel', 'name location')
            .sort(sort)
            .skip(skip)
            .limit(limitNum);

        const total = await Room.countDocuments(filter);

        res.json({
            data: rooms,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ message: 'Error fetching rooms' });
    }
};

// GET room by ID
export const getRoomById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const room = await Room.findById(id).populate('hotel');

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.json(room);
    } catch (error) {
        console.error('Error fetching room:', error);
        res.status(500).json({ message: 'Error fetching room details' });
    }
};

// CREATE room (Admin only)
export const createRoom = async (req: AuthRequest, res: Response) => {
    try {
        const roomData = req.body;

        const room = new Room(roomData);
        await room.save();

        const populatedRoom = await Room.findById(room._id).populate('hotel');
        res.status(201).json(populatedRoom);
    } catch (error: any) {
        console.error('Error creating room:', error);
        res.status(500).json({ message: error.message || 'Error creating room' });
    }
};

// UPDATE room (Admin only)
export const updateRoom = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const room = await Room.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        ).populate('hotel');

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.json(room);
    } catch (error: any) {
        console.error('Error updating room:', error);
        res.status(500).json({ message: error.message || 'Error updating room' });
    }
};

// DELETE room (Admin only)
export const deleteRoom = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const room = await Room.findByIdAndDelete(id);

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.json({ message: 'Room deleted successfully', room });
    } catch (error: any) {
        console.error('Error deleting room:', error);
        res.status(500).json({ message: error.message || 'Error deleting room' });
    }
};
