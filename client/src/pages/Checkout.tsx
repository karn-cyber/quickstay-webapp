import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/ui/Button';
import api from '../lib/api';
import { Loader2 } from 'lucide-react';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe('pk_test_placeholder'); // User needs to replace this

const CheckoutForm = ({ amount, onSuccess }: { amount: number, onSuccess: () => void }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/dashboard`,
            },
            redirect: 'if_required'
        });

        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message || "An error occurred");
            } else {
                setMessage("An unexpected error occurred.");
            }
        } else {
            // Payment succeeded
            onSuccess();
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            <Button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="w-full"
                isLoading={isLoading}
            >
                <span id="button-text">
                    {isLoading ? "Processing..." : `Pay ₹${amount}`}
                </span>
            </Button>
            {message && <div id="payment-message" className="text-red-500 text-sm text-center">{message}</div>}
        </form>
    );
};

const Checkout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { hotel, addons } = location.state || {};
    const [clientSecret, setClientSecret] = useState("");

    // Calculate total price (mock calculation)
    const basePrice = hotel?.price || 0;
    const addonsPrice = (addons?.breakfast ? 2000 : 0) + (addons?.carRental ? 5000 : 0);
    const totalAmount = basePrice + addonsPrice;

    useEffect(() => {
        if (!hotel) {
            navigate('/explore');
            return;
        }

        // Create PaymentIntent as soon as the page loads
        api.post("/payments/create-intent", { amount: totalAmount * 100, currency: 'usd' }) // Amount in cents
            .then((res) => setClientSecret(res.data.clientSecret))
            .catch((err) => console.error("Error creating payment intent:", err));
    }, [hotel, totalAmount, navigate]);

    const handleSuccess = async () => {
        // Create booking record in backend
        try {
            await api.post('/bookings', {
                room: hotel.id, // Note: This might need adjustment if backend expects a MongoDB ID and we are sending Amadeus ID
                checkInDate: new Date(),
                checkOutDate: new Date(Date.now() + 86400000), // Next day
                totalPrice: totalAmount
            });
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to create booking record', error);
            // Still navigate to dashboard as payment succeeded
            navigate('/dashboard');
        }
    };

    if (!hotel) return null;

    const appearance = {
        theme: 'stripe' as const,
    };
    const options = {
        clientSecret,
        appearance,
    };

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

                    {/* Payment Form */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        {clientSecret ? (
                            <Elements options={options} stripe={stripePromise}>
                                <CheckoutForm amount={totalAmount} onSuccess={handleSuccess} />
                            </Elements>
                        ) : (
                            <div className="flex justify-center py-10">
                                <Loader2 className="animate-spin text-blue-600" size={32} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Checkout;
