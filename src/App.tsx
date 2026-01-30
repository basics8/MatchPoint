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
      </Routes>
    </Router>
  );
}

export default App;
