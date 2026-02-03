import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Calendar, Search, ChevronRight } from 'lucide-react';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import { VenueCard } from '../../components/VenueCard';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import './Home.css';

interface Venue {
    id: string; // or number
    name: string;
    location: string;
    rating: number;
    reviews: number;
    price: number;
    sport: 'Padel' | 'Tennis' | 'Badminton';
    image: string;
    description?: string;
}

const Home = () => {
    const navigate = useNavigate();
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState({
        location: '',
        date: '',
        sport: '',
    });

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await fetch('/api/venues');
                if (response.ok) {
                    const data = await response.json();
                    setVenues(data);
                }
            } catch (error) {
                console.error("Error fetching venues:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Pass search params to FindCourts via URL
        const params = new URLSearchParams();
        if (searchQuery.sport) params.append('sport', searchQuery.sport);
        navigate(`/find-courts?${params.toString()}`);
    };

    const topRatedVenues = venues.filter(v => v.rating >= 4.7).slice(0, 3);

    const categories = [
        {
            name: 'Padel',
            image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            count: venues.filter(v => v.sport === 'Padel').length,
        },
        {
            name: 'Tennis',
            image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            count: venues.filter(v => v.sport === 'Tennis').length,
        },
        {
            name: 'Badminton',
            image: 'https://images.unsplash.com/photo-1626224583764-84786c71b221?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            count: venues.filter(v => v.sport === 'Badminton').length,
        },
    ];

    return (
        <div className="dashboard-page">
            <Navbar />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    <h1 className="hero-title">Find Your MatchPoint</h1>
                    <p className="hero-subtitle">Book premium courts for Padel, Tennis, and Badminton in your area</p>

                    <form onSubmit={handleSearch} className="search-bar">
                        {/* Location Input */}
                        <div className="search-input-group">
                            <MapPin className="search-icon" />
                            <input
                                type="text"
                                placeholder="Location"
                                value={searchQuery.location}
                                onChange={(e) => setSearchQuery({ ...searchQuery, location: e.target.value })}
                                className="search-input"
                            />
                        </div>

                        <div className="search-divider"></div>

                        {/* Date Input */}
                        <div className="search-input-group">
                            <Calendar className="search-icon" />
                            <input
                                type="date"
                                value={searchQuery.date}
                                onChange={(e) => setSearchQuery({ ...searchQuery, date: e.target.value })}
                                className="search-input"
                            />
                        </div>

                        <div className="search-divider"></div>

                        {/* Sport Select */}
                        <div className="search-input-group">
                            <select
                                value={searchQuery.sport}
                                onChange={(e) => setSearchQuery({ ...searchQuery, sport: e.target.value })}
                                className="search-input"
                            >
                                <option value="">All Sports</option>
                                <option value="Padel">Padel</option>
                                <option value="Tennis">Tennis</option>
                                <option value="Badminton">Badminton</option>
                            </select>
                        </div>

                        <button type="submit" className="search-btn">
                            <Search className="btn-icon" /> Search
                        </button>
                    </form>
                </div>
            </section>

            <main className="dashboard-content">
                {/* Browse by Sport */}
                <section className="section-container">
                    <h2 className="section-title">Browse by Sport</h2>
                    <div className="categories-grid">
                        {categories.map((category) => (
                            <Link
                                key={category.name}
                                to={`/find-courts?sport=${category.name}`}
                                className="category-card"
                            >
                                <div className="category-image-wrapper">
                                    <ImageWithFallback
                                        src={category.image}
                                        alt={category.name}
                                        className="category-image"
                                    />
                                </div>
                                <div className="category-overlay">
                                    <h3>{category.name}</h3>
                                    <p>{category.count} venues available</p>
                                    <ChevronRight className="category-arrow" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Top Rated Courts */}
                <section className="section-container">
                    <div className="section-header">
                        <h2 className="section-title">Top Rated Courts</h2>
                        <Link to="/find-courts" className="view-all">View All <ChevronRight size={16} /></Link>
                    </div>

                    <div className="courts-grid">
                        {loading ? (
                            <p>Loading top rated courts...</p>
                        ) : (
                            topRatedVenues.map((venue) => (
                                <VenueCard key={venue.id} venue={venue} />
                            ))
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="cta-container">
                        <h2>Ready to Play?</h2>
                        <p>Join thousands of players booking their favorite courts through MatchPoint</p>
                        <Link to="/find-courts" className="cta-btn">Find a Court</Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
