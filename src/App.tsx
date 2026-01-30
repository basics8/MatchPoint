import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContainer from './components/Auth/AuthContainer';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import MyBookings from './pages/MyBookings/MyBookings';
import VenueDetails from './pages/VenueDetails/VenueDetails';
import Checkout from './pages/Checkout/Checkout';
import BookingConfirmed from './pages/BookingConfirmed/BookingConfirmed';
import FindCourts from './pages/FindCourts/FindCourts';
import AdminOverview from './pages/Admin/AdminOverview';
import VenueManagement from './pages/Admin/VenueManagement';
import BookingManagement from './pages/Admin/BookingManagement';
import UserManagement from './pages/Admin/UserManagement';
import FinancialReports from './pages/Admin/FinancialReports';
import AdminSettings from './pages/Admin/AdminSettings';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthContainer />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/venue/:id" element={<VenueDetails />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/booking-confirmed/:id" element={<BookingConfirmed />} />
        <Route path="/find-courts" element={<FindCourts />} />
        <Route path="/admin" element={<AdminOverview />} />
        <Route path="/admin/venues" element={<VenueManagement />} />
        <Route path="/admin/bookings" element={<BookingManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/financial" element={<FinancialReports />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
