import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import MainLayout from '../layouts/MainLayout';

const Home: React.FC = () => {
    const [featuredHotels, setFeaturedHotels] = React.useState<any[]>([]);
    const [location, setLocation] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const locationInputRef = useRef<HTMLDivElement>(null);

    const availableLocations = [
        'Mumbai',
        'Delhi',
        'Bangalore',
        'Chennai',
        'Pune',
        'Kolkata',
        'Hyderabad',
        'Ahmedabad'
    ];

    const filteredLocations = location
        ? availableLocations.filter(loc =>
            loc.toLowerCase().includes(location.toLowerCase())
        )
        : availableLocations;

    React.useEffect(() => {
        // Fetch featured hotels (using search API for now)
        fetch('https://quickstay-webapp-production.up.railway.app/api/hotels/search?location=ALL')
            .then(res => res.json())
            .then(data => {
                // Take first 3 hotels as featured
                setFeaturedHotels(data.slice(0, 3));
            })
            .catch(err => console.error('Failed to fetch featured hotels', err));
    }, []);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (locationInputRef.current && !locationInputRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLocationSelect = (selectedLocation: string) => {
        setLocation(selectedLocation);
        setShowSuggestions(false);
    };

    const handleSearch = () => {
        const searchParams = new URLSearchParams();
        if (location) searchParams.append('location', location);
        window.location.href = `/explore?${searchParams.toString()}`;
    };

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        alt="Luxury Hotel"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tight"
                    >
                        Find Your Perfect <span className="text-blue-400">Escape</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 text-gray-200 font-light"
                    >
                        Discover luxury accommodations at unbeatable prices.
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-white p-4 md:p-6 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-stretch md:items-center gap-4 md:space-y-0 md:space-x-4 max-w-3xl mx-auto"
                    >
                        <div ref={locationInputRef} className="relative flex items-center space-x-2 flex-1 px-2 md:px-4 py-2 md:py-0 border-b md:border-b-0 md:border-r border-gray-200">
                            <MapPin className="text-blue-600 flex-shrink-0" size={20} />
                            <input
                                type="text"
                                placeholder="Where are you going?"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                onFocus={() => setShowSuggestions(true)}
                                className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                            />

                            {/* Location Suggestions Dropdown */}
                            <AnimatePresence>
                                {showSuggestions && filteredLocations.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-60 overflow-y-auto z-50"
                                    >
                                        {filteredLocations.map((loc) => (
                                            <button
                                                key={loc}
                                                onClick={() => handleLocationSelect(loc)}
                                                className="w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-800 transition-colors first:rounded-t-lg last:rounded-b-lg flex items-center space-x-2"
                                            >
                                                <MapPin size={16} className="text-blue-600 flex-shrink-0" />
                                                <span>{loc}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="flex items-center space-x-2 flex-1 px-2 md:px-4 py-2 md:py-0 border-b md:border-b-0 md:border-r border-gray-200">
                            <Calendar className="text-blue-600 flex-shrink-0" size={20} />
                            <input
                                type="date"
                                className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        <div className="flex items-center space-x-2 flex-1 px-2 md:px-4 py-2 md:py-0 mb-2 md:mb-0">
                            <Users className="text-blue-600 flex-shrink-0" size={20} />
                            <input
                                type="number"
                                min="0"
                                placeholder="Guests"
                                className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        <Button size="lg" className="w-full md:w-auto whitespace-nowrap" onClick={handleSearch}>
                            Search
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Featured Rooms Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Rooms</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Experience the epitome of comfort and style in our handpicked selection of premium rooms.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredHotels.map((hotel) => (
                        <div key={hotel.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
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
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-gray-900">{hotel.name}</h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">
                                    {hotel.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <Users size={16} />
                                        <span>2 Guests</span>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => window.location.href = `/hotels/${hotel.id}`}>View Details</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </MainLayout>
    );
};

export default Home;
