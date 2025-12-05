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
    const [addons, setAddons] = useState({
        breakfast: false,
        carRental: false,
        airportShuttle: false,
    });

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
        // Navigate to checkout with hotel and addons data
        navigate('/checkout', { state: { hotel, addons } });
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                    <div className="flex items-center text-gray-600">
                        <MapPin size={18} className="mr-1 text-blue-600" />
                        <span>{hotel.location.address}</span>
                        <span className="mx-2">•</span>
                        <Star size={18} className="mr-1 text-yellow-400 fill-current" />
                        <span>{hotel.rating} / 5.0</span>
                    </div>
                </div>

                {/* Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 rounded-2xl overflow-hidden h-[500px]">
                    <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover" />
                    <div className="grid grid-cols-2 gap-4">
                        <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Room" className="w-full h-full object-cover" />
                        <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Room" className="w-full h-full object-cover" />
                        <img src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Room" className="w-full h-full object-cover" />
                        <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Room" className="w-full h-full object-cover" />
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
                            <div className="grid grid-cols-2 gap-4">
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
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <span className="text-3xl font-bold text-gray-900">₹{hotel.price}</span>
                                    <span className="text-gray-500"> / night</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Star size={16} className="text-yellow-400 fill-current mr-1" />
                                    <span>{hotel.rating}</span>
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
