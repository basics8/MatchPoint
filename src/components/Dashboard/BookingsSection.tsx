import { Link } from 'react-router-dom';
import './BookingsSection.css';

export const BookingsSection = () => {
    return (
        <div className="bookings-section">
            <h2 className="bookings-title">My Bookings</h2>
            <p className="bookings-content">
                View your bookings in the <Link to="/my-bookings" className="bookings-link">My Bookings</Link> page.
            </p>
            {/* Note: The user screenshot implies this is a placeholder or pointer. 
                If the user wanted the actual list here, they would likely have provided a design with a list. 
                For now, matching the screenshot exactly. */}
        </div>
    );
};
