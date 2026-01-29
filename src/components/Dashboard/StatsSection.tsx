import { Trophy, Target, Calendar } from 'lucide-react';
import './StatsSection.css';

export const StatsSection = () => {
    return (
        <div className="stats-section">
            <h2 className="stats-title">Your Stats</h2>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon-wrapper">
                        <Trophy className="stat-icon" />
                    </div>
                    <div className="stat-value">47</div>
                    <div className="stat-label">Total Matches Played</div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon-wrapper">
                        <Target className="stat-icon" />
                    </div>
                    <div className="stat-value">Padel</div>
                    <div className="stat-label">Favorite Sport</div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon-wrapper">
                        <Calendar className="stat-icon" />
                    </div>
                    <div className="stat-value">2024</div>
                    <div className="stat-label">Member Since</div>
                </div>
            </div>
        </div>
    );
};
