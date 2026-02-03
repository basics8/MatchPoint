import { useState, useEffect } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import { DollarSign, Users, Calendar, TrendingUp } from 'lucide-react';
import './AdminOverview.css';

const AdminOverview = () => {
    // Stats State
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalUsers: 0,
        totalBookings: 0,
        activeVenues: 0 // We might need to add this to backend response or calculate
    });

    // Chart Data State
    const [chartData, setChartData] = useState<number[]>(new Array(12).fill(0));
    const [maxChartVal, setMaxChartVal] = useState(100);

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('/api/admin/stats', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setStats({
                        totalRevenue: data.totalRevenue || 0,
                        totalUsers: data.totalUsers || 0,
                        totalBookings: data.totalBookings || 0,
                        activeVenues: data.totalVenues || 0
                    });

                    // Process Revenue Chart Data
                    if (data.revenueOverTime) {
                        const newChartData = new Array(12).fill(0);
                        let maxRevenue = 0;

                        data.revenueOverTime.forEach((item: any) => {
                            // item.month is 1-12. Array index 0-11.
                            // item.totalAmount is in Rupiah (e.g. 150000)
                            const monthIndex = item.month - 1;
                            if (monthIndex >= 0 && monthIndex < 12) {
                                // Scale down for chart (e.g., / 1000 for display consistency with prior mockup logic)
                                // Prior logic: val 45 -> Display 45.000.
                                // So val = realAmount / 1000.
                                const val = parseInt(item.totalAmount) / 1000;
                                newChartData[monthIndex] = val;
                                if (val > maxRevenue) maxRevenue = val;
                            }
                        });
                        setChartData(newChartData);
                        // Update max scale to fit data, with some buffer. Min 100.
                        setMaxChartVal(Math.max(100, Math.ceil(maxRevenue / 10) * 10 + 20));
                    }

                    if (data.recentActivity) {
                        const activity = data.recentActivity.map((item: any) => ({
                            id: item.id,
                            user: item.user?.username || 'Unknown User',
                            action: `Booked ${item.venue?.name || 'Venue'}`,
                            time: timeAgo(item.created_at || item.createdAt), // Handle both cases just in case
                            amount: `+Rp ${parseInt(item.totalPrice).toLocaleString('id-ID')}`,
                            initials: (item.user?.username || 'U').substring(0, 2).toUpperCase(),
                            profileImage: item.user?.profileImage
                        }));
                        setRecentActivity(activity);
                    }
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    const dataPoints = chartData;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // State for tooltip
    const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; value: number; month: string } | null>(null);

    // Generate SVG path for the line chart
    const maxVal = maxChartVal;
    const width = 1000;
    const height = 300;
    const padding = 40;

    const points = dataPoints.map((val, i) => {
        const x = (i / (dataPoints.length - 1)) * (width - padding * 2) + padding;
        const y = height - (val / maxVal) * (height - padding * 2) - padding;
        return `${x},${y}`;
    }).join(' ');

    const [recentActivity, setRecentActivity] = useState<any[]>([]);

    // Helper to format time relative (e.g., "5 min ago")
    const timeAgo = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " min ago";
        return Math.floor(seconds) + " sec ago";
    };

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
                        <h3 className="stats-value">Rp {stats.totalRevenue.toLocaleString('id-ID')}</h3>
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
                        <h3 className="stats-value">{stats.totalUsers.toLocaleString('id-ID')}</h3>
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
                        <h3 className="stats-value">{stats.totalBookings.toLocaleString('id-ID')}</h3>
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
                        <h3 className="stats-value">{stats.activeVenues}</h3>
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
                                {item.profileImage ? (
                                    <img src={item.profileImage} alt={item.user} className="activity-avatar" style={{ objectFit: 'cover' }} />
                                ) : (
                                    <div className="activity-avatar">{item.initials}</div>
                                )}
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
