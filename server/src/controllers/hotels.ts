import { Request, Response } from 'express';
import Hotel from '../models/Hotel';
import { searchHotels as searchAmadeusHotels } from '../services/hotelService';
import { AuthRequest } from '../middleware/auth';

// GET all hotels with pagination, sorting, filtering, and search
export const getAllHotels = async (req: Request, res: Response) => {
    try {
        const {
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            order = 'desc',
            search = '',
            minPrice,
            maxPrice,
            minRating,
            amenities
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

        // Rating filtering
        if (minRating) {
            filter.rating = { $gte: parseFloat(minRating as string) };
        }

        // Amenities filtering
        if (amenities) {
            const amenitiesList = (amenities as string).split(',');
            filter.amenities = { $all: amenitiesList };
        }

        // Text search
        if (search) {
            filter.$text = { $search: search as string };
        }

        // Build sort object
        const sortOrder = order === 'asc' ? 1 : -1;
        const sort: any = { [sortBy as string]: sortOrder };

        // Execute query
        const hotels = await Hotel.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limitNum);

        const total = await Hotel.countDocuments(filter);

        res.json({
            data: hotels,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).json({ message: 'Error fetching hotels' });
    }
};

// GET hotel search (legacy endpoint - uses Amadeus service with fallback to mock)
export const search = async (req: Request, res: Response) => {
    try {
        const { location = 'ALL' } = req.query;
        const hotels = await searchAmadeusHotels(location as string);
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: 'Error searching hotels' });
    }
};

// GET hotel by ID
export const getHotelById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Try to find in database first (only if it looks like a MongoDB ObjectId)
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            const hotel = await Hotel.findById(id);
            if (hotel) {
                return res.json(hotel);
            }
        }

        // If not found in DB or not a valid ObjectId, try to get from mock data
        const hotels = await searchAmadeusHotels('ALL');
        const hotel = hotels.find((h: any) => h.id === id);

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        res.json(hotel);
    } catch (error) {
        console.error('Error fetching hotel:', error);
        res.status(500).json({ message: 'Error fetching hotel details' });
    }
};

// CREATE hotel (Admin only)
export const createHotel = async (req: AuthRequest, res: Response) => {
    try {
        const hotelData = req.body;

        const hotel = new Hotel(hotelData);
        await hotel.save();

        res.status(201).json(hotel);
    } catch (error: any) {
        console.error('Error creating hotel:', error);
        res.status(500).json({ message: error.message || 'Error creating hotel' });
    }
};

// UPDATE hotel (Admin only)
export const updateHotel = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const hotel = await Hotel.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        res.json(hotel);
    } catch (error: any) {
        console.error('Error updating hotel:', error);
        res.status(500).json({ message: error.message || 'Error updating hotel' });
    }
};

// DELETE hotel (Admin only)
export const deleteHotel = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const hotel = await Hotel.findByIdAndDelete(id);

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        // TODO: Also delete related rooms and bookings in production
        res.json({ message: 'Hotel deleted successfully', hotel });
    } catch (error: any) {
        console.error('Error deleting hotel:', error);
        res.status(500).json({ message: error.message || 'Error deleting hotel' });
    }
};
