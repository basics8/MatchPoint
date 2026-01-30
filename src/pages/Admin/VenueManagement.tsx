import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/Admin/AdminLayout';
import './VenueManagement.css';

interface CourtData {
    id: number;
    name: string;
    sport: 'Tennis' | 'Badminton' | 'Padel';
    location: string;
    status: 'Active' | 'Maintenance';
    hourlyRate: number;
    isAvailable: boolean;
}

const VenueManagement = () => {
    // Mock Data based on the new image provided
    const [courts, setCourts] = useState<CourtData[]>([
        { id: 1, name: 'Elite Padel Club - Court A', sport: 'Padel', location: 'Downtown', status: 'Active', hourlyRate: 150000, isAvailable: true },
        { id: 2, name: 'Elite Padel Club - Court B', sport: 'Padel', location: 'Downtown', status: 'Maintenance', hourlyRate: 150000, isAvailable: true },
        { id: 3, name: 'Metropolitan Tennis Center - Court 1', sport: 'Tennis', location: 'Midtown', status: 'Active', hourlyRate: 180000, isAvailable: true },
        { id: 4, name: 'Metropolitan Tennis Center - Court 2', sport: 'Tennis', location: 'Midtown', status: 'Active', hourlyRate: 180000, isAvailable: false },
        { id: 5, name: 'Urban Badminton Arena - Court 1', sport: 'Badminton', location: 'Sports District', status: 'Active', hourlyRate: 80000, isAvailable: true },
        { id: 6, name: 'Urban Badminton Arena - Court 2', sport: 'Badminton', location: 'Sports District', status: 'Active', hourlyRate: 80000, isAvailable: true },
        { id: 7, name: 'Riverside Padel Courts - Court A', sport: 'Padel', location: 'East Side', status: 'Active', hourlyRate: 135000, isAvailable: true },
        { id: 8, name: 'Premier Tennis Academy - Court 1', sport: 'Tennis', location: 'North Quarter', status: 'Active', hourlyRate: 200000, isAvailable: true },
        { id: 9, name: 'Premier Tennis Academy - Court 2', sport: 'Tennis', location: 'North Quarter', status: 'Active', hourlyRate: 200000, isAvailable: true },
        { id: 10, name: 'CityCenter Badminton Club - Court 1', sport: 'Badminton', location: 'Central', status: 'Active', hourlyRate: 75000, isAvailable: true },
    ]);

    const toggleAvailability = (id: number) => {
        setCourts(courts.map(court => {
            if (court.id === id) {
                const newAvailability = !court.isAvailable;
                return {
                    ...court,
                    isAvailable: newAvailability,
                    status: newAvailability ? 'Active' : 'Maintenance'
                };
            }
            return court;
        }));
    };

    // Calculate dynamic stats
    const totalCourts = courts.length;
    const activeCourts = courts.filter(c => c.status === 'Active').length;
    const maintenanceCourts = courts.filter(c => c.status === 'Maintenance').length;
    const avgHourlyRate = totalCourts > 0
        ? Math.round(courts.reduce((acc, curr) => acc + curr.hourlyRate, 0) / totalCourts)
        : 0;

    const actionButtons = (
        <button className="add-btn">
            <Plus size={18} /> Add Court
        </button>
    );

    return (
        <AdminLayout
            title="Venue Management"
            breadcrumbs={['Dashboard', 'Venue Management']}
            actions={actionButtons}
        >
            <div className="summary-cards">
                <div className="summary-card">
                    <span className="summary-label">Total Courts</span>
                    <span className="summary-value">{totalCourts}</span>
                </div>
                <div className="summary-card">
                    <span className="summary-label">Active Courts</span>
                    <span className="summary-value">{activeCourts}</span>
                </div>
                <div className="summary-card">
                    <span className="summary-label">Under Maintenance</span>
                    <span className="summary-value">{maintenanceCourts}</span>
                </div>
                <div className="summary-card">
                    <span className="summary-label">Avg. Hourly Rate</span>
                    <span className="summary-value">Rp {avgHourlyRate.toLocaleString('id-ID')}</span>
                </div>
            </div>

            <div className="venue-table-container">
                <table className="venue-table">
                    <thead>
                        <tr>
                            <th>Venue Name</th>
                            <th>Sport Type</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Hourly Rate</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courts.map((court) => (
                            <tr key={court.id}>
                                <td><span className="venue-name-text">{court.name}</span></td>
                                <td>
                                    <span className={`sport-tag`}>
                                        {court.sport}
                                    </span>
                                </td>
                                <td className="location-text">{court.location}</td>
                                <td>
                                    <span className={`status-badge-text ${court.status.toLowerCase()}`}>
                                        {court.status}
                                    </span>
                                </td>
                                <td>Rp {court.hourlyRate.toLocaleString('id-ID')}</td>
                                <td>
                                    <button
                                        className={`status-toggle ${court.isAvailable ? 'active' : ''}`}
                                        onClick={() => toggleAvailability(court.id)}
                                    >
                                        <div className="toggle-thumb"></div>
                                    </button>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="icon-btn edit">
                                            <Pencil size={16} />
                                        </button>
                                        <button className="icon-btn delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default VenueManagement;
