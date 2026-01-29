import React from 'react';
import './SettingsSection.css';

interface ToggleProps {
    defaultChecked?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ defaultChecked = false }) => (
    <label className="toggle-switch">
        <input type="checkbox" defaultChecked={defaultChecked} />
        <span className="slider"></span>
    </label>
);

export const SettingsSection = () => {
    return (
        <div className="settings-section">
            <h2 className="settings-title">Settings</h2>

            {/* Notifications */}
            <div className="settings-group">
                <h3 className="settings-group-title">Notifications</h3>
                <div className="settings-item">
                    <span>Email notifications</span>
                    <Toggle defaultChecked />
                </div>
                <div className="settings-item">
                    <span>SMS notifications</span>
                    <Toggle />
                </div>
                <div className="settings-item">
                    <span>Booking reminders</span>
                    <Toggle defaultChecked />
                </div>
            </div>

            <div className="settings-divider"></div>

            {/* Privacy */}
            <div className="settings-group">
                <h3 className="settings-group-title">Privacy</h3>
                <div className="settings-item">
                    <span>Profile visibility</span>
                    <Toggle defaultChecked />
                </div>
                <div className="settings-item">
                    <span>Share activity</span>
                    <Toggle defaultChecked />
                </div>
            </div>

            <div className="settings-divider"></div>

            <button className="delete-account-btn">Delete Account</button>
        </div>
    );
};
