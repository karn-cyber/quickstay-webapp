import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/ui/Button';

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email Us',
            content: 'support@luxurystay.com',
            link: 'mailto:support@luxurystay.com'
        },
        {
            icon: Phone,
            title: 'Call Us',
            content: '+91 1800-123-4567',
            link: 'tel:+911800123456'
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            content: 'Mumbai, Maharashtra, India',
            link: null
        }
    ];

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-20 px-4 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold mb-6"
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-blue-100"
                    >
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </motion.p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-10">
                <div className="grid md:grid-cols-3 gap-6">
                    {contactInfo.map((info, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow"
                        >
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <info.icon className="text-blue-600" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                            {info.link ? (
                                <a
                                    href={info.link}
                                    className="text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    {info.content}
                                </a>
                            ) : (
                                <p className="text-gray-600">{info.content}</p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Left Side - Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Let's Talk</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            Whether you have a question about bookings, pricing, partnerships, or anything else,
                            our team is ready to answer all your questions.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <CheckCircle className="text-green-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Quick Response</h3>
                                    <p className="text-gray-600">We typically respond within 24 hours</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">24/7 Support</h3>
                                    <p className="text-gray-600">Round-the-clock customer assistance</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="text-purple-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Dedicated Team</h3>
                                    <p className="text-gray-600">Expert support staff ready to help</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                            <h3 className="font-bold text-gray-900 mb-2">Office Hours</h3>
                            <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                            <p className="text-gray-600">Saturday - Sunday: 10:00 AM - 4:00 PM IST</p>
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl shadow-xl p-8"
                    >
                        {isSubmitted && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                                <CheckCircle className="text-green-600" size={24} />
                                <p className="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                                    placeholder="Tell us more about your inquiry..."
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                size="lg"
                                isLoading={isSubmitting}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : (
                                    <>
                                        <Send size={20} className="mr-2" />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="font-bold text-gray-900 text-lg mb-2">How quickly will I receive a response?</h3>
                            <p className="text-gray-600">We aim to respond to all inquiries within 24 hours during business days.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="font-bold text-gray-900 text-lg mb-2">Can I modify or cancel my booking?</h3>
                            <p className="text-gray-600">Yes! You can manage your bookings through your dashboard or contact our support team for assistance.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="font-bold text-gray-900 text-lg mb-2">Do you offer group booking discounts?</h3>
                            <p className="text-gray-600">Absolutely! Contact our sales team for special rates on group bookings and corporate packages.</p>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default ContactUs;
