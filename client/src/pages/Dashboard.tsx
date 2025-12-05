import React, { useState, useEffect } from 'react';
import { Calendar, User, CreditCard, Package, ChevronDown, ChevronUp, XCircle } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import api from '../lib/api';

interface Booking {
    _id: string;
    hotelName: string;
    hotelImage?: string;
    checkInDate: string;
    checkOutDate: string;
    status: string;
    totalPrice: number;
}

const Dashboard: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get('/bookings/my-bookings');
                setBookings(response.data);
            } catch (error) {
                console.error('Failed to fetch bookings', error);
            }
        };

        fetchBookings();
    }, []);

    const toggleBookingDetails = (bookingId: string) => {
        setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
    };

    const handleCancelBooking = async (bookingId: string, hotelName: string) => {
        const confirmed = window.confirm(
            `Are you sure you want to cancel your booking at ${hotelName}?\n\nThis action cannot be undone.`
        );

        if (!confirmed) return;

        try {
            await api.patch(`/bookings/${bookingId}/cancel`);

            // Update the booking status in the UI
            setBookings(bookings.map(booking =>
                booking._id === bookingId
                    ? { ...booking, status: 'cancelled' }
                    : booking
            ));

            alert('✅ Booking cancelled successfully');
        } catch (error: any) {
            console.error('Error cancelling booking:', error);
            alert(error.response?.data?.message || 'Failed to cancel booking. Please try again.');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const calculateNights = (checkIn: string, checkOut: string) => {
        const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
        return nights;
    };

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">My Dashboard</h1>
                    <p className="text-gray-600">Manage your bookings and account</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">Total Bookings</p>
                                <p className="text-3xl font-bold mt-1">{bookings.length}</p>
                            </div>
                            <Package size={40} className="opacity-80" />
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm font-medium">Confirmed</p>
                                <p className="text-3xl font-bold mt-1">{bookings.filter(b => b.status === 'confirmed').length}</p>
                            </div>
                            <Calendar size={40} className="opacity-80" />
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm font-medium">Total Spent</p>
                                <p className="text-3xl font-bold mt-1">₹{bookings.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}</p>
                            </div>
                            <CreditCard size={40} className="opacity-80" />
                        </div>
                    </div>
                </div>

                {/* Bookings Section */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
                    {bookings.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                            <Package size={64} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
                            <p className="text-gray-600 mb-6">Start exploring amazing hotels and make your first booking!</p>
                            <a href="/explore" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
                                Explore Hotels
                            </a>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {bookings.map((booking) => {
                                const nights = calculateNights(booking.checkInDate, booking.checkOutDate);
                                const pricePerNight = Math.round(booking.totalPrice / nights);
                                const isExpanded = expandedBooking === booking._id;

                                return (
                                    <div key={booking._id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                                        <div className="flex flex-col md:flex-row">
                                            {/* Hotel Image */}
                                            <div className="md:w-1/3 lg:w-1/4 h-56 md:h-auto relative overflow-hidden">
                                                <img
                                                    src={booking.hotelImage || 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                                                    alt={booking.hotelName}
                                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute top-4 right-4">
                                                    <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg ${booking.status === 'confirmed'
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-yellow-500 text-white'
                                                        }`}>
                                                        {booking.status}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Booking Details */}
                                            <div className="flex-1 p-6">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{booking.hotelName}</h3>
                                                        <p className="text-sm text-gray-500">Booking ID: #{booking._id.slice(-8).toUpperCase()}</p>
                                                    </div>
                                                </div>

                                                {/* Quick Info */}
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                                    <div className="flex items-center text-gray-600">
                                                        <Calendar size={18} className="mr-2 text-blue-600" />
                                                        <div>
                                                            <p className="text-xs text-gray-500">Check-in</p>
                                                            <p className="font-semibold text-sm">{formatDate(booking.checkInDate)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <Calendar size={18} className="mr-2 text-blue-600" />
                                                        <div>
                                                            <p className="text-xs text-gray-500">Check-out</p>
                                                            <p className="font-semibold text-sm">{formatDate(booking.checkOutDate)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <User size={18} className="mr-2 text-blue-600" />
                                                        <div>
                                                            <p className="text-xs text-gray-500">Nights</p>
                                                            <p className="font-semibold text-sm">{nights} {nights === 1 ? 'Night' : 'Nights'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <CreditCard size={18} className="mr-2 text-green-600" />
                                                        <div>
                                                            <p className="text-xs text-gray-500">Total</p>
                                                            <p className="font-semibold text-lg text-blue-600">₹{booking.totalPrice.toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Expandable Details */}
                                                {isExpanded && (
                                                    <div className="mt-6 pt-6 border-t border-gray-200 animate-fadeIn">
                                                        <h4 className="font-semibold text-gray-900 mb-4">Booking Breakdown</h4>
                                                        <div className="space-y-3 bg-gray-50 rounded-xl p-4">
                                                            <div className="flex justify-between text-sm">
                                                                <span className="text-gray-600">Room Rate ({nights} {nights === 1 ? 'night' : 'nights'})</span>
                                                                <span className="font-semibold">₹{pricePerNight.toLocaleString()} × {nights}</span>
                                                            </div>
                                                            <div className="flex justify-between text-sm">
                                                                <span className="text-gray-600">Subtotal</span>
                                                                <span className="font-semibold">₹{(pricePerNight * nights).toLocaleString()}</span>
                                                            </div>
                                                            <div className="border-t border-gray-300 pt-3 flex justify-between font-bold text-lg">
                                                                <span>Total Amount</span>
                                                                <span className="text-blue-600">₹{booking.totalPrice.toLocaleString()}</span>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                                                            <p className="text-sm text-blue-800">
                                                                <strong>✓ Payment Confirmed</strong>
                                                            </p>
                                                            <p className="text-xs text-blue-600 mt-1">
                                                                Your booking is confirmed. Check your email for confirmation details.
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Action Buttons */}
                                                <div className="mt-4 flex space-x-3">
                                                    {/* View Details Toggle */}
                                                    <button
                                                        onClick={() => toggleBookingDetails(booking._id)}
                                                        className="flex-1 flex items-center justify-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors py-2 px-4 border border-blue-200 rounded-lg hover:bg-blue-50"
                                                    >
                                                        {isExpanded ? (
                                                            <>
                                                                <ChevronUp size={18} className="mr-1" />
                                                                Hide Details
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ChevronDown size={18} className="mr-1" />
                                                                View Details
                                                            </>
                                                        )}
                                                    </button>

                                                    {/* Cancel Button - Only show for confirmed bookings */}
                                                    {booking.status === 'confirmed' && (
                                                        <button
                                                            onClick={() => handleCancelBooking(booking._id, booking.hotelName)}
                                                            className="flex items-center justify-center text-red-600 hover:text-red-700 font-medium text-sm transition-colors py-2 px-4 border border-red-200 rounded-lg hover:bg-red-50"
                                                        >
                                                            <XCircle size={18} className="mr-1" />
                                                            Cancel Booking
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default Dashboard;
