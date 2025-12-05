import React, { useState, useEffect } from 'react';
import { Search, Loader2, Map as MapIcon, List } from 'lucide-react';
import { motion } from 'framer-motion';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import api from '../lib/api';

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

const mapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '1rem',
};

const center = {
    lat: 20.5937,
    lng: 78.9629,
};

const Explore: React.FC = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

    const [mapCenter, setMapCenter] = useState(center);

    useEffect(() => {
        // Fetch user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setMapCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        }

        const fetchHotels = async () => {
            try {
                const response = await api.get('/hotels/search?location=ALL');
                setHotels(response.data);
            } catch (err) {
                console.error('Failed to fetch hotels', err);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    if (loading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-screen">
                    <Loader2 className="animate-spin text-blue-600" size={48} />
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-center text-white">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold mb-4"
                >
                    Explore Hotels
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 max-w-2xl mx-auto"
                >
                    Discover the best stays in your favorite destinations.
                </motion.p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Filters and Search */}
                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search hotels (e.g., Mumbai, Delhi)..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    const val = e.currentTarget.value;
                                    setLoading(true);
                                    api.get(`/hotels/search?location=${val}`).then(res => {
                                        setHotels(res.data);
                                        setLoading(false);
                                    }).catch(() => setLoading(false));
                                }
                            }}
                        />
                    </div>
                    <div className="flex space-x-4">
                        <select
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
                            onChange={(e) => {
                                const val = e.target.value;
                                setLoading(true);
                                api.get(`/hotels/search?location=${val}`).then(res => {
                                    setHotels(res.data);
                                    setLoading(false);
                                }).catch(() => setLoading(false));
                            }}
                        >
                            <option value="ALL">All Locations</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Chennai">Chennai</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {hotels.map((hotel, index) => (
                        <motion.div
                            key={hotel.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={`/hotels/${hotel.id}`} className="group">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={hotel.images[0]}
                                            alt={hotel.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                                            ₹{hotel.price}/night
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">{hotel.name}</h3>
                                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                                            {hotel.description}
                                        </p>
                                        <div className="mt-auto">
                                            <div className="flex items-center mb-4">
                                                <span className="text-yellow-400 font-bold mr-1">★</span>
                                                <span className="text-gray-600 text-sm">{hotel.rating}</span>
                                            </div>
                                            <Button className="w-full">View Details</Button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default Explore;
