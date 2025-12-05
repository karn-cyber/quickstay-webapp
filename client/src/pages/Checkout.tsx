import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/ui/Button';
import api from '../lib/api';
import { Loader2 } from 'lucide-react';

const Checkout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { hotel, addons } = location.state || {};
    const [loading, setLoading] = useState(false);

    // Calculate total price
    const basePrice = hotel?.price || 0;
    const addonsPrice = (addons?.breakfast ? 2000 : 0) + (addons?.carRental ? 5000 : 0);
    const totalAmount = basePrice + addonsPrice;

    useEffect(() => {
        if (!hotel) {
            navigate('/explore');
        }
    }, [hotel, navigate]);

    const handleMockPayment = async () => {
        setLoading(true);

        try {
            // Create booking record directly (mock payment)
            await api.post('/bookings', {
                room: hotel.id,
                checkInDate: new Date(),
                checkOutDate: new Date(Date.now() + 86400000), // Next day
                totalPrice: totalAmount
            });

            // Show success message
            alert('🎉 Payment successful! Your booking has been confirmed.');
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Booking creation failed', error);
            alert(error.response?.data?.message || 'Failed to create booking. Please try again.');
            setLoading(false);
        }
    };

    if (!hotel) return null;

    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

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
                                Click the button below to proceed with secure payment via Razorpay.
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
                            onClick={handleMockPayment}
                            className="w-full"
                            size="lg"
                            isLoading={loading}
                            disabled={loading}
                        >
                            {loading ? 'Processing Payment...' : `Pay ₹${totalAmount} (Mock)`}
                        </Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Checkout;
