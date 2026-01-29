import { useState } from 'react';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import { DashboardSidebar } from '../../components/Dashboard/DashboardSidebar';
import { ProfileSection } from '../../components/Dashboard/ProfileSection';
import { StatsSection } from '../../components/Dashboard/StatsSection';
import { BookingsSection } from '../../components/Dashboard/BookingsSection';
import { PaymentMethodsSection } from '../../components/Dashboard/PaymentMethodsSection';
import { SettingsSection } from '../../components/Dashboard/SettingsSection';
import './Dashboard.css';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="dashboard-container">
            <Navbar />

            <main className="dashboard-main">
                <h1 className="page-title">Dashboard</h1>

                <div className="dashboard-content-grid">
                    <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                    <div className="dashboard-content-area">
                        {activeTab === 'profile' && (
                            <>
                                <ProfileSection />
                                <StatsSection />
                            </>
                        )}
                        {activeTab === 'bookings' && <BookingsSection />}
                        {activeTab === 'payments' && <PaymentMethodsSection />}
                        {activeTab === 'settings' && <SettingsSection />}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;
