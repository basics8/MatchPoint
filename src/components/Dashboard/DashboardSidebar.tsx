import { User, Calendar, CreditCard, Settings } from 'lucide-react';
import './DashboardSidebar.css';

interface DashboardSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'bookings', label: 'My Bookings', icon: Calendar },
        { id: 'payments', label: 'Payment Methods', icon: CreditCard },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <aside className="dashboard-sidebar">
            <nav className="sidebar-menu">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(item.id)}
                    >
                        <item.icon className="sidebar-icon" />
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
};
