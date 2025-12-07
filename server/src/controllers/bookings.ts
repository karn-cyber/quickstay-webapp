import { Request, Response } from 'express';
import Booking from '../models/Booking';
import { AuthRequest } from '../middleware/auth';

export const createBooking = async (req: AuthRequest, res: Response) => {
    try {
        const { room, hotelName, hotelImage, checkInDate, checkOutDate, totalPrice } = req.body;

        if (!hotelName) {
            return res.status(400).json({ message: 'Hotel name is required' });
        }

        const newBooking = new Booking({
            user: req.userId,
            room,
            hotelName,
            hotelImage,
            checkInDate,
            checkOutDate,
            totalPrice,
            status: 'confirmed'
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error: any) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: error.message || 'Error creating booking' });
    }
};

export const getMyBookings = async (req: AuthRequest, res: Response) => {
    try {
        const bookings = await Booking.find({ user: req.userId }).sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Error fetching bookings' });
    }
};

export const getAllBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await Booking.find().populate('user').sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all bookings' });
    }
};

// Admin analytics endpoint
export const getBookingStats = async (req: Request, res: Response) => {
    try {
        // Total bookings
        const totalBookings = await Booking.countDocuments();

        // Total revenue
        const revenueResult = await Booking.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: '$totalPrice' }
                }
            }
        ]);
        const totalRevenue = revenueResult[0]?.total || 0;

        // Bookings by status
        const bookingsByStatus = await Booking.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Monthly bookings (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const monthlyBookings = await Booking.aggregate([
            {
                $match: {
                    createdAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    count: { $sum: 1 },
                    revenue: { $sum: '$totalPrice' }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        ]);

        // Top hotels by bookings
        const topHotels = await Booking.aggregate([
            {
                $group: {
                    _id: '$hotelName',
                    bookings: { $sum: 1 },
                    revenue: { $sum: '$totalPrice' }
                }
            },
            {
                $sort: { bookings: -1 }
            },
            {
                $limit: 5
            }
        ]);

        // Recent bookings
        const recentBookings = await Booking.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('user', 'name email');

        res.json({
            totalBookings,
            totalRevenue,
            bookingsByStatus,
            monthlyBookings,
            topHotels,
            recentBookings
        });
    } catch (error) {
        console.error('Error fetching booking stats:', error);
        res.status(500).json({ message: 'Error fetching booking statistics' });
    }
};

// Cancel a booking
export const cancelBooking = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Check if user owns this booking
        if (booking.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized to cancel this booking' });
        }

        // Check if already cancelled
        if (booking.status === 'cancelled') {
            return res.status(400).json({ message: 'Booking is already cancelled' });
        }

        // Update booking status to cancelled
        booking.status = 'cancelled';
        await booking.save();

        res.json({ message: 'Booking cancelled successfully', booking });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).json({ message: 'Error cancelling booking' });
    }
};

// Update booking status (Admin only)
export const updateBookingStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status
        const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const booking = await Booking.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true }
        ).populate('user', 'name email');

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json({ message: 'Booking status updated successfully', booking });
    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).json({ message: 'Error updating booking status' });
    }
};
