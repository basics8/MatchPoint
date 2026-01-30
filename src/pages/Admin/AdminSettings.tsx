import { useState } from 'react';
import { Save } from 'lucide-react';
import AdminLayout from '../../components/Admin/AdminLayout';
import './AdminSettings.css';

const AdminSettings = () => {
    // State for Profile
    const [profile, setProfile] = useState({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@matchpoint.com',
        phone: '+1 (555) 000-0000',
        bio: ''
    });

    // State for Security
    const [security, setSecurity] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactor: false
    });

    // State for Platform
    const [platform, setPlatform] = useState({
        commission: 5,
        tax: 8.5,
        currency: 'USD ($)', // Keeping text input for now or select
        cancellationWindow: 24
    });

    // State for Notifications
    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        reports: true,
        alerts: true
    });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePlatformChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlatform({ ...platform, [e.target.name]: e.target.value });
    };

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications({ ...notifications, [key]: !notifications[key] });
    };

    const toggle2FA = () => {
        setSecurity({ ...security, twoFactor: !security.twoFactor });
    };

    const saveButton = (
        <button className="save-btn">
            <Save size={18} /> Save Changes
        </button>
    );

    return (
        <AdminLayout
            title="Platform Configuration"
            breadcrumbs={['Dashboard', 'Settings']}
            actions={saveButton}
        >
            <div className="settings-grid">

                {/* Profile Settings */}
                <div className="settings-section-card">
                    <h2 className="section-title">Profile Settings</h2>

                    <div className="profile-header">
                        <div className="profile-avatar-large">AD</div>
                        <div className="profile-upload-info">
                            <span className="profile-upload-title">Profile Photo</span>
                            <span className="profile-upload-desc">Upload a new avatar (JPG, PNG, max 2MB)</span>
                            <button className="choose-file-btn">Choose File</button>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                className="form-input"
                                value={profile.firstName}
                                onChange={handleProfileChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                className="form-input"
                                value={profile.lastName}
                                onChange={handleProfileChange}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                value={profile.email}
                                onChange={handleProfileChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                className="form-input"
                                value={profile.phone}
                                onChange={handleProfileChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Bio</label>
                        <textarea
                            name="bio"
                            className="form-textarea"
                            placeholder="Tell us about yourself..."
                            value={profile.bio}
                            onChange={handleProfileChange}
                        ></textarea>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="settings-section-card">
                    <h2 className="section-title">Security</h2>

                    <div className="form-group">
                        <label className="form-label">Change Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Current Password"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-input"
                                placeholder="New Password"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-input"
                                placeholder="Confirm Password"
                            />
                        </div>
                    </div>

                    <div className="toggle-wrapper" style={{ marginTop: '16px', borderTop: '1px solid #f3f4f6', paddingTop: '24px' }}>
                        <div className="toggle-label-group">
                            <span className="toggle-title">Two-Factor Authentication</span>
                            <span className="toggle-desc">Add an extra layer of security to your account</span>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={security.twoFactor}
                                onChange={toggle2FA}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                {/* Platform Settings */}
                <div className="settings-section-card">
                    <h2 className="section-title">Platform Settings</h2>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Platform Commission (%)</label>
                            <input
                                type="number"
                                name="commission"
                                className="form-input"
                                value={platform.commission}
                                onChange={handlePlatformChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Tax Rate (%)</label>
                            <input
                                type="number"
                                name="tax"
                                className="form-input"
                                value={platform.tax}
                                onChange={handlePlatformChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Default Currency</label>
                        <input
                            type="text"
                            name="currency"
                            className="form-input"
                            value={platform.currency}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Cancellation Window (hours)</label>
                        <input
                            type="number"
                            name="cancellationWindow"
                            className="form-input"
                            value={platform.cancellationWindow}
                            onChange={handlePlatformChange}
                        />
                        <span style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '4px' }}>
                            Minimum hours before booking time to allow cancellation
                        </span>
                    </div>
                </div>

                {/* Notifications */}
                <div className="settings-section-card">
                    <h2 className="section-title">Notifications</h2>

                    <div className="toggle-wrapper">
                        <div className="toggle-label-group">
                            <span className="toggle-title">Email Notifications</span>
                            <span className="toggle-desc">Receive booking confirmations via email</span>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={notifications.email}
                                onChange={() => toggleNotification('email')}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>

                    <div className="toggle-wrapper">
                        <div className="toggle-label-group">
                            <span className="toggle-title">SMS Notifications</span>
                            <span className="toggle-desc">Receive SMS alerts for urgent updates</span>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={notifications.sms}
                                onChange={() => toggleNotification('sms')}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>

                    <div className="toggle-wrapper">
                        <div className="toggle-label-group">
                            <span className="toggle-title">Weekly Reports</span>
                            <span className="toggle-desc">Get weekly performance summaries</span>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={notifications.reports}
                                onChange={() => toggleNotification('reports')}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>

                    <div className="toggle-wrapper">
                        <div className="toggle-label-group">
                            <span className="toggle-title">Payment Alerts</span>
                            <span className="toggle-desc">Notifications for successful payments</span>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={notifications.alerts}
                                onChange={() => toggleNotification('alerts')}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
};

export default AdminSettings;
