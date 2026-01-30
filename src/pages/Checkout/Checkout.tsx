import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, MapPin, Calendar, Clock, CreditCard, Smartphone } from 'lucide-react';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import { venues, bookings } from '../../data/mockData';
import { ImageWithFallback } from '../../components/VenueCard';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const locationState = location.state as { date?: string; time?: string } | null;

    // Find venue by ID or default to first if not found (for safety)
    const venue = venues.find(v => v.id === id) || venues[0];

    const [racketCount, setRacketCount] = useState(0);
    const [ballSetCount, setBallSetCount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet'>('card');

    // Use passed date/time or defaults
    const bookingDate = locationState?.date || '2025-11-02';
    const bookingTime = locationState?.time || '10:00';

    const prices = {
        court: venue.price,
        racket: 50000,
        ballSet: 30000
    };

    const total = prices.court + (racketCount * prices.racket) + (ballSetCount * prices.ballSet);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleConfirmBooking = () => {
        // Generate a random ID for the new booking
        const newBookingId = 'MP' + Math.floor(Math.random() * 1000000);

        // Add new booking to mock data
        bookings.push({
            id: newBookingId,
            venueId: venue.id,
            venueName: venue.name,
            venueImage: venue.image,
            date: bookingDate,
            time: bookingTime,
            sport: venue.sport,
            status: 'Confirmed',
            price: total,
            location: venue.location,
            duration: '1 hour'
        });

        navigate(`/booking-confirmed/${newBookingId}`);
    };

    return (
        <div className="checkout-page">
            <Navbar />

            <div className="checkout-container">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ChevronLeft size={20} /> Back
                </button>

                <h1 className="page-title">Checkout</h1>

                <div className="checkout-content">
                    <div className="checkout-details">
                        {/* Booking Summary */}
                        <section className="checkout-section">
                            <h2 className="section-title">Booking Summary</h2>
                            <div className="booking-summary-card">
                                <div style={{ width: 120, height: 120, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                                    <ImageWithFallback src={venue.image} alt={venue.name} className="booking-venue-image" />
                                </div>
                                <div className="booking-info">
                                    <h3 className="booking-venue-name">{venue.name}</h3>
                                    <div className="booking-detail-row">
                                        <MapPin size={16} />
                                        <span>{venue.location}, Downtown</span>
                                    </div>
                                    <div className="booking-detail-row">
                                        <Calendar size={16} />
                                        <span>{bookingDate}</span>
                                    </div>
                                    <div className="booking-detail-row">
                                        <Clock size={16} />
                                        <span>{bookingTime}</span>
                                    </div>
                                    <span className="sport-tag">{venue.sport}</span>
                                </div>
                            </div>
                        </section>

                        {/* Equipment */}
                        <section className="checkout-section">
                            <h2 className="section-title">Add Equipment</h2>

                            <div className="equipment-item">
                                <div className="equipment-info">
                                    <span className="equipment-name">Racket Rental</span>
                                    <span className="equipment-price">{formatPrice(prices.racket)} per racket</span>
                                </div>
                                <div className="counter-control">
                                    <button
                                        className="counter-btn"
                                        onClick={() => setRacketCount(Math.max(0, racketCount - 1))}
                                    >-</button>
                                    <span className="counter-value">{racketCount}</span>
                                    <button
                                        className="counter-btn"
                                        onClick={() => setRacketCount(racketCount + 1)}
                                    >+</button>
                                </div>
                            </div>

                            <div className="equipment-item">
                                <div className="equipment-info">
                                    <span className="equipment-name">Ball Set</span>
                                    <span className="equipment-price">{formatPrice(prices.ballSet)} per set</span>
                                </div>
                                <div className="counter-control">
                                    <button
                                        className="counter-btn"
                                        onClick={() => setBallSetCount(Math.max(0, ballSetCount - 1))}
                                    >-</button>
                                    <span className="counter-value">{ballSetCount}</span>
                                    <button
                                        className="counter-btn"
                                        onClick={() => setBallSetCount(ballSetCount + 1)}
                                    >+</button>
                                </div>
                            </div>
                        </section>

                        {/* Payment Method */}
                        <section className="checkout-section">
                            <h2 className="section-title">Payment Method</h2>

                            <div className="payment-tabs">
                                <button
                                    className={`payment-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('card')}
                                >
                                    <CreditCard size={20} />
                                    Credit Card
                                </button>
                                <button
                                    className={`payment-tab ${paymentMethod === 'wallet' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('wallet')}
                                >
                                    <Smartphone size={20} />
                                    Digital Wallet
                                </button>
                            </div>

                            {paymentMethod === 'card' && (
                                <div className="card-form">
                                    <div className="form-group">
                                        <label className="form-label">Card Number</label>
                                        <input type="text" className="form-input" placeholder="1234 5678 9012 3456" />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label">Expiry Date</label>
                                            <input type="text" className="form-input" placeholder="MM/YY" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">CVV</label>
                                            <input type="text" className="form-input" placeholder="123" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Order Summary Sidebar */}
                    <aside className="order-summary">
                        <h2 className="section-title">Order Summary</h2>

                        <div className="summary-row">
                            <span>Court booking (1 hour)</span>
                            <span>{formatPrice(prices.court)}</span>
                        </div>

                        {racketCount > 0 && (
                            <div className="summary-row">
                                <span>Rackets x{racketCount}</span>
                                <span>{formatPrice(racketCount * prices.racket)}</span>
                            </div>
                        )}

                        {ballSetCount > 0 && (
                            <div className="summary-row">
                                <span>Ball Sets x{ballSetCount}</span>
                                <span>{formatPrice(ballSetCount * prices.ballSet)}</span>
                            </div>
                        )}

                        <div className="summary-divider"></div>

                        <div className="total-row">
                            <span className="total-label">Total</span>
                            <span className="total-amount">{formatPrice(total)}</span>
                        </div>

                        <button className="confirm-btn" onClick={handleConfirmBooking}>
                            Confirm Booking
                        </button>

                        <p className="legal-text">
                            By confirming, you agree to our Terms of Service and Cancellation Policy
                        </p>
                    </aside>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Checkout;
