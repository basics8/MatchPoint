import { useState } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import { DollarSign, Users, Calendar, TrendingUp } from 'lucide-react';
import './AdminOverview.css';

const AdminOverview = () => {
    // Mock Data for the chart
    const dataPoints = [45, 52, 48, 61, 55, 67, 73, 69, 78, 82, 89, 96];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // State for tooltip
    const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; value: number; month: string } | null>(null);

    // Generate SVG path for the line chart
    const maxVal = 100;
    const width = 1000;
    const height = 300;
    const padding = 40;

    const points = dataPoints.map((val, i) => {
        const x = (i / (dataPoints.length - 1)) * (width - padding * 2) + padding;
        const y = height - (val / maxVal) * (height - padding * 2) - padding;
        return `${x},${y}`;
    }).join(' ');

    const recentActivity = [
        { id: 1, user: 'Sarah Johnson', action: 'Booked Tennis Court #3', time: '5 min ago', amount: '+Rp 65.000', initials: 'SJ' },
        { id: 2, user: 'Mike Chen', action: 'Cancelled Badminton Court #1', time: '12 min ago', amount: '-Rp 45.000', initials: 'MC' },
        { id: 3, user: 'Emma Wilson', action: 'Booked Padel Court #2', time: '23 min ago', amount: '+Rp 85.000', initials: 'EW' },
        { id: 4, user: 'David Brown', action: 'Booked Tennis Court #1', time: '34 min ago', amount: '+Rp 65.000', initials: 'DB' },
        { id: 5, user: 'Lisa Anderson', action: 'Booked Badminton Court #4', time: '1 hour ago', amount: '+Rp 45.000', initials: 'LA' },
        { id: 6, user: 'James Taylor', action: 'Booked Tennis Court #5', time: '2 hours ago', amount: '+Rp 65.000', initials: 'JT' },
    ];

    return (
        <AdminLayout title="Admin Overview" breadcrumbs={['Dashboard', 'Overview']}>
            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stats-card">
                    <div className="stats-header">
                        <div className="stats-icon black">
                            <DollarSign size={20} color="white" />
                        </div>
                        <span className="stats-trend positive">
                            <TrendingUp size={14} /> +12%
                        </span>
                    </div>
                    <div className="stats-info">
                        <span className="stats-label">Total Revenue</span>
                        <h3 className="stats-value">Rp 847.392.000</h3>
                    </div>
                </div>

                <div className="stats-card">
                    <div className="stats-header">
                        <div className="stats-icon black">
                            <Users size={20} color="white" />
                        </div>
                        <span className="stats-trend positive">
                            <TrendingUp size={14} /> +8%
                        </span>
                    </div>
                    <div className="stats-info">
                        <span className="stats-label">Active Users</span>
                        <h3 className="stats-value">12,458</h3>
                    </div>
                </div>

                <div className="stats-card">
                    <div className="stats-header">
                        <div className="stats-icon black">
                            <Calendar size={20} color="white" />
                        </div>
                        <span className="stats-trend positive">
                            <TrendingUp size={14} /> +23%
                        </span>
                    </div>
                    <div className="stats-info">
                        <span className="stats-label">Total Bookings</span>
                        <h3 className="stats-value">3,842</h3>
                    </div>
                </div>

                <div className="stats-card">
                    <div className="stats-header">
                        <div className="stats-icon black">
                            <TrendingUp size={20} color="white" />
                        </div>
                        <span className="stats-trend positive">
                            <TrendingUp size={14} /> +5%
                        </span>
                    </div>
                    <div className="stats-info">
                        <span className="stats-label">Active Venues</span>
                        <h3 className="stats-value">124</h3>
                    </div>
                </div>
            </div>

            {/* Revenue Chart */}
            <div className="dashboard-section">
                <h3 className="section-title">Revenue Overview</h3>
                <div className="chart-container" style={{ position: 'relative' }}>
                    {hoveredPoint && (
                        <div
                            className="chart-tooltip"
                            style={{
                                left: `${hoveredPoint.x}px`,
                                top: `${hoveredPoint.y - 45}px` // Position above the point
                            }}
                        >
                            <div className="tooltip-month">{hoveredPoint.month}</div>
                            <div className="tooltip-value">Rp {(hoveredPoint.value * 1000).toLocaleString('id-ID')}</div>
                        </div>
                    )}
                    <svg viewBox={`0 0 ${width} ${height}`} className="line-chart">
                        {/* Grid lines */}
                        {[0, 25, 50, 75, 100].map(val => (
                            <line
                                key={val}
                                x1={padding}
                                y1={height - (val / maxVal) * (height - padding * 2) - padding}
                                x2={width - padding}
                                y2={height - (val / maxVal) * (height - padding * 2) - padding}
                                stroke="#f3f4f6"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                            />
                        ))}
                        {/* Y Axis Labels */}
                        {[0, 25, 50, 75, 100].map(val => (
                            <text
                                key={val}
                                x={padding - 10}
                                y={height - (val / maxVal) * (height - padding * 2) - padding + 4}
                                textAnchor="end"
                                className="chart-label"
                            >
                                {val === 0 ? '0' : (val * 1000).toLocaleString('id-ID')}
                            </text>
                        ))}

                        {/* Line */}
                        <polyline
                            fill="none"
                            stroke="#111827"
                            strokeWidth="2"
                            points={points}
                        />

                        {/* Points */}
                        {dataPoints.map((val, i) => {
                            const x = (i / (dataPoints.length - 1)) * (width - padding * 2) + padding;
                            const y = height - (val / maxVal) * (height - padding * 2) - padding;
                            return (
                                <circle
                                    key={i}
                                    cx={x}
                                    cy={y}
                                    r={hoveredPoint?.month === months[i] ? 6 : 4}
                                    fill="#111827"
                                    stroke="white"
                                    strokeWidth="2"
                                    style={{ cursor: 'pointer', transition: 'r 0.2s' }}
                                    onMouseEnter={() => setHoveredPoint({ x, y, value: val, month: months[i] })}
                                    onMouseLeave={() => setHoveredPoint(null)}
                                />
                            );
                        })}

                        {/* X Axis Labels */}
                        {months.map((month, i) => {
                            const x = (i / (dataPoints.length - 1)) * (width - padding * 2) + padding;
                            return (
                                <text key={month} x={x} y={height - 10} textAnchor="middle" className="chart-label">{month}</text>
                            );
                        })}
                    </svg>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="dashboard-section">
                <h3 className="section-title">Recent Activity</h3>
                <div className="activity-list">
                    {recentActivity.map(item => (
                        <div key={item.id} className="activity-item">
                            <div className="activity-left">
                                <div className="activity-avatar">{item.initials}</div>
                                <div className="activity-details">
                                    <span className="activity-user">{item.user}</span>
                                    <span className="activity-action">{item.action}</span>
                                </div>
                            </div>
                            <div className="activity-right">
                                <span className="activity-amount">{item.amount}</span>
                                <span className="activity-time">{item.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminOverview;
