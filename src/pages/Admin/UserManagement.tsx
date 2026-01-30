import { useState, useRef, useEffect } from 'react';
import { Search, Plus, MoreVertical, UserX, Key } from 'lucide-react';
import AdminLayout from '../../components/Admin/AdminLayout';
import './UserManagement.css';

interface UserData {
    id: string;
    initials: string;
    name: string;
    email: string;
    phone: string;
    totalBookings: number;
    totalSpent: number;
    joinedDate: string;
}

const UserManagement = () => {
    // Mock Data based on the image
    const users: UserData[] = [
        { id: '1', initials: 'SJ', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 (555) 123-4567', totalBookings: 24, totalSpent: 1620000, joinedDate: '2025-03-15' },
        { id: '2', initials: 'MC', name: 'Mike Chen', email: 'mike.chen@email.com', phone: '+1 (555) 234-5678', totalBookings: 18, totalSpent: 1215000, joinedDate: '2025-04-22' },
        { id: '3', initials: 'EW', name: 'Emma Wilson', email: 'emma.w@email.com', phone: '+1 (555) 345-6789', totalBookings: 32, totalSpent: 2160000, joinedDate: '2025-02-10' },
        { id: '4', initials: 'DB', name: 'David Brown', email: 'david.b@email.com', phone: '+1 (555) 456-7890', totalBookings: 15, totalSpent: 1012500, joinedDate: '2025-05-18' },
        { id: '5', initials: 'LA', name: 'Lisa Anderson', email: 'lisa.a@email.com', phone: '+1 (555) 567-8901', totalBookings: 27, totalSpent: 1822500, joinedDate: '2025-03-30' },
        { id: '6', initials: 'JT', name: 'James Taylor', email: 'james.t@email.com', phone: '+1 (555) 678-9012', totalBookings: 21, totalSpent: 1417500, joinedDate: '2025-04-05' },
        { id: '7', initials: 'MG', name: 'Maria Garcia', email: 'maria.g@email.com', phone: '+1 (555) 789-0123', totalBookings: 19, totalSpent: 1282500, joinedDate: '2025-05-12' },
        { id: '8', initials: 'RK', name: 'Robert Kim', email: 'robert.k@email.com', phone: '+1 (555) 890-1234', totalBookings: 29, totalSpent: 1957500, joinedDate: '2025-02-28' },
        { id: '9', initials: 'JL', name: 'Jennifer Lee', email: 'jennifer.l@email.com', phone: '+1 (555) 901-2345', totalBookings: 16, totalSpent: 1080000, joinedDate: '2025-06-01' },
        { id: '10', initials: 'CM', name: 'Chris Martinez', email: 'chris.m@email.com', phone: '+1 (555) 012-3456', totalBookings: 22, totalSpent: 1485000, joinedDate: '2025-04-15' },
    ];

    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenuId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const actionButtons = (
        <button className="add-user-btn">
            <Plus size={18} /> Add User
        </button>
    );

    return (
        <AdminLayout
            title="User Management"
            breadcrumbs={['Dashboard', 'User Management']}
            actions={actionButtons}
        >
            <div className="search-container">
                <Search size={20} className="search-icon" />
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    className="search-input-full"
                />
            </div>

            <div className="venue-table-container">
                <table className="venue-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Contact</th>
                            <th>Total Bookings</th>
                            <th>Total Spent</th>
                            <th>Joined Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <div className="user-cell">
                                        <div className="user-avatar">{user.initials}</div>
                                        <span className="user-name-text">{user.name}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="contact-info">
                                        <div className="contact-row">
                                            <span className="contact-text">{user.email}</span>
                                        </div>
                                        <div className="contact-row">
                                            <span className="contact-text text-gray">{user.phone}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.totalBookings}</td>
                                <td>
                                    <div className="spent-info">
                                        <span className="spent-amount">Rp {user.totalSpent.toLocaleString('id-ID')}</span>
                                    </div>
                                </td>
                                <td>{user.joinedDate}</td>
                                <td style={{ position: 'relative' }}>
                                    <button
                                        className="action-menu-btn"
                                        onClick={(e) => toggleMenu(user.id, e)}
                                    >
                                        <MoreVertical size={18} />
                                    </button>

                                    {activeMenuId === user.id && (
                                        <div className="action-dropdown" ref={menuRef}>
                                            <button className="dropdown-item">
                                                <UserX size={16} />
                                                <span>Suspend</span>
                                            </button>
                                            <button className="dropdown-item">
                                                <Key size={16} />
                                                <span>Reset Password</span>
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default UserManagement;
