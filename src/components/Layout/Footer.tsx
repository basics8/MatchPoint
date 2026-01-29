import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';
import './Layout.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3 className="footer-title">MatchPoint</h3>
                    <p className="footer-desc">
                        Find and book premium sports venues for Padel, Tennis, and Badminton.
                    </p>
                </div>
                <div className="footer-section">
                    <h4 className="footer-heading">Company</h4>
                    <ul className="footer-links">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Press</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4 className="footer-heading">Support</h4>
                    <ul className="footer-links">
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4 className="footer-heading">Follow Us</h4>
                    <div className="social-links">
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaFacebookF /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2025 MatchPoint. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
