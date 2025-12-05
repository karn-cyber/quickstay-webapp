import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Calendar, MapPin, Clock, Loader2 } from 'lucide-react';
import api from '../lib/api';

interface Booking {
    _id: string;
    room: {
        name: string;
        images: string[];
    };
    checkInDate: string;
    checkOutDate: string;
    status: string;
    totalPrice: number;
}

import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get('/bookings/my-bookings');
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Profile Section */}
                <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                    <div className="relative">
                        {user?.picture ? (
                            <img
                                src={user.picture}
                                alt={user.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                                <span className="text-4xl font-bold text-gray-400">{user?.name?.charAt(0).toUpperCase()}</span>
                            </div>
                        )}
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
                        <p className="text-gray-500 mt-1">{user?.email}</p>
                        <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                {user?.role === 'admin' ? 'Administrator' : 'Member'}
                            </span>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>

                <div className="space-y-6">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
                            <div className="md:w-1/3 lg:w-1/4 h-48 md:h-auto relative">
                                <img
                                    src={booking.room.images[0] || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                                    alt={booking.room.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-gray-900">{booking.room.name}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 mb-4">
                                        <div className="flex items-center space-x-2">
                                            <Calendar size={18} className="text-blue-600" />
                                            <span>{new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}</span>
                                        </div>                    </div>
                                    <div className="flex items-center space-x-2">
                                        <MapPin size={18} className="text-blue-600" />
                                        <span>Santa Monica, CA</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Clock size={18} className="text-blue-600" />
                                        <span>Check-in: 3:00 PM</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <span className="text-gray-500 text-sm">Booking ID: #{booking._id.slice(-6)}</span>
                                <span className="text-xl font-bold text-gray-900">${booking.totalPrice}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout >
    );
};

export default Dashboard;
