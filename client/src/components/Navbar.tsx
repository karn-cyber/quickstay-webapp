import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User as UserIcon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Handle scroll effect
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md shadow-sm' : 'bg-black'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-white">
                            Quick<span className="text-blue-500">Stay</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                            Home
                        </Link>
                        <Link to="/explore" className="text-gray-300 hover:text-white transition-colors">
                            Explore
                        </Link>
                        <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                            About Us
                        </Link>
                        <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                            Contact
                        </Link>
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="p-2 rounded-full text-white hover:bg-white/10 transition-colors">
                            <Search size={20} />
                        </button>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/dashboard" className="flex items-center space-x-2 text-white hover:text-blue-400 group">
                                    {user?.picture ? (
                                        <img
                                            src={user.picture}
                                            alt={user.name}
                                            className="w-8 h-8 rounded-full border-2 border-transparent group-hover:border-blue-400 object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center border-2 border-transparent group-hover:border-blue-400">
                                            <UserIcon size={16} className="text-gray-300" />
                                        </div>
                                    )}
                                    <span>Profile</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-300 hover:text-white transition-colors"
                                    title="Sign Out"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-white"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-gray-900 border-t border-gray-800"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            <Link to="/" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md">
                                Home
                            </Link>
                            <Link to="/explore" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md">
                                Explore
                            </Link>
                            <Link to="/about" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md">
                                About Us
                            </Link>
                            <Link to="/contact" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md">
                                Contact
                            </Link>
                            <div className="pt-4 border-t border-gray-800">
                                {isAuthenticated ? (
                                    <>
                                        <Link to="/dashboard" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md">
                                            Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-3 py-2 text-red-400 hover:bg-gray-800 rounded-md"
                                        >
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <Link to="/login" className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                        Sign In
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
