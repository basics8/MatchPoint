import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import { FilterSidebar } from '../../components/FindCourts/FilterSidebar';
import { VenueCard } from '../../components/VenueCard';
import './FindCourts.css';

interface Venue {
    id: string; // or number, backend sends ID usually
    name: string;
    location: string;
    rating: number;
    reviews: number;
    price: number;
    sport: 'Padel' | 'Tennis' | 'Badminton';
    image: string;
    description?: string;
}

interface FilterState {
    sport: string;
    minPrice: number;
    maxPrice: number;
    locationType: string;
    facilities: string[];
}

const FindCourts = () => {
    const [searchParams] = useSearchParams();
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);

    // Initial State with URL params support (e.g. ?sport=Padel)
    const [filters, setFilters] = useState<FilterState>({
        sport: searchParams.get('sport') || '',
        minPrice: 0,
        maxPrice: 300000,
        locationType: '',
        facilities: []
    });

    // Fetch Venues from API
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

    // Update filters if URL params change
    useEffect(() => {
        const sportParam = searchParams.get('sport');
        if (sportParam) {
            setFilters(prev => ({ ...prev, sport: sportParam }));
        }
    }, [searchParams]);

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    const handleReset = () => {
        setFilters({
            sport: '',
            minPrice: 0,
            maxPrice: 500000,
            locationType: '',
            facilities: []
        });
    };

    // Filter Logic
    const filteredVenues = venues.filter(venue => {
        // Filter by Sport
        if (filters.sport && venue.sport !== filters.sport) return false;

        // Filter by Price
        if (venue.price < filters.minPrice) return false;
        if (venue.price > filters.maxPrice) return false;

        return true;
    });

    return (
        <div className="find-courts-page">
            <Navbar />

            <main className="find-courts-main">
                <div className="page-header">
                    <h1 className="page-title">Available Courts</h1>
                    <p className="results-count">
                        {loading ? 'Loading...' : `${filteredVenues.length} ${filteredVenues.length === 1 ? 'venue' : 'venues'} found`}
                    </p>
                </div>

                <div className="content-grid">
                    <aside className="find-courts-sidebar">
                        <FilterSidebar
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onReset={handleReset}
                        />
                    </aside>

                    <div className="venues-grid">
                        {loading ? (
                            <div className="loading-state">Loading venues...</div>
                        ) : filteredVenues.length > 0 ? (
                            filteredVenues.map((venue) => (
                                <VenueCard key={venue.id} venue={venue} />
                            ))
                        ) : (
                            <div className="no-results">
                                <p>No venues found matching your criteria.</p>
                                <button className="clear-filter-btn" onClick={handleReset}>Clear All Filters</button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default FindCourts;

