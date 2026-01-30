import React, { useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import './RescheduleModal.css';

interface RescheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (date: string, time: string) => void;
    currentDate: string;
    currentTime: string;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({ isOpen, onClose, onConfirm, currentDate, currentTime }) => {
    const [date, setDate] = useState(currentDate);
    const [time, setTime] = useState(currentTime);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Reschedule Booking</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="input-group">
                        <label className="input-label">Select New Date</label>
                        <div className="input-wrapper">
                            <Calendar className="input-icon" size={18} />
                            <input
                                type="date"
                                className="modal-input"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Select New Time</label>
                        <div className="input-wrapper">
                            <Clock className="input-icon" size={18} />
                            <select
                                className="modal-input"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            >
                                <option value="08:00">08:00</option>
                                <option value="10:00">10:00</option>
                                <option value="12:00">12:00</option>
                                <option value="14:00">14:00</option>
                                <option value="16:00">16:00</option>
                                <option value="18:00">18:00</option>
                                <option value="20:00">20:00</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                    <button className="confirm-btn" onClick={() => onConfirm(date, time)}>Confirm Reschedule</button>
                </div>
            </div>
        </div>
    );
};

export default RescheduleModal;
