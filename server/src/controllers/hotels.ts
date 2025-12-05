import { Request, Response } from 'express';
import { searchHotels, getHotelDetails } from '../services/hotelService';

export const search = async (req: Request, res: Response) => {
    try {
        const { location } = req.query;
        // Default to 'DEL' (Delhi) if no location provided for this demo
        const cityCode = (location as string) || 'DEL';

        const hotels = await searchHotels(cityCode);
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hotels' });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const hotel = await getHotelDetails(id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hotel details' });
    }
};
