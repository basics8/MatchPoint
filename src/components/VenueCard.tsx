import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Venue } from '../data/mockData';
import './VenueCard.css';

export const ImageWithFallback = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
    const [imgSrc, setImgSrc] = React.useState(src);
    const [hasError, setHasError] = React.useState(false);

    const handleError = () => {
        if (!hasError) {
            setImgSrc('https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=1000');
            setHasError(true);
        }
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            onError={handleError}
        />
    );
};

interface VenueCardProps {
    venue: Venue;
}

export const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
    const navigate = useNavigate();

    return (
        <div className="venue-card">
            <div className="venue-image-container">
                <ImageWithFallback
                    src={venue.image}
                    alt={venue.name}
                    className="venue-image"
                />
            </div>
            <div className="venue-details">
                <h3 className="venue-name">{venue.name}</h3>

                <div className="venue-card-content">
                    <div className="venue-header">
                        <h3 className="venue-name" onClick={() => navigate(`/venue/${venue.id}`)} style={{ cursor: 'pointer' }}>{venue.name}</h3>
                        <div className="venue-rating">
                            <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                            <span>{venue.rating} ({venue.reviews})</span>
                        </div>
                        <div className="venue-price">
                            <strong>
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(venue.price)}
                            </strong>/hour
                        </div>
                    </div>

                    <div className="venue-meta">
                        <div className="venue-location">
                            <MapPin size={14} />
                            <span>{venue.location}</span>
                        </div>
                        <span className="dot">•</span>
                        <span className="venue-sport">{venue.sport}</span>
                    </div>
                </div>

                <button className="book-btn" onClick={() => navigate(`/venue/${venue.id}`)}>Book Now</button>
            </div>
        </div>
    );
};
