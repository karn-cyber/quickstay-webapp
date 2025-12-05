import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/ui/Button';
import api from '../lib/api';

const AdminHotelCreate: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        latitude: '',
        longitude: '',
        description: '',
        rating: '4.0',
        price: '',
        images: [''],
        amenities: ['WiFi', 'Pool']
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const hotelData = {
                name: formData.name,
                location: {
                    address: formData.address,
                    latitude: parseFloat(formData.latitude),
                    longitude: parseFloat(formData.longitude)
                },
                description: formData.description,
                rating: parseFloat(formData.rating),
                price: parseInt(formData.price),
                images: formData.images.filter(img => img.trim() !== ''),
                amenities: formData.amenities
            };

            await api.post('/hotels', hotelData);
            alert('Hotel created successfully!');
            navigate('/admin/hotels');
        } catch (error: any) {
            console.error('Error creating hotel:', error);
            alert(error.response?.data?.message || 'Failed to create hotel');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (index: number, value: string) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData({ ...formData, images: newImages });
    };

    const addImageField = () => {
        setFormData({ ...formData, images: [...formData.images, ''] });
    };

    const toggleAmenity = (amenity: string) => {
        const newAmenities = formData.amenities.includes(amenity)
            ? formData.amenities.filter(a => a !== amenity)
            : [...formData.amenities, amenity];
        setFormData({ ...formData, amenities: newAmenities });
    };

    const availableAmenities = ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Parking', 'AC', 'Room Service', 'Laundry'];

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button
                    onClick={() => navigate('/admin/hotels')}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Hotels
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-8"
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New Hotel</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="Luxury Grand Hotel"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price per Night (₹) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="15000"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="123 Marine Drive, Mumbai, India"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Latitude *</label>
                                <input
                                    type="number"
                                    name="latitude"
                                    value={formData.latitude}
                                    onChange={handleChange}
                                    required
                                    step="any"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="19.0760"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Longitude *</label>
                                <input
                                    type="number"
                                    name="longitude"
                                    value={formData.longitude}
                                    onChange={handleChange}
                                    required
                                    step="any"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="72.8777"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Rating (0-5)</label>
                                <input
                                    type="number"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Describe the hotel, its features, and what makes it special..."
                            />
                        </div>

                        {/* Images */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Images (URLs)</label>
                            {formData.images.map((image, index) => (
                                <input
                                    key={index}
                                    type="url"
                                    value={image}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all mb-2"
                                    placeholder="https://images.unsplash.com/photo..."
                                />
                            ))}
                            <button
                                type="button"
                                onClick={addImageField}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center mt-2"
                            >
                                <Upload size={16} className="mr-1" />
                                Add Another Image
                            </button>
                        </div>

                        {/* Amenities */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                {availableAmenities.map((amenity) => (
                                    <button
                                        key={amenity}
                                        type="button"
                                        onClick={() => toggleAmenity(amenity)}
                                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${formData.amenities.includes(amenity)
                                                ? 'bg-blue-600 border-blue-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400'
                                            }`}
                                    >
                                        {amenity}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex space-x-4 pt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/admin/hotels')}
                                disabled={loading}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                isLoading={loading}
                                disabled={loading}
                                className="flex-1"
                            >
                                {loading ? 'Creating...' : 'Create Hotel'}
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </MainLayout>
    );
};

export default AdminHotelCreate;
