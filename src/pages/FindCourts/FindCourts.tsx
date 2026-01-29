import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import { FilterSidebar } from '../../components/FindCourts/FilterSidebar';
import { VenueCard } from '../../components/VenueCard';
import { venues } from '../../data/mockData';
import './FindCourts.css';

const FindCourts = () => {
    return (
        <div className="find-courts-page">
            <Navbar />

            <main className="find-courts-main">
                <div className="page-header">
                    <h1 className="page-title">Available Courts</h1>
                    <p className="results-count">{venues.length} venues found</p>
                </div>

                <div className="content-grid">
                    <aside className="find-courts-sidebar">
                        <FilterSidebar />
                    </aside>

                    <div className="venues-grid">
                        {venues.map((venue) => (
                            <VenueCard key={venue.id} venue={venue} />
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default FindCourts;
