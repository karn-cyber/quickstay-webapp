import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Wifi, Coffee, Tv, Users, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/ui/Button';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';

interface Room {
    _id: string;
    name: string;
    description: string;
    pricePerNight: number;
    capacity: number;
    amenities: string[];
    images: string[];
}

const RoomDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState(true);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await api.get(`/rooms/${id}`);
                setRoom(response.data);
            } catch (error) {
                console.error('Error fetching room:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRoom();
        }
    }, [id]);

    const handleBooking = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        if (!checkIn || !checkOut) {
            alert('Please select check-in and check-out dates');
            return;
        }

        setBookingLoading(true);
        try {
            const days = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
            const totalPrice = days * (room?.pricePerNight || 0);

            await api.post('/bookings', {
                room: room?._id,
                checkInDate: checkIn,
                checkOutDate: checkOut,
                totalPrice,
            });

            navigate('/dashboard');
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Failed to create booking');
        } finally {
            setBookingLoading(false);
        }
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

    if (!room) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-screen">
                    <h1 className="text-2xl font-bold">Room not found</h1>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            {/* Image Gallery */}
            <div className="h-[60vh] relative">
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src={room.images[0] || "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"}
                    alt={room.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-2"
                        >
                            {room.name}
                        </motion.h1>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center space-x-4 text-white/90"
                        >
                            <div className="flex items-center">
                                <Star className="text-yellow-400 fill-current" size={20} />
                                <span className="ml-1 font-semibold">4.9</span>
                                <span className="ml-1 text-sm">(128 reviews)</span>
                            </div>
                            <span>•</span>
                            <span>Santa Monica, CA</span>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Details */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2 space-y-12"
                    >
                        <div>
                            <h2 className="text-2xl font-bold mb-4">About this room</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {room.description}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-6">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {room.amenities.length > 0 ? room.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                                        <Check className="text-blue-600" size={24} />
                                        <span className="font-medium text-gray-700">{amenity}</span>
                                    </div>
                                )) : (
                                    [
                                        { icon: Wifi, label: 'Free Wifi' },
                                        { icon: Coffee, label: 'Coffee Maker' },
                                        { icon: Tv, label: 'Smart TV' },
                                        { icon: Users, label: `${room.capacity} Guests` },
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                                            <item.icon className="text-blue-600" size={24} />
                                            <span className="font-medium text-gray-700">{item.label}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Booking Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <span className="text-3xl font-bold text-gray-900">${room.pricePerNight}</span>
                                    <span className="text-gray-500">/night</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Star className="text-yellow-400 fill-current w-4 h-4 mr-1" />
                                    4.9
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="border rounded-lg p-3">
                                        <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Check-in</label>
                                        <input
                                            type="date"
                                            className="w-full outline-none text-sm"
                                            value={checkIn}
                                            onChange={(e) => setCheckIn(e.target.value)}
                                        />
                                    </div>
                                    <div className="border rounded-lg p-3">
                                        <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Check-out</label>
                                        <input
                                            type="date"
                                            className="w-full outline-none text-sm"
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="border rounded-lg p-3">
                                    <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Guests</label>
                                    <select className="w-full outline-none text-sm bg-transparent">
                                        <option>1 Guest</option>
                                        <option>2 Guests</option>
                                        <option>3 Guests</option>
                                    </select>
                                </div>
                            </div>

                            <Button size="lg" className="w-full mb-4" onClick={handleBooking} isLoading={bookingLoading}>
                                {isAuthenticated ? 'Reserve' : 'Sign in to Reserve'}
                            </Button>

                            <div className="text-center text-sm text-gray-500">
                                You won't be charged yet
                            </div>

                            <div className="mt-6 space-y-3 pt-6 border-t">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">$250 x 5 nights</span>
                                    <span className="font-medium">$1,250</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Cleaning fee</span>
                                    <span className="font-medium">$50</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Service fee</span>
                                    <span className="font-medium">$80</span>
                                </div>
                                <div className="flex justify-between pt-4 border-t font-bold text-lg">
                                    <span>Total</span>
                                    <span>$1,380</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div >
        </MainLayout >
    );
};

export default RoomDetails;
