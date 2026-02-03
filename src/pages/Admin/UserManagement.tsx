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
    const [users, setUsers] = useState<UserData[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('/api/admin/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                const mappedUsers: UserData[] = data.map((u: any) => ({
                    id: u.id,
                    initials: u.username.substring(0, 2).toUpperCase(),
                    name: u.username, // Using username as name
                    email: u.email,
                    phone: '-', // Placeholder as not in DB
                    totalBookings: 0, // Placeholder
                    totalSpent: 0, // Placeholder
                    joinedDate: u.createdAt ? new Date(u.createdAt).toISOString().split('T')[0] : '-'
                }));
                setUsers(mappedUsers);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

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
