import { useNavigate, useParams } from 'react-router-dom';
import { Check, Calendar, Download, Home } from 'lucide-react';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import { bookings, pastBookings } from '../../data/mockData';
import './BookingConfirmed.css';

const BookingConfirmed = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // Find booking in either active or past bookings, or default to a mock one if not found (e.g. fresh checkout)
    const booking = [...bookings, ...pastBookings].find(b => b.id === id) || {
        id: id || 'MP62543918',
        venueName: 'Elite Padel Club',
        date: '2025-11-02',
        time: '10:00',
        sport: 'Padel',
        status: 'Confirmed',
        price: 150000,
        duration: '1 hour',
        location: '123 Sports Avenue, Downtown'
    };

    // QR Code API
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${booking.id}`;

    return (
        <div className="booking-confirmed-page">
            <Navbar />

            <div className="confirmation-container">
                <div className="success-icon-wrapper">
                    <Check size={32} strokeWidth={3} />
                </div>

                <h1 className="confirmation-title">Booking Confirmed!</h1>
                <p className="confirmation-subtitle">Your court has been successfully booked. Get ready to play!</p>

                <div className="confirmation-card">
                    <div className="booking-id-section">
                        <span className="booking-id-label">Booking ID</span>
                        <span className="booking-id-value">{booking.id}</span>
                    </div>

                    <div className="qr-section">
                        <div className="qr-placeholder" style={{ border: 'none', padding: 0, backgroundColor: 'transparent' }}>
                            <img src={qrCodeUrl} alt={`QR Code for ${booking.id}`} style={{ width: '100%', height: '100%' }} />
                        </div>
                        <span className="qr-text">Scan at venue entry</span>
                    </div>

                    <div className="venue-details-section">
                        <span className="confirmed-venue-name">{booking.venueName}</span>

                        <div className="details-grid">
                            <div className="detail-item">
                                <span className="detail-label">Date</span>
                                <span className="detail-value">{booking.date}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Time</span>
                                <span className="detail-value">{booking.time}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Sport</span>
                                <span className="detail-value">{booking.sport}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Duration</span>
                                <span className="detail-value">{booking.duration || '1 hour'}</span>
                            </div>
                        </div>

                        <div className="location-box">
                            <span className="location-label">Location</span>
                            <span className="location-value">{booking.location || 'Downtown Area'}</span>
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    <button className="secondary-btn">
                        <Calendar size={18} />
                        Add to Calendar
                    </button>
                    <button className="secondary-btn">
                        <Download size={18} />
                        Download Receipt
                    </button>
                </div>

                <div className="primary-actions">
                    <button className="primary-btn" onClick={() => navigate('/my-bookings')}>
                        View My Bookings
                    </button>
                    <button className="primary-btn-dark" onClick={() => navigate('/home')}>
                        <Home size={18} />
                        Back to Home
                    </button>
                </div>

                <p style={{ marginTop: 24, fontSize: '0.75rem', color: '#6b7280', textAlign: 'center', lineHeight: 1.5 }}>
                    A confirmation email has been sent to your registered email address.<br />
                    Free cancellation available up to 24 hours before your booking.
                </p>
            </div>

            <Footer />
        </div>
    );
};

export default BookingConfirmed;
