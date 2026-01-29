import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import { FilterSidebar } from '../../components/FindCourts/FilterSidebar';
import { VenueCard } from '../../components/VenueCard';
import { venues } from '../../data/mockData';
import './FindCourts.css';

interface FilterState {
    sport: string;
    minPrice: number;
    maxPrice: number;
    locationType: string;
    facilities: string[];
}

const FindCourts = () => {
    const [searchParams] = useSearchParams();

    // Initial State with URL params support (e.g. ?sport=Padel)
    const [filters, setFilters] = useState<FilterState>({
        sport: searchParams.get('sport') || '',
        minPrice: 0,
        maxPrice: 300000, // Default max reasonable price
        locationType: '',
        facilities: []
    });

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

        // Filter by Location Type (Simple substring match for mock data context)
        // Note: Real app would need structured data for this. 
        // For now, we'll skip if empty or assume all are matched since mock data lacks this field explicitly/

        return true;
    });

    return (
        <div className="find-courts-page">
            <Navbar />

            <main className="find-courts-main">
                <div className="page-header">
                    <h1 className="page-title">Available Courts</h1>
                    <p className="results-count">
                        {filteredVenues.length} {filteredVenues.length === 1 ? 'venue' : 'venues'} found
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
                        {filteredVenues.length > 0 ? (
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
