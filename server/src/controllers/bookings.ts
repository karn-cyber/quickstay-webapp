import { Request, Response } from 'express';
import Booking from '../models/Booking';
import { AuthRequest } from '../middleware/auth';

export const createBooking = async (req: AuthRequest, res: Response) => {
    try {
        const { room, checkInDate, checkOutDate, totalPrice } = req.body;

        const newBooking = new Booking({
            user: req.userId,
            room,
            checkInDate,
            checkOutDate,
            totalPrice,
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking' });
    }
};

export const getMyBookings = async (req: AuthRequest, res: Response) => {
    try {
        const bookings = await Booking.find({ user: req.userId }).populate('room');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings' });
    }
};

export const getAllBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await Booking.find().populate('user').populate('room');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all bookings' });
    }
};
