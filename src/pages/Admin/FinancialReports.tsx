import { useState, useEffect } from 'react';
import { DollarSign, CreditCard, TrendingUp, TrendingDown, Download } from 'lucide-react';
import AdminLayout from '../../components/Admin/AdminLayout';
import './FinancialReports.css';

interface PayoutData {
    id: string;
    venue: string;
    amount: number;
    bookings: number;
    date: string;
    status: 'Completed' | 'Pending';
}

const FinancialReports = () => {
    const [financialData, setFinancialData] = useState({
        totalRevenue: 0,
        platformFees: 0,
        netIncome: 0,
        payouts: [] as PayoutData[],
        sportDistribution: {
            padel: 0,
            tennis: 0,
            badminton: 0
        }
    });

    useEffect(() => {
        const fetchFinancials = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('/api/admin/financial', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();

                    const totalRevenue = parseInt(data.totalRevenue) || 0;
                    const platformFees = totalRevenue * 0.05; // 5% commission
                    const netIncome = totalRevenue - platformFees;

                    // Process Payouts (Venues)
                    const payoutsData = data.revenueByVenue.map((item: any, index: number) => ({
                        id: `VE-${1000 + index}`,
                        venue: item.venue.name,
                        amount: parseInt(item.totalAmount),
                        bookings: item.totalBookings,
                        date: new Date().toISOString().split('T')[0], // Today's date as "snapshot"
                        status: 'Completed'
                    }));

                    // Process Sport Distribution
                    const sportDist = { padel: 0, tennis: 0, badminton: 0 };
                    let totalSportRev = 0;

                    data.revenueBySport.forEach((item: any) => {
                        const amount = parseInt(item.totalAmount);
                        const sport = item.sport.toLowerCase();
                        if (sport === 'padel') sportDist.padel = amount;
                        else if (sport === 'tennis') sportDist.tennis = amount;
                        else if (sport === 'badminton') sportDist.badminton = amount;
                        totalSportRev += amount;
                    });

                    // Convert to percentages
                    if (totalSportRev > 0) {
                        sportDist.padel = Math.round((sportDist.padel / totalSportRev) * 100);
                        sportDist.tennis = Math.round((sportDist.tennis / totalSportRev) * 100);
                        sportDist.badminton = Math.round((sportDist.badminton / totalSportRev) * 100);
                    }

                    setFinancialData({
                        totalRevenue,
                        platformFees,
                        netIncome,
                        payouts: payoutsData,
                        sportDistribution: sportDist
                    });
                }
            } catch (error) {
                console.error("Error fetching financials:", error);
            }
        };


        fetchFinancials();
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const actionButton = (
        <button className="add-user-btn" style={{ backgroundColor: '#000' }}>
            <Download size={18} /> Export Report
        </button>
    );

    // Dynamic Pie Chart Gradient
    const { padel, tennis, badminton } = financialData.sportDistribution;
    // Padel: 0 to Padel%
    // Tennis: Padel% to (Padel+Tennis)%
    // Badminton: Rest
    const p1 = padel;
    const p2 = padel + tennis;

    // If no data, use default gray
    const pieStyle = (financialData.totalRevenue > 0) ? {
        background: `conic-gradient(
            #000000 0% ${p1}%, 
            #4b5563 ${p1}% ${p2}%, 
            #9ca3af ${p2}% 100%
        )`
    } : {};

    return (
        <AdminLayout
            title="Financial Reports"
            breadcrumbs={['Dashboard', 'Financial']}
            actions={actionButton}
        >
            <div className="financial-grid">
                {/* Stats Cards */}
                <div className="financial-stats-grid">
                    <div className="financial-stat-card">
                        <div className="stat-header">
                            <div className="stat-icon-wrapper">
                                <DollarSign size={24} />
                            </div>
                            <span className="stat-trend positive">
                                <TrendingUp size={16} /> +18%
                            </span>
                        </div>
                        <span className="stat-label">Total Revenue</span>
                        <h3 className="stat-value">{formatCurrency(financialData.totalRevenue)}</h3>
                        <span className="stat-subtext">All time</span>
                    </div>

                    <div className="financial-stat-card">
                        <div className="stat-header">
                            <div className="stat-icon-wrapper">
                                <CreditCard size={24} />
                            </div>
                            <span className="stat-trend positive">
                                <TrendingUp size={16} /> +12%
                            </span>
                        </div>
                        <span className="stat-label">Platform Fees</span>
                        <h3 className="stat-value">{formatCurrency(financialData.platformFees)}</h3>
                        <span className="stat-subtext">5% commission</span>
                    </div>

                    <div className="financial-stat-card">
                        <div className="stat-header">
                            <div className="stat-icon-wrapper">
                                <TrendingUp size={24} />
                            </div>
                            <span className="stat-trend negative">
                                <TrendingDown size={16} /> -3%
                            </span>
                        </div>
                        <span className="stat-label">Net Income</span>
                        <h3 className="stat-value">{formatCurrency(financialData.netIncome)}</h3>
                        <span className="stat-subtext">After fees & taxes</span>
                    </div>
                </div>

                <div className="charts-section">
                    {/* Recent Payouts Table - REPURPOSED AS VENUE PERFORMANCE */}
                    <div className="payouts-container">
                        <div className="section-header">
                            <h2 className="section-title">Venue Performance (Payouts)</h2>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table className="payouts-table">
                                <thead>
                                    <tr>
                                        <th>Venue ID</th>
                                        <th>Venue</th>
                                        <th>Amount</th>
                                        <th>Bookings</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {financialData.payouts.length > 0 ? (
                                        financialData.payouts.map((payout) => (
                                            <tr key={payout.id}>
                                                <td style={{ fontWeight: 500 }}>{payout.id}</td>
                                                <td>{payout.venue}</td>
                                                <td style={{ fontWeight: 600 }}>{formatCurrency(payout.amount)}</td>
                                                <td style={{ color: '#6b7280' }}>{payout.bookings} bookings</td>
                                                <td style={{ color: '#6b7280' }}>{payout.date}</td>
                                                <td>
                                                    <span className={`status-badge ${payout.status.toLowerCase()}`}>
                                                        {payout.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>No transaction data yet.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Revenue by Sport Pie Chart */}
                    <div className="chart-card">
                        <h2 className="section-title" style={{ alignSelf: 'flex-start', marginBottom: '16px' }}>Revenue by Sport</h2>

                        <div className="pie-chart-container" style={pieStyle}></div>

                        <div className="chart-legend">
                            <div className="legend-item">
                                <div className="legend-color" style={{ backgroundColor: '#000000' }}></div>
                                <span>Padel ({padel}%)</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color" style={{ backgroundColor: '#4b5563' }}></div>
                                <span>Tennis ({tennis}%)</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color" style={{ backgroundColor: '#9ca3af' }}></div>
                                <span>Badminton ({badminton}%)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default FinancialReports;
