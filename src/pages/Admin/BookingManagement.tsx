import { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import AdminLayout from '../../components/Admin/AdminLayout';
import './BookingManagement.css';

interface BookingData {
    id: string;
    userName: string;
    email: string;
    dateTime: string;
    venue: string;
    sport: 'Tennis' | 'Badminton' | 'Padel';
    amount: number;
    paymentStatus: 'Completed' | 'Pending';
    status: 'Confirmed' | 'Pending' | 'Cancelled';
}

const BookingManagement = () => {
    // Mock Data based on the image provided
    const [bookings, setBookings] = useState<BookingData[]>([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('/api/admin/bookings', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                const mappedBookings: BookingData[] = data.map((b: any) => ({
                    id: `BK${b.id}`,
                    userName: b.user ? b.user.username : 'Unknown', // Handle potential null if user deleted
                    email: '-', // User email not always in booking join unless we select it, simplified for now
                    dateTime: `${b.date} ${b.time}`,
                    venue: b.venue ? b.venue.name : 'Unknown Venue',
                    sport: b.sport || 'Tennis',
                    amount: b.totalPrice || 0,
                    paymentStatus: 'Completed', // Hardcoded as DB doesn't have payment status yet
                    status: b.status || 'Pending'
                }));
                setBookings(mappedBookings);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    // Calculate stats
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
    const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
    const cancelledBookings = bookings.filter(b => b.status === 'Cancelled').length;

    return (
        <AdminLayout title="Booking Management" breadcrumbs={['Dashboard', 'Bookings']}>
            {/* Summary Cards */}
            <div className="summary-cards">
                <div className="summary-card">
                    <span className="summary-label">Total Bookings</span>
                    <span className="summary-value">{totalBookings}</span>
                </div>
                <div className="summary-card">
                    <span className="summary-label">Confirmed</span>
                    <span className="summary-value">{confirmedBookings}</span>
                </div>
                <div className="summary-card">
                    <span className="summary-label">Pending</span>
                    <span className="summary-value">{pendingBookings}</span>
                </div>
                <div className="summary-card">
                    <span className="summary-label">Cancelled</span>
                    <span className="summary-value">{cancelledBookings}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="booking-controls">
                <div className="search-wrapper">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by booking ID, user, or venue..."
                        className="search-input"
                    />
                </div>
                <div className="filter-wrapper">
                    <span className="filter-text">All Statuses</span>
                    <ChevronDown size={16} className="filter-icon" />
                </div>
            </div>

            {/* Table */}
            <div className="venue-table-container">
                <table className="venue-table">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Date/Time</th>
                            <th>Venue</th>
                            <th>Sport</th>
                            <th>Amount</th>
                            <th>Payment</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td className="font-medium">{booking.id}</td>
                                <td>
                                    <div className="user-info">
                                        <span className="user-name">{booking.userName}</span>
                                    </div>
                                </td>
                                <td className="text-gray">{booking.email}</td>
                                <td className="text-gray" style={{ whiteSpace: 'pre-line' }}>{booking.dateTime.replace(' ', '\n')}</td>
                                <td className="text-gray venue-cell-wrap">{booking.venue}</td>
                                <td>
                                    <span className="sport-tag-small">
                                        {booking.sport}
                                    </span>
                                </td>
                                <td className="font-medium">Rp {booking.amount.toLocaleString('id-ID')}</td>
                                <td>
                                    <span className={`status-badge-outline ${booking.paymentStatus.toLowerCase()}`}>
                                        {booking.paymentStatus}
                                    </span>
                                </td>
                                <td>
                                    <span className={`status-badge-solid ${booking.status.toLowerCase()}`}>
                                        {booking.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default BookingManagement;
