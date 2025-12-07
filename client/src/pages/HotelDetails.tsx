import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, User, Phone, Car, Utensils, Wifi, Loader2 } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/ui/Button';
import api from '../lib/api';
import MapComponent from '../components/MapComponent';

interface Hotel {
    id: string;
    name: string;
    location: {
        latitude: number;
        longitude: number;
        address: string;
    };
    description: string;
    rating: number;
    price: number;
    images: string[];
    amenities: string[];
}

const HotelDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [loading, setLoading] = useState(true);
    const [guests, setGuests] = useState(2);
    const [roomType, setRoomType] = useState<'standard' | 'double' | 'spa' | 'suite'>('standard');
    const [addons, setAddons] = useState({
        breakfast: false,
        carRental: false,
        airportShuttle: false,
    });

    // Room type pricing multipliers
    const roomTypeMultipliers = {
        standard: { multiplier: 1, name: 'Standard Room', description: 'Comfortable room with essential amenities' },
        double: { multiplier: 1.3, name: 'Double Bed Room', description: 'Spacious room with king-size bed' },
        spa: { multiplier: 1.6, name: 'Spa Suite', description: 'Luxury room with spa and wellness facilities' },
        suite: { multiplier: 2, name: 'Premium Suite', description: 'Ultimate luxury with separate living area' },
    };

    // Calculate dynamic price
    const calculatePrice = () => {
        if (!hotel) return 0;
        const basePrice = hotel.price;

        // Guest multiplier: base is for 2 guests, doubles for 4, etc.
        const guestMultiplier = guests / 2;

        // Room type multiplier
        const roomMultiplier = roomTypeMultipliers[roomType].multiplier;

        return Math.round(basePrice * guestMultiplier * roomMultiplier);
    };

    const finalPrice = calculatePrice();

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await api.get(`/hotels/${id}`);
                setHotel(response.data);
            } catch (err) {
                console.error('Failed to fetch hotel details', err);
            } finally {
                setLoading(false);
            }
        };

        fetchHotel();
    }, [id]);

    const handleBooking = () => {
        // Navigate to checkout with hotel, addons, and pricing data
        navigate('/checkout', { state: { hotel, addons, guests, roomType, finalPrice } });
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-screen">
                    <Loader2 className="animate-spin text-blue-600" size={48} />
                </div>
            </MainLayout>
        );
    }

    if (!hotel) {
        return (
            <MainLayout>
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-gray-900">Hotel not found</h2>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                    <div className="flex flex-wrap items-center text-sm md:text-base text-gray-600">
                        <MapPin size={18} className="mr-1 text-blue-600 flex-shrink-0" />
                        <span className="mr-2">{hotel.location.address}</span>
                        <span className="hidden sm:inline mx-2">•</span>
                        <div className="flex items-center mt-1 sm:mt-0">
                            <Star size={18} className="mr-1 text-yellow-400 fill-current" />
                            <span>{hotel.rating} / 5.0</span>
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="mb-12 rounded-2xl overflow-hidden">
                    {/* Main image always visible */}
                    <div className="w-full h-64 md:h-auto md:hidden">
                        <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Desktop grid layout */}
                    <div className="hidden md:grid md:grid-cols-2 gap-4 h-[500px]">
                        <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover" />
                        <div className="grid grid-cols-2 gap-4">
                            <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Room" className="w-full h-full object-cover" />
                            <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Room" className="w-full h-full object-cover" />
                            <img src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Room" className="w-full h-full object-cover" />
                            <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Room" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About this place</h2>
                            <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
                        </section>

                        {/* Amenities */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">What this place offers</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {hotel.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center text-gray-600">
                                        <Wifi size={20} className="mr-3 text-blue-600" />
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Owner Info */}
                        <section className="bg-gray-50 p-6 rounded-2xl">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Host Information</h2>
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User size={32} className="text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Hosted by Quick Stay Partner</h3>
                                    <p className="text-gray-500 text-sm">Joined in 2023</p>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Phone size={18} className="mr-2" />
                                <span>Contact Host: +1 (555) 123-4567</span>
                            </div>
                        </section>

                        {/* Location Map */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Where you'll be</h2>
                            <div className="h-[300px] rounded-2xl overflow-hidden">
                                <MapComponent
                                    center={{ lat: hotel.location.latitude, lng: hotel.location.longitude }}
                                    zoom={15}
                                    markers={[{ id: hotel.id, position: { lat: hotel.location.latitude, lng: hotel.location.longitude }, title: hotel.name }]}
                                />
                            </div>
                            <p className="mt-2 text-gray-600">{hotel.location.address}</p>
                        </section>
                    </div>

                    {/* Right Column: Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
                            <div className="mb-6">
                                <div className="flex justify-between items-end mb-2">
                                    <div>
                                        <span className="text-sm text-gray-500">Base Price (2 guests)</span>
                                        <div className="flex items-baseline">
                                            <span className="text-3xl font-bold text-gray-900">₹{hotel.price}</span>
                                            <span className="text-gray-500 ml-2">/ night</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Star size={16} className="text-yellow-400 fill-current mr-1" />
                                        <span>{hotel.rating}</span>
                                    </div>
                                </div>
                                {finalPrice !== hotel.price && (
                                    <div className="mt-2 p-2 bg-blue-50 rounded">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-blue-900">Your Price:</span>
                                            <span className="text-2xl font-bold text-blue-600">₹{finalPrice}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Guest Selector */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Number of Guests
                                </label>
                                <select
                                    value={guests}
                                    onChange={(e) => setGuests(Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                >
                                    <option value={1}>1 Guest (+50% per person)</option>
                                    <option value={2}>2 Guests (Base Price)</option>
                                    <option value={3}>3 Guests (+50%)</option>
                                    <option value={4}>4 Guests (× 2)</option>
                                    <option value={5}>5 Guests (+150%)</option>
                                    <option value={6}>6 Guests (× 3)</option>
                                </select>
                            </div>

                            {/* Room Type Selector */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Room Type
                                </label>
                                <div className="space-y-2">
                                    {(Object.entries(roomTypeMultipliers) as [keyof typeof roomTypeMultipliers, typeof roomTypeMultipliers[keyof typeof roomTypeMultipliers]][]).map(([key, option]) => (
                                        <label
                                            key={key}
                                            className={`flex items-start p-3 border-2 rounded-lg cursor-pointer transition-all ${roomType === key
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-blue-300'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="roomType"
                                                value={key}
                                                checked={roomType === key}
                                                onChange={(e) => setRoomType(e.target.value as any)}
                                                className="mt-1 h-4 w-4 text-blue-600"
                                            />
                                            <div className="ml-3 flex-1">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium text-gray-900">{option.name}</span>
                                                    <span className="text-sm text-blue-600 font-semibold">
                                                        {option.multiplier === 1 ? 'Included' : `+${Math.round((option.multiplier - 1) * 100)}%`}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Add-ons */}
                            <div className="mb-6 space-y-3">
                                <h3 className="font-semibold text-gray-900 mb-2">Add-ons</h3>
                                <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center">
                                        <Utensils size={18} className="text-orange-500 mr-3" />
                                        <span className="text-sm">Daily Breakfast</span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={addons.breakfast}
                                        onChange={(e) => setAddons({ ...addons, breakfast: e.target.checked })}
                                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                                    />
                                </label>
                                <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center">
                                        <Car size={18} className="text-green-500 mr-3" />
                                        <span className="text-sm">Car Rental</span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={addons.carRental}
                                        onChange={(e) => setAddons({ ...addons, carRental: e.target.checked })}
                                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                                    />
                                </label>
                            </div>

                            <Button onClick={handleBooking} className="w-full mb-4">
                                Reserve
                            </Button>

                            <p className="text-center text-sm text-gray-500">
                                You won't be charged yet
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default HotelDetails;
