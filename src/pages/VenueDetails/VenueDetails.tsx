import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, MapPin, Wifi, Car, Droplets, ShoppingBag, Coffee, Clock } from 'lucide-react';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import { venues } from '../../data/mockData';
import { ImageWithFallback } from '../../components/VenueCard';
import './VenueDetails.css';

const VenueDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');

    // Find venue or use default if not found
    const venue = venues.find(v => v.id === id) || venues[0];

    // Extended mock data specific to this page view
    const description = "Premium padel facility with state-of-the-art courts and modern amenities. Perfect for both competitive play and casual matches.";
    const surfaceType = venue.sport === 'Padel' ? 'Artificial Grass' : 'Hard Court';
    const images = [
        venue.image,
        'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000',
    ];

    const timeSlots = [
        '09:00', '10:00', '11:00',
        '14:00', '15:00', '16:00',
        '18:00', '19:00', '20:00'
    ];

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="venue-details-page">
            <Navbar />

            <div className="venue-details-container">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ChevronLeft size={20} /> Back
                </button>

                <div className="venue-header">
                    <div className="venue-title-section">
                        <h1>{venue.name}</h1>
                        <div className="venue-location">
                            <MapPin size={16} />
                            <span>{venue.location} • Downtown</span>
                        </div>
                    </div>
                    <div className="venue-rating-badge">
                        <Star size={16} fill="currentColor" />
                        <span>{venue.rating} ({venue.reviews} reviews)</span>
                    </div>
                </div>

                <div className="photo-grid">
                    <ImageWithFallback src={images[0]} alt="Main view" className="photo-item main-photo" />
                    <div className="secondary-photos">
                        <ImageWithFallback src={images[1]} alt="Court view" className="photo-item" />
                        <ImageWithFallback src={images[2]} alt="Facility view" className="photo-item" />
                    </div>
                </div>

                <div className="venue-content-grid">
                    <div className="left-content">
                        <section>
                            <h2 className="section-title">About this venue</h2>
                            <p className="venue-description">{description}</p>
                        </section>

                        <section>
                            <h2 className="section-title">Details</h2>
                            <div className="details-grid">
                                <div className="detail-card">
                                    <span className="detail-label">Sport</span>
                                    <span className="detail-value">{venue.sport}</span>
                                </div>
                                <div className="detail-card">
                                    <span className="detail-label">Surface Type</span>
                                    <span className="detail-value">{surfaceType}</span>
                                </div>
                                <div className="detail-card">
                                    <span className="detail-label">Location</span>
                                    <span className="detail-value">Outdoor</span>
                                </div>
                                <div className="detail-card">
                                    <span className="detail-label">Price</span>
                                    <span className="detail-value">{formatPrice(venue.price)}/hour</span>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="section-title">Amenities</h2>
                            <div className="amenities-grid">
                                <div className="amenity-item">
                                    <div className="amenity-icon"><Wifi size={18} /></div>
                                    <span>WiFi</span>
                                </div>
                                <div className="amenity-item">
                                    <div className="amenity-icon"><Car size={18} /></div>
                                    <span>Parking</span>
                                </div>
                                <div className="amenity-item">
                                    <div className="amenity-icon"><Droplets size={18} /></div>
                                    <span>Showers</span>
                                </div>
                                <div className="amenity-item">
                                    <div className="amenity-icon"><ShoppingBag size={18} /></div>
                                    <span>Lockers</span>
                                </div>
                                <div className="amenity-item">
                                    <div className="amenity-icon"><ShoppingBag size={18} /></div>
                                    <span>Pro Shop</span>
                                </div>
                                <div className="amenity-item">
                                    <div className="amenity-icon"><Coffee size={18} /></div>
                                    <span>Café</span>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="section-title">Opening Hours</h2>
                            <div className="opening-hours">
                                <Clock size={20} />
                                <span>6:00 AM - 11:00 PM</span>
                            </div>
                        </section>
                    </div>

                    <aside className="right-sidebar">
                        <div className="booking-widget">
                            <div className="booking-price-header">
                                <span className="price-large">{formatPrice(venue.price)}</span>
                                <span className="price-unit">/hour</span>
                            </div>

                            <div className="date-selector">
                                <label className="detail-label">Select Date</label>
                                <input
                                    type="date"
                                    className="date-input"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>

                            <div className="time-selector">
                                <label className="detail-label">Available Time Slots</label>
                                <div className="time-slots">
                                    {timeSlots.map(time => (
                                        <button
                                            key={time}
                                            className={`time-slot-btn ${selectedTime === time ? 'selected' : ''}`}
                                            onClick={() => setSelectedTime(time)}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="checkout-btn"
                                onClick={() => {
                                    if (!selectedDate || !selectedTime) {
                                        alert('Please select both date and time');
                                        return;
                                    }
                                    navigate(`/checkout/${id}`, { state: { date: selectedDate, time: selectedTime } });
                                }}
                            >
                                Continue to Checkout
                            </button>
                            <p className="cancellation-note">Free cancellation up to 24 hours before</p>
                        </div>
                    </aside>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default VenueDetails;
