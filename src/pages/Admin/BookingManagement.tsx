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
    const bookings: BookingData[] = [
        { id: 'BK2601', userName: 'Alex Johnson', email: 'alex.johnson@email.com', dateTime: '2026-01-10 18:00', venue: 'Elite Padel Club - Court A', sport: 'Padel', amount: 65000, paymentStatus: 'Completed', status: 'Confirmed' },
        { id: 'BK2602', userName: 'Sarah Williams', email: 'sarah.w@email.com', dateTime: '2026-01-11 14:00', venue: 'Metropolitan Tennis Center - Court 1', sport: 'Tennis', amount: 85000, paymentStatus: 'Completed', status: 'Confirmed' },
        { id: 'BK2603', userName: 'Michael Chen', email: 'mchen@email.com', dateTime: '2026-01-09 20:00', venue: 'Urban Badminton Arena - Court 1', sport: 'Badminton', amount: 45000, paymentStatus: 'Pending', status: 'Pending' },
        { id: 'BK2604', userName: 'Emma Davis', email: 'emma.d@email.com', dateTime: '2026-01-08 10:00', venue: 'Premier Tennis Academy - Court 1', sport: 'Tennis', amount: 95000, paymentStatus: 'Completed', status: 'Cancelled' },
        { id: 'BK2605', userName: 'James Rodriguez', email: 'james.r@email.com', dateTime: '2026-01-12 16:00', venue: 'Riverside Padel Courts - Court A', sport: 'Padel', amount: 60000, paymentStatus: 'Completed', status: 'Confirmed' },
        { id: 'BK2606', userName: 'Linda Martinez', email: 'linda.m@email.com', dateTime: '2026-01-13 19:00', venue: 'CityCenter Badminton Club - Court 1', sport: 'Badminton', amount: 40000, paymentStatus: 'Completed', status: 'Confirmed' },
        { id: 'BK2607', userName: 'Robert Wilson', email: 'r.wilson@email.com', dateTime: '2026-01-14 09:00', venue: 'Skyline Badminton Arena - Court 3', sport: 'Badminton', amount: 45000, paymentStatus: 'Pending', status: 'Pending' },
        { id: 'BK2608', userName: 'Patricia Moore', email: 'patricia.m@email.com', dateTime: '2026-01-15 15:00', venue: 'Grand Slam Tennis Club - Court 2', sport: 'Tennis', amount: 90000, paymentStatus: 'Completed', status: 'Confirmed' },
    ];

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
