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
            className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
                    ? 'bg-gradient-to-r from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-white/10'
                    : 'bg-gradient-to-r from-black via-gray-900 to-black'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Premium Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="relative">
                            {/* Logo background glow */}
                            <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-xl group-hover:bg-blue-500/30 transition-all duration-300"></div>
                            <span className="relative text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                                Quick<span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text">Stay</span>
                            </span>
                        </div>
                        {/* Premium badge */}
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
                            PREMIUM
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-2">
                        <Link to="/" className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group">
                            <span className="relative z-10">Home</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        </Link>
                        <Link to="/explore" className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group">
                            <span className="relative z-10">Explore</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        </Link>
                        <Link to="/about" className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group">
                            <span className="relative z-10">About Us</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        </Link>
                        <Link to="/contact" className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group">
                            <span className="relative z-10">Contact</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        </Link>
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="p-2.5 rounded-full text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20">
                            <Search size={20} />
                        </button>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-3">
                                <Link to="/dashboard" className="flex items-center space-x-2 px-4 py-2 rounded-full text-white hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group backdrop-blur-sm">
                                    {user?.picture ? (
                                        <img
                                            src={user.picture}
                                            alt={user.name}
                                            className="w-7 h-7 rounded-full border-2 border-blue-400/50 group-hover:border-blue-400 object-cover transition-all duration-300"
                                        />
                                    ) : (
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-blue-400/50 group-hover:border-blue-400 transition-all duration-300">
                                            <UserIcon size={14} className="text-white" />
                                        </div>
                                    )}
                                    <span className="text-sm font-medium">Profile</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="p-2.5 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all duration-300 border border-white/10 hover:border-red-400/30"
                                    title="Sign Out"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 font-medium"
                            >
                                <span className="relative z-10">Sign In</span>
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-white hover:bg-white/10 border border-white/10 transition-all duration-300"
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
