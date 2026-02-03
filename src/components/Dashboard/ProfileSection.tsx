import { useEffect, useState, useRef } from 'react';
import './ProfileSection.css';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export const ProfileSection = () => {
    const [user, setUser] = useState<{ username: string; email: string; profileImage?: string } | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                if (parsedUser.profileImage) {
                    setPreviewImage(parsedUser.profileImage);
                }
            } catch (e) {
                console.error("Failed to parse user data", e);
            }
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPreviewImage(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = async () => {
        if (!user || !previewImage) return;

        setLoading(true);
        try {
            const response = await fetch('/api/user/update-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.username, // Identifying user by username for now
                    profileImage: previewImage
                }),
            });

            if (response.ok) {
                await response.json();

                // Update local storage
                const updatedUser = { ...user, profileImage: previewImage };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                alert("Profile picture updated successfully!");
                window.location.reload(); // Refresh to ensure changes propagate if used elsewhere
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile.");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <div className="profile-section">Please log in to view profile.</div>;
    }

    return (
        <div className="profile-section">
            <h2 className="section-title">Profile Information</h2>

            <div className="profile-content">
                <div className="profile-avatar-wrapper">
                    {previewImage ? (
                        <ImageWithFallback
                            src={previewImage}
                            alt="Profile"
                            className="profile-avatar"
                            onClick={() => fileInputRef.current?.click()}
                            style={{ cursor: 'pointer' }}
                        />
                    ) : (
                        <div
                            className="profile-avatar-placeholder"
                            onClick={() => fileInputRef.current?.click()}
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                backgroundColor: '#e5e7eb',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2.5rem',
                                fontWeight: '600',
                                color: '#374151',
                                cursor: 'pointer',
                                border: '4px solid white',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            {user.username ? user.username.substring(0, 2).toUpperCase() : 'US'}
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept="image/*"
                    />
                    <div className="profile-upload-hint" onClick={() => fileInputRef.current?.click()}>
                        Click image to change
                    </div>
                </div>

                <div className="profile-form">
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            value={user.username || ''}
                            readOnly
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            value={user.email || ''}
                            readOnly
                            className="form-input"
                        />
                    </div>

                    {previewImage && previewImage !== user.profileImage && (
                        <button
                            className="edit-profile-btn"
                            onClick={handleSaveProfile}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save New Picture"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
