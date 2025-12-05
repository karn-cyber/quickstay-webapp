import Amadeus from 'amadeus';

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID || 'placeholder',
    clientSecret: process.env.AMADEUS_CLIENT_SECRET || 'placeholder',
});

// Mock data for when API keys are missing
const MOCK_HOTELS = [
    {
        id: '1',
        name: 'The Taj Mahal Palace',
        location: {
            latitude: 18.9217,
            longitude: 72.8332,
            address: 'Apollo Bunder, Mumbai, Maharashtra 400001'
        },
        description: 'Iconic luxury hotel overlooking the Gateway of India.',
        rating: 4.9,
        price: 25000,
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        amenities: ['Pool', 'Spa', 'Sea View', 'Fine Dining']
    },
    {
        id: '2',
        name: 'ITC Grand Chola',
        location: {
            latitude: 13.0105,
            longitude: 80.2205,
            address: 'No. 63, Mount Road, Guindy, Chennai, Tamil Nadu 600032'
        },
        description: 'A palatial tribute to Southern India\'s golden age.',
        rating: 4.8,
        price: 18000,
        images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        amenities: ['Luxury Spa', 'Multiple Pools', 'Banquet Hall', 'Gym']
    },
    {
        id: '3',
        name: 'The Leela Palace',
        location: {
            latitude: 28.5823,
            longitude: 77.1870,
            address: 'Diplomatic Enclave, Chanakyapuri, New Delhi, Delhi 110023'
        },
        description: 'Experience the grandeur of Indian royalty in the capital.',
        rating: 4.9,
        price: 22000,
        images: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        amenities: ['Rooftop Pool', 'Fine Dining', 'Spa', 'Butler Service']
    },
    {
        id: '4',
        name: 'Trident Nariman Point',
        location: {
            latitude: 18.9270,
            longitude: 72.8230,
            address: 'Nariman Point, Mumbai, Maharashtra 400021'
        },
        description: 'Stunning views of the Marine Drive and the ocean.',
        rating: 4.6,
        price: 15000,
        images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        amenities: ['Ocean View', 'Pool', 'Business Center', 'Bar']
    },
    {
        id: '5',
        name: 'Taj Connemara',
        location: {
            latitude: 13.0628,
            longitude: 80.2642,
            address: 'Binny Road, Chennai, Tamil Nadu 600002'
        },
        description: 'Chennai\'s only heritage hotel, blending history with modern luxury.',
        rating: 4.7,
        price: 12000,
        images: ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        amenities: ['Heritage Walk', 'Pool', 'Verandah Dining', 'Spa']
    },
    {
        id: '6',
        name: 'The Oberoi',
        location: {
            latitude: 28.6015,
            longitude: 77.2269,
            address: 'Dr. Zakir Hussain Marg, New Delhi, Delhi 110003'
        },
        description: 'Contemporary luxury in the heart of New Delhi.',
        rating: 4.9,
        price: 28000,
        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        amenities: ['Golf Course View', 'Air Purification', '24hr Spa', 'Fine Dining']
    }
];

export const searchHotels = async (cityCode: string) => {
    if (!process.env.AMADEUS_CLIENT_ID || process.env.AMADEUS_CLIENT_ID === 'placeholder') {
        console.log('Using mock hotel data (Amadeus keys missing)');
        if (cityCode && cityCode !== 'ALL') {
            const lowerCity = cityCode.toLowerCase();
            return MOCK_HOTELS.filter(h =>
                h.location.address.toLowerCase().includes(lowerCity) ||
                h.location.address.toLowerCase().includes(cityCode.toLowerCase())
            );
        }
        return MOCK_HOTELS;
    }

    try {
        const response = await amadeus.shopping.hotelOffers.get({
            cityCode: cityCode,
            page: { limit: 10 }
        });
        return response.data;
    } catch (error) {
        console.error('Amadeus API Error:', error);
        return MOCK_HOTELS; // Fallback to mock on error
    }
};

export const getHotelDetails = async (hotelId: string) => {
    if (!process.env.AMADEUS_CLIENT_ID || process.env.AMADEUS_CLIENT_ID === 'placeholder') {
        return MOCK_HOTELS.find(h => h.id === hotelId) || MOCK_HOTELS[0];
    }

    try {
        // Note: Amadeus Hotel Offers might not give full details by ID directly in the same way, 
        // this is a simplified example. In a real app, you'd use the hotel-sentiment or similar endpoints.
        // For now, we'll return mock data even if keys exist because the free tier has limitations.
        return MOCK_HOTELS.find(h => h.id === hotelId) || MOCK_HOTELS[0];
    } catch (error) {
        console.error('Amadeus API Error:', error);
        return MOCK_HOTELS[0];
    }
};
