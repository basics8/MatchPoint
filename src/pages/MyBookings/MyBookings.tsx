import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, MoreVertical } from 'lucide-react';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import RescheduleModal from '../../components/MyBookings/RescheduleModal';
import './MyBookings.css';

interface Booking {
    id: string; // or number
    venueName: string; // comes from included Venue model
    venueId: string;
    date: string;
    time: string;
    sport: string;
    status: 'Confirmed' | 'Completed' | 'Cancelled';
    price: number;
    venue?: {
        name: string;
        location: string;
        image: string;
    };
    totalPrice?: number; // Backend field name
}

const MyBookings = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('upcoming');
    const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const [bookingsList, setBookingsList] = useState<Booking[]>([]);
    const [pastBookingsList, setPastBookingsList] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            const userStr = localStorage.getItem('user');
            if (!userStr) {
                navigate('/');
                return;
            }
            const user = JSON.parse(userStr);

            try {
                const type = user.roles || 'user';
                const response = await fetch(`/api/bookings/user/${user.id}?type=${type}`);
                if (response.ok) {
                    const data = await response.json();

                    // Separate into upcoming and past
                    const today = new Date().toISOString().split('T')[0];
                    const upcoming: Booking[] = [];
                    const past: Booking[] = [];

                    data.forEach((b: any) => {
                        // Map backend data structure to frontend interface if needed
                        // Backend returns 'venue' object included.
                        // Backend uses 'totalPrice', frontend logic often used 'price'.
                        const mappedBooking: Booking = {
                            id: b.id,
                            venueName: b.venue ? b.venue.name : 'Unknown Venue',
                            venueId: b.venueId,
                            date: b.date,
                            time: b.time,
                            sport: b.sport,
                            status: b.status,
                            price: b.totalPrice,
                            venue: b.venue
                        };

                        if (b.date >= today) {
                            upcoming.push(mappedBooking);
                        } else {
                            past.push(mappedBooking);
                        }
                    });

                    setBookingsList(upcoming);
                    setPastBookingsList(past);
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [navigate]);

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

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>Loading bookings...</div>
                ) : (
                    <>
                        {activeTab === 'upcoming' && (
                            <div className="bookings-list">
                                {bookingsList.length > 0 ? (
                                    bookingsList.map((booking) => (
                                        <div key={booking.id} className="booking-card">
                                            <div className="card-header">
                                                <div className="venue-name-status">
                                                    <h3 className="venue-name">{booking.venueName}</h3>
                                                    <span className={`status-badge ${booking.status.toLowerCase()}`}>{booking.status}</span>
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
                                    ))
                                ) : (
                                    <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>No upcoming bookings found.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div className="bookings-list">
                                {pastBookingsList.length > 0 ? (
                                    pastBookingsList.map((booking) => (
                                        <div key={booking.id} className="booking-card">
                                            <div className="card-header">
                                                <div className="venue-name-status">
                                                    <h3 className="venue-name">{booking.venueName}</h3>
                                                    <span className={`status-badge ${booking.status.toLowerCase()}`}>{booking.status}</span>
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
                                    ))
                                ) : (
                                    <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>No past bookings found.</p>
                                )}
                            </div>
                        )}
                    </>
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
