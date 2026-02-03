import React, { type ReactNode } from 'react';
import { LayoutDashboard, Store, Calendar, Users, DollarSign, Settings, ExternalLink } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './AdminLayout.css';

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
    breadcrumbs?: string[];
    actions?: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, breadcrumbs, actions }) => {
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
                    <NavLink to="/home" className="view-site-btn">
                        <ExternalLink size={18} />
                        <span>View User Site</span>
                    </NavLink>

                    <div className="admin-profile">
                        {(() => {
                            try {
                                const userStr = localStorage.getItem('user');
                                const user = userStr ? JSON.parse(userStr) : null;
                                const initials = user?.username ? user.username.substring(0, 2).toUpperCase() : 'AD';
                                const name = user?.username || 'Admin User';
                                const email = user?.email || 'admin@matchpoint.com'; // Admin api might return email now if we added it, but model only has username/password. AuthController returns username.

                                return (
                                    <>
                                        {user?.profileImage ? (
                                            <img
                                                src={user.profileImage}
                                                alt="Admin"
                                                className="avatar-placeholder"
                                                style={{ objectFit: 'cover', padding: 0, overflow: 'hidden' }}
                                            />
                                        ) : (
                                            <div className="avatar-placeholder">{initials}</div>
                                        )}
                                        <div className="admin-info">
                                            <span className="admin-name">{name}</span>
                                            <span className="admin-email">{email}</span>
                                        </div>
                                    </>
                                );
                            } catch (e) {
                                return (
                                    <>
                                        <div className="avatar-placeholder">AD</div>
                                        <div className="admin-info">
                                            <span className="admin-name">Admin</span>
                                        </div>
                                    </>
                                );
                            }
                        })()}
                    </div>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <div className="header-left">
                        <div className="breadcrumbs">
                            {breadcrumbs?.map((crumb, index) => (
                                <span key={index}>
                                    {crumb}
                                    {index < breadcrumbs.length - 1 && <span className="separator">/</span>}
                                </span>
                            ))}
                        </div>
                        {title && <h2 className="page-heading">{title}</h2>}
                    </div>
                    {actions && <div className="header-actions">{actions}</div>}
                </header>
                <div className="admin-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
