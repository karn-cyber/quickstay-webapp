import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { TrendingUp, DollarSign, Calendar, Users, Hotel, Eye } from 'lucide-react';
import Button from '../components/ui/Button';
import api from '../lib/api';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Stats {
    totalBookings: number;
    totalRevenue: number;
    bookingsByStatus: Array<{ _id: string; count: number }>;
    monthlyBookings: Array<{ _id: { year: number; month: number }; count: number; revenue: number }>;
    topHotels: Array<{ _id: string; bookings: number; revenue: number }>;
    recentBookings: any[];
}

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/bookings/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </MainLayout>
        );
    }

    // Format monthly data for charts
    const monthlyData = stats?.monthlyBookings.map(item => ({
        name: `${item._id.month}/${item._id.year}`,
        bookings: item.count,
        revenue: item.revenue / 1000 // Convert to thousands
    })) || [];

    // Status distribution for pie chart
    const statusData = stats?.bookingsByStatus.map(item => ({
        name: item._id,
        value: item.count
    })) || [];

    const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-600 mt-1">Overview of your hotel booking platform</p>
                    </div>
                    <Button onClick={() => navigate('/admin/hotels')}>
                        <Hotel size={20} className="mr-2" />
                        Manage Hotels
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">Total Bookings</p>
                                <p className="text-3xl font-bold mt-2">{stats?.totalBookings || 0}</p>
                            </div>
                            <Calendar size={40} className="opacity-80" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm font-medium">Total Revenue</p>
                                <p className="text-3xl font-bold mt-2">₹{((stats?.totalRevenue || 0) / 1000).toFixed(1)}K</p>
                            </div>
                            <DollarSign size={40} className="opacity-80" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm font-medium">Confirmed Bookings</p>
                                <p className="text-3xl font-bold mt-2">
                                    {stats?.bookingsByStatus.find(s => s._id === 'confirmed')?.count || 0}
                                </p>
                            </div>
                            <Users size={40} className="opacity-80" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100 text-sm font-medium">Avg Booking Value</p>
                                <p className="text-3xl font-bold mt-2">
                                    ₹{stats?.totalBookings ? Math.round((stats?.totalRevenue || 0) / stats?.totalBookings / 1000) : 0}K
                                </p>
                            </div>
                            <TrendingUp size={40} className="opacity-80" />
                        </div>
                    </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Monthly Bookings Chart */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Bookings Trend</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Revenue Chart */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Revenue (in ₹K)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                                />
                                <Legend />
                                <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Second Row - Pie Chart and Top Hotels */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Booking Status Distribution */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Status Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(data) => `${data.name}: ${data.value}`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {statusData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Top Hotels */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Top Performing Hotels</h3>
                        <div className="space-y-4">
                            {stats?.topHotels.slice(0, 5).map((hotel, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="font-bold text-blue-600">#{index + 1}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{hotel._id}</p>
                                            <p className="text-sm text-gray-500">{hotel.bookings} bookings</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-green-600">₹{(hotel.revenue / 1000).toFixed(1)}K</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Bookings Table */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Recent Bookings</h3>
                        <Button variant="outline" size="sm" onClick={() => navigate('/admin/bookings')}>
                            <Eye size={18} className="mr-2" />
                            View All
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Booking ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Hotel
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {stats?.recentBookings.slice(0, 10).map((booking) => (
                                    <tr key={booking._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            #{booking._id.slice(-8).toUpperCase()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {booking.hotelName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {booking.user?.name || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                                            ₹{booking.totalPrice.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${booking.status === 'confirmed'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default AdminDashboard;
