import React, { type ReactNode } from 'react';
import { LayoutDashboard, Store, Calendar, Users, DollarSign, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './AdminLayout.css';

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
    breadcrumbs?: string[];
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, breadcrumbs }) => {
    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h1>MatchPoint</h1>
                    <span className="subtitle">Admin Dashboard</span>
                </div>

                <nav className="sidebar-nav">
                    <NavLink to="/admin" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
                        <LayoutDashboard size={20} />
                        <span>Overview</span>
                    </NavLink>
                    <NavLink to="/admin/venues" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Store size={20} />
                        <span>Venues</span>
                    </NavLink>
                    <NavLink to="/admin/bookings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Calendar size={20} />
                        <span>Bookings</span>
                    </NavLink>
                    <NavLink to="/admin/users" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Users size={20} />
                        <span>Users</span>
                    </NavLink>
                    <NavLink to="/admin/financial" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <DollarSign size={20} />
                        <span>Financial</span>
                    </NavLink>
                    <NavLink to="/admin/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Settings size={20} />
                        <span>Settings</span>
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <div className="admin-profile">
                        <div className="avatar-placeholder">AD</div>
                        <div className="admin-info">
                            <span className="admin-name">Admin User</span>
                            <span className="admin-email">admin@matchpoint.com</span>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <div className="breadcrumbs">
                        {breadcrumbs?.map((crumb, index) => (
                            <span key={index}>
                                {crumb}
                                {index < breadcrumbs.length - 1 && <span className="separator">/</span>}
                            </span>
                        ))}
                    </div>
                    {title && <h2 className="page-heading">{title}</h2>}
                </header>
                <div className="admin-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
