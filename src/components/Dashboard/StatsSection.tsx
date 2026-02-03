import { useEffect, useState } from 'react';
import './StatsSection.css';
import { Trophy, Target, Calendar } from 'lucide-react';

export const StatsSection = () => {
    const [stats, setStats] = useState({
        memberSince: '2024',
        totalMatches: 0,
        favoriteSport: '-'
    });

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('token');
            try {
                // Fetch dynamic stats from backend
                const response = await fetch('/api/user/stats', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    let year = '2024';
                    if (data.memberSince) {
                        const date = new Date(data.memberSince);
                        year = date.getFullYear().toString();
                    }

                    setStats({
                        memberSince: year,
                        totalMatches: data.totalMatches,
                        favoriteSport: data.favoriteSport
                    });
                }
            } catch (error) {
                console.error("Error fetching user stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="stats-section">
            <h2 className="section-title">Your Stats</h2>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon-wrapper">
                        <Trophy className="stat-icon" />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.totalMatches}</span>
                        <span className="stat-label">Total Matches Played</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon-wrapper">
                        <Target className="stat-icon" />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.favoriteSport}</span>
                        <span className="stat-label">Favorite Sport</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon-wrapper">
                        <Calendar className="stat-icon" />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.memberSince}</span>
                        <span className="stat-label">Member Since</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
