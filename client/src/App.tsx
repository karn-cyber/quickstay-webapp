import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import HotelDetails from './pages/HotelDetails';
import RoomDetails from './pages/RoomDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminHotelManagement from './pages/AdminHotelManagement';
import AdminHotelCreate from './pages/AdminHotelCreate';
import AdminHotelEdit from './pages/AdminHotelEdit';
import AdminBookingManagement from './pages/AdminBookingManagement';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/hotels" element={<AdminHotelManagement />} />
          <Route path="/admin/hotels/create" element={<AdminHotelCreate />} />
          <Route path="/admin/hotels/:id/edit" element={<AdminHotelEdit />} />
          <Route path="/admin/bookings" element={<AdminBookingManagement />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
