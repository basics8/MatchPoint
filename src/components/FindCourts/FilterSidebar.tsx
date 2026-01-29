import React from 'react';
import './FilterSidebar.css';

interface FilterSidebarProps {
    className?: string;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ className = '' }) => {
    return (
        <div className={`filter-sidebar ${className}`}>
            <h2 className="filter-title">Filters</h2>

            {/* Sport Type */}
            <div className="filter-group">
                <label className="filter-label">Sport Type</label>
                <select className="filter-select" defaultValue="">
                    <option value="" disabled hidden></option>
                    <option value="padel">Padel</option>
                    <option value="tennis">Tennis</option>
                    <option value="badminton">Badminton</option>
                </select>
            </div>

            {/* Price per Hour */}
            <div className="filter-group">
                <label className="filter-label">Price per Hour</label>
                <div className="price-inputs">
                    <div className="price-input-wrapper">
                        <input type="number" placeholder="50000" className="price-input" />
                    </div>
                    <span className="price-separator">-</span>
                    <div className="price-input-wrapper">
                        <input type="number" placeholder="250000" className="price-input" />
                    </div>
                </div>
                <div className="price-range-labels">
                    <span>Rp 0</span>
                    <span>Rp 250k+</span>
                </div>
            </div>

            {/* Location Type */}
            <div className="filter-group">
                <label className="filter-label">Location Type</label>
                <input type="text" className="filter-select" />
            </div>

            {/* Facilities */}
            <div className="filter-group">
                <label className="filter-label">Facilities</label>
                <div className="checkbox-group">
                    <label className="checkbox-label">
                        <input type="checkbox" className="checkbox-input" defaultChecked />
                        WiFi
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" className="checkbox-input" defaultChecked />
                        Parking
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" className="checkbox-input" defaultChecked />
                        Showers
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" className="checkbox-input" defaultChecked />
                        Lockers
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" className="checkbox-input" defaultChecked />
                        Café
                    </label>
                </div>
            </div>

            <button className="reset-btn">Reset Filters</button>
        </div>
    );
};
