import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Globe, Heart, Shield, Zap } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

const AboutUs: React.FC = () => {
    const features = [
        {
            icon: Globe,
            title: 'Global Reach',
            description: 'Access to premium hotels across India and beyond, all in one platform.'
        },
        {
            icon: Shield,
            title: 'Trusted & Secure',
            description: 'Your payments and personal information are protected with industry-leading security.'
        },
        {
            icon: Award,
            title: 'Best Prices',
            description: 'Competitive rates and exclusive deals you won\'t find anywhere else.'
        },
        {
            icon: Zap,
            title: 'Instant Booking',
            description: 'Book your perfect stay in seconds with our streamlined checkout process.'
        },
        {
            icon: Heart,
            title: 'Customer First',
            description: '24/7 support to ensure your travel experience is seamless and memorable.'
        },
        {
            icon: Users,
            title: 'Community Driven',
            description: 'Join thousands of satisfied travelers who trust Quick Stay for their accommodation needs.'
        }
    ];

    const stats = [
        { value: '10K+', label: 'Happy Customers' },
        { value: '500+', label: 'Partner Hotels' },
        { value: '50+', label: 'Cities Covered' },
        { value: '98%', label: 'Satisfaction Rate' }
    ];

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-24 px-4 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }} />
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold mb-6"
                    >
                        About Quick Stay
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-blue-100 leading-relaxed"
                    >
                        Your trusted companion for discovering and booking the perfect accommodation.
                        We connect travelers with exceptional stays across India.
                    </motion.p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-4">
                            Quick Stay was founded with a simple mission: to make hotel booking effortless and accessible for everyone.
                            We understand that finding the perfect accommodation can be overwhelming, which is why we've built a platform
                            that prioritizes simplicity, transparency, and exceptional value.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Since our inception, we've partnered with hundreds of premium hotels across India,
                            ensuring that whether you're traveling for business or leisure, you'll find a stay that
                            exceeds your expectations. Our commitment to customer satisfaction and innovative technology
                            has made us a trusted name in the hospitality industry.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Luxury Hotel"
                            className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Quick Stay?</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            We're more than just a booking platform. We're your travel partner, committed to making every stay memorable.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                    <feature.icon className="text-blue-600" size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-2xl text-white"
                    >
                        <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                        <p className="text-blue-100 text-lg leading-relaxed">
                            To revolutionize the hotel booking experience by providing a platform that combines
                            cutting-edge technology with personalized service, making premium accommodations
                            accessible and affordable for all travelers.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-indigo-600 to-purple-700 p-10 rounded-2xl text-white"
                    >
                        <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
                        <p className="text-indigo-100 text-lg leading-relaxed">
                            To become India's most trusted and innovative hospitality platform,
                            where every traveler finds their perfect home away from home, and every hotel
                            partner thrives through our collaborative ecosystem.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of happy travelers and discover your next perfect stay with Quick Stay.
                    </p>
                    <button
                        onClick={() => window.location.href = '/explore'}
                        className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Explore Hotels Now
                    </button>
                </div>
            </section>
        </MainLayout>
    );
};

export default AboutUs;
