import React from 'react';
import './FilterSidebar.css';

interface FilterState {
    sport: string;
    minPrice: number;
    maxPrice: number;
    locationType: string;
    facilities: string[];
}

interface FilterSidebarProps {
    className?: string;
    filters: FilterState;
    onFilterChange: (newFilters: FilterState) => void;
    onReset: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
    className = '',
    filters,
    onFilterChange,
    onReset
}) => {

    const handleChange = (key: keyof FilterState, value: any) => {
        onFilterChange({
            ...filters,
            [key]: value
        });
    };

    return (
        <div className={`filter-sidebar ${className}`}>
            <h2 className="filter-title">Filters</h2>

            {/* Sport Type */}
            <div className="filter-group">
                <label className="filter-label">Sport Type</label>
                <select
                    className="filter-select"
                    value={filters.sport}
                    onChange={(e) => handleChange('sport', e.target.value)}
                >
                    <option value="">All Sports</option>
                    <option value="Padel">Padel</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Badminton">Badminton</option>
                </select>
            </div>

            {/* Price per Hour */}
            <div className="filter-group">
                <label className="filter-label">Price per Hour: Up to {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(filters.maxPrice)}</label>

                {/* Slider */}
                <div className="range-slider-container">
                    <input
                        type="range"
                        min="0"
                        max="500000"
                        step="10000"
                        value={filters.maxPrice}
                        onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
                        className="range-input"
                    />
                </div>

                <div className="price-inputs">
                    <div className="price-input-wrapper">
                        <input
                            type="number"
                            placeholder="Min"
                            className="price-input"
                            value={filters.minPrice || ''}
                            onChange={(e) => handleChange('minPrice', Number(e.target.value))}
                        />
                    </div>
                    <span className="price-separator">-</span>
                    <div className="price-input-wrapper">
                        <input
                            type="number"
                            placeholder="Max"
                            className="price-input"
                            value={filters.maxPrice || ''}
                            onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
                        />
                    </div>
                </div>
            </div>

            {/* Location Type */}
            <div className="filter-group">
                <label className="filter-label">Location Type</label>
                <input
                    type="text"
                    className="filter-select"
                    placeholder="e.g. Indoor, Outdoor"
                    value={filters.locationType}
                    onChange={(e) => handleChange('locationType', e.target.value)}
                />
            </div>

            {/* Facilities */}
            <div className="filter-group">
                <label className="filter-label">Facilities</label>
                <div className="checkbox-group">
                    {['WiFi', 'Parking', 'Showers', 'Lockers', 'Café'].map(facility => (
                        <label key={facility} className="checkbox-label">
                            <input
                                type="checkbox"
                                className="checkbox-input"
                                checked={filters.facilities.includes(facility)}
                                onChange={(e) => {
                                    const newFacilities = e.target.checked
                                        ? [...filters.facilities, facility]
                                        : filters.facilities.filter(f => f !== facility);
                                    handleChange('facilities', newFacilities);
                                }}
                            />
                            {facility}
                        </label>
                    ))}
                </div>
            </div>

            <button className="reset-btn" onClick={onReset}>Reset Filters</button>
        </div>
    );
};
