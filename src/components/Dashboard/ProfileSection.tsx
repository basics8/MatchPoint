import './ProfileSection.css';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export const ProfileSection = () => {
    return (
        <div className="profile-section">
            <h2 className="section-title">Profile Information</h2>

            <div className="profile-content">
                <div className="profile-avatar-wrapper">
                    <ImageWithFallback
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Profile"
                        className="profile-avatar"
                    />
                </div>

                <div className="profile-form">
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            defaultValue="Alex Johnson"
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            defaultValue="alex.johnson@email.com"
                            className="form-input"
                        />
                    </div>

                    <button className="edit-profile-btn">Edit Profile</button>
                </div>
            </div>
        </div>
    );
};
