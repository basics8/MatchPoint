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
    // Mock Data
    const payouts: PayoutData[] = [
        { id: 'PAY-1024', venue: 'Elite Padel Club', amount: 12450000, bookings: 156, date: '2026-01-08', status: 'Completed' },
        { id: 'PAY-1023', venue: 'Urban Badminton Arena', amount: 8920000, bookings: 134, date: '2026-01-08', status: 'Completed' },
        { id: 'PAY-1022', venue: 'Premier Tennis Academy', amount: 15680000, bookings: 98, date: '2026-01-08', status: 'Pending' },
        { id: 'PAY-1021', venue: 'Metropolitan Tennis Center', amount: 10230000, bookings: 142, date: '2026-01-07', status: 'Completed' },
        { id: 'PAY-1020', venue: 'CityCenter Badminton Club', amount: 7540000, bookings: 113, date: '2026-01-07', status: 'Completed' },
        { id: 'PAY-1019', venue: 'Riverside Padel Courts', amount: 9870000, bookings: 128, date: '2026-01-07', status: 'Completed' },
        { id: 'PAY-1018', venue: 'Grand Slam Tennis Club', amount: 11340000, bookings: 87, date: '2026-01-06', status: 'Completed' },
    ];

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
                        <h3 className="stat-value">{formatCurrency(847392000)}</h3>
                        <span className="stat-subtext">This month</span>
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
                        <h3 className="stat-value">{formatCurrency(42370000)}</h3>
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
                        <h3 className="stat-value">{formatCurrency(805022000)}</h3>
                        <span className="stat-subtext">After fees & taxes</span>
                    </div>
                </div>

                <div className="charts-section">
                    {/* Recent Payouts Table */}
                    <div className="payouts-container">
                        <div className="section-header">
                            <h2 className="section-title">Recent Payouts</h2>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table className="payouts-table">
                                <thead>
                                    <tr>
                                        <th>Payout ID</th>
                                        <th>Venue</th>
                                        <th>Amount</th>
                                        <th>Bookings</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payouts.map((payout) => (
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
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Revenue by Sport Pie Chart */}
                    <div className="chart-card">
                        <h2 className="section-title" style={{ alignSelf: 'flex-start', marginBottom: '16px' }}>Revenue by Sport</h2>

                        <div className="pie-chart-container"></div>

                        <div className="chart-legend">
                            <div className="legend-item">
                                <div className="legend-color" style={{ backgroundColor: '#000000' }}></div>
                                <span>Padel (40%)</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color" style={{ backgroundColor: '#4b5563' }}></div>
                                <span>Tennis (35%)</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color" style={{ backgroundColor: '#9ca3af' }}></div>
                                <span>Badminton (25%)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default FinancialReports;
