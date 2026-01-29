import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './Layout.css';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo" onClick={() => navigate('/home')}>
                    MatchPoint
                </div>
                <div className="navbar-links">
                    <span onClick={() => navigate('/find-courts')} className="nav-link" style={{ cursor: 'pointer' }}>Find Courts</span>
                    <span onClick={() => navigate('/my-bookings')} className="nav-link" style={{ cursor: 'pointer' }}>My Bookings</span>
                    <span onClick={() => navigate('/dashboard')} className="nav-link" style={{ cursor: 'pointer' }}>Dashboard</span>
                </div>
                <div className="navbar-actions">
                    <button className="profile-btn" onClick={() => navigate('/dashboard')}>
                        <FaUser className="profile-icon" /> Profile
                    </button>
                    <button className="sign-out-btn" onClick={() => navigate('/')}>
                        Sign Out
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
