import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/ui/Button';
import api from '../lib/api';

const Checkout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { hotel, addons } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Calculate total price
    const basePrice = hotel?.price || 0;
    const addonsPrice = (addons?.breakfast ? 2000 : 0) + (addons?.carRental ? 5000 : 0);
    const totalAmount = basePrice + addonsPrice;

    useEffect(() => {
        if (!hotel) {
            navigate('/explore');
        }
    }, [hotel, navigate]);

    const handlePayButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Pay button clicked - showing modal');
        setShowConfirmModal(true);
    };

    const handleConfirmBooking = async () => {
        console.log('User confirmed booking');
        setShowConfirmModal(false);
        setLoading(true);

        try {
            console.log('Creating booking API call...');

            const response = await api.post('/bookings', {
                room: hotel.id,
                hotelName: hotel.name,
                hotelImage: hotel.images?.[0],
                checkInDate: new Date(),
                checkOutDate: new Date(Date.now() + 86400000),
                totalPrice: totalAmount
            });

            console.log('Booking successful:', response.data);

            alert(
                `🎉 Payment Successful!\n\n` +
                `Your booking has been confirmed.\n` +
                `Booking ID: #${response.data._id?.slice(-6) || 'CONFIRMED'}\n\n` +
                `Redirecting to your dashboard...`
            );

            navigate('/dashboard');
        } catch (error: any) {
            console.error('Booking failed:', error);

            let errorMsg = 'Failed to create booking. Please try again.';

            if (error.response?.status === 401) {
                errorMsg = 'Please login to make a booking.';
                alert(`❌ Booking Failed\n\n${errorMsg}`);
                setTimeout(() => navigate('/login'), 2000);
                return;
            } else if (error.response?.data?.message) {
                errorMsg = error.response.data.message;
            }

            alert(`❌ Booking Failed\n\n${errorMsg}`);
            setLoading(false);
        }
    };

    const handleCancelBooking = () => {
        console.log('User cancelled booking');
        setShowConfirmModal(false);
    };

    if (!hotel) return null;

    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                {/* Confirmation Modal */}
                {showConfirmModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) handleCancelBooking();
                        }}>
                        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Confirm Your Booking</h2>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Hotel:</span>
                                    <span className="font-semibold">{hotel.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Amount:</span>
                                    <span className="font-semibold text-blue-600">₹{totalAmount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Check-in:</span>
                                    <span className="font-semibold">{new Date().toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Check-out:</span>
                                    <span className="font-semibold">{new Date(Date.now() + 86400000).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-6">Do you want to proceed with this booking?</p>
                            <div className="flex space-x-4">
                                <Button
                                    type="button"
                                    onClick={handleCancelBooking}
                                    variant="outline"
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleConfirmBooking}
                                    className="flex-1"
                                    isLoading={loading}
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : 'Confirm & Pay'}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="bg-gray-50 p-6 rounded-2xl h-fit">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">{hotel.name} (1 Night)</span>
                                <span className="font-medium">₹{basePrice}</span>
                            </div>
                            {addons?.breakfast && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Daily Breakfast</span>
                                    <span className="font-medium">₹2000</span>
                                </div>
                            )}
                            {addons?.carRental && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Car Rental</span>
                                    <span className="font-medium">₹5000</span>
                                </div>
                            )}
                            <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>₹{totalAmount}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h2>
                        <div className="mb-6">
                            <p className="text-gray-600 text-sm mb-4">
                                Click the button below to proceed with secure payment.
                            </p>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <p className="text-sm text-blue-800">
                                    <strong>💳 Safe & Secure Payment</strong>
                                </p>
                                <p className="text-xs text-blue-600 mt-1">
                                    Your payment information is encrypted and secure.
                                </p>
                            </div>
                        </div>

                        <Button
                            type="button"
                            onClick={handlePayButtonClick}
                            className="w-full"
                            size="lg"
                            disabled={loading}
                        >
                            Pay ₹{totalAmount} (Mock)
                        </Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Checkout;
