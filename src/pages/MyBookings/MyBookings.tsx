import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, MoreVertical } from 'lucide-react';
import { bookings, pastBookings, type Booking } from '../../data/mockData';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import RescheduleModal from '../../components/MyBookings/RescheduleModal';
import './MyBookings.css';

const MyBookings = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('upcoming');
    const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const handleRescheduleClick = (booking: Booking) => {
        setSelectedBooking(booking);
        setIsRescheduleModalOpen(true);
    };

    const handleConfirmReschedule = (newDate: string, newTime: string) => {
        // In a real app, this would make an API call
        console.log(`Rescheduling booking ${selectedBooking?.id} to ${newDate} at ${newTime}`);
        setIsRescheduleModalOpen(false);
        setSelectedBooking(null);
    };

    const handleBookAgain = (venueId: string) => {
        navigate(`/venue/${venueId}`);
    };

    return (
        <div className="my-bookings-page">
            <Navbar />

            <main className="my-bookings-main">
                <h1 className="page-title">My Bookings</h1>

                <div className="tabs-header">
                    <button
                        className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
                        onClick={() => setActiveTab('upcoming')}
                    >
                        Upcoming
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        Past History
                    </button>
                </div>

                {activeTab === 'upcoming' && (
                    <div className="bookings-list">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="booking-card">
                                <div className="card-header">
                                    <div className="venue-name-status">
                                        <h3 className="venue-name">{booking.venueName}</h3>
                                        <span className="status-badge confirmed">{booking.status}</span>
                                    </div>
                                    <MoreVertical className="menu-dots" size={20} />
                                </div>

                                <div className="card-details">
                                    <div className="detail-item">
                                        <Calendar size={16} />
                                        <span>{booking.date}</span>
                                    </div>
                                    <div className="detail-item">
                                        <Clock size={16} />
                                        <span>{booking.time}</span>
                                    </div>
                                    <div className="detail-item">
                                        <MapPin size={16} />
                                        <span>{booking.sport}</span>
                                    </div>
                                </div>

                                <div className="booking-id-price">
                                    <span className="booking-id">Booking ID: {booking.id}</span>
                                    <span className="booking-price">
                                        {new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0
                                        }).format(booking.price)}
                                    </span>
                                </div>

                                <div className="card-actions">
                                    <button className="action-btn primary" onClick={() => navigate(`/booking-confirmed/${booking.id}`)}>View QR Code</button>
                                    <button className="action-btn secondary" onClick={() => handleRescheduleClick(booking)}>Reschedule</button>
                                    <button className="action-btn danger">Cancel</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="bookings-list">
                        {pastBookings.map((booking) => (
                            <div key={booking.id} className="booking-card">
                                <div className="card-header">
                                    <div className="venue-name-status">
                                        <h3 className="venue-name">{booking.venueName}</h3>
                                        <span className="status-badge completed">{booking.status}</span>
                                    </div>
                                    <MoreVertical className="menu-dots" size={20} />
                                </div>

                                <div className="card-details">
                                    <div className="detail-item">
                                        <Calendar size={16} />
                                        <span>{booking.date}</span>
                                    </div>
                                    <div className="detail-item">
                                        <Clock size={16} />
                                        <span>{booking.time}</span>
                                    </div>
                                    <div className="detail-item">
                                        <MapPin size={16} />
                                        <span>{booking.sport}</span>
                                    </div>
                                </div>

                                <div className="booking-id-price">
                                    <span className="booking-id">Booking ID: {booking.id}</span>
                                    <span className="booking-price">
                                        {new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0
                                        }).format(booking.price)}
                                    </span>
                                </div>

                                <div className="card-actions">
                                    <button className="action-btn secondary" onClick={() => handleBookAgain(booking.venueId)}>Book Again</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />

            {selectedBooking && (
                <RescheduleModal
                    isOpen={isRescheduleModalOpen}
                    onClose={() => setIsRescheduleModalOpen(false)}
                    onConfirm={handleConfirmReschedule}
                    currentDate={selectedBooking.date}
                    currentTime={selectedBooking.time}
                />
            )}
        </div>
    );
};

export default MyBookings;
