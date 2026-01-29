import { CreditCard } from 'lucide-react';
import './PaymentMethodsSection.css';

export const PaymentMethodsSection = () => {
    return (
        <div className="payment-methods-section">
            <h2 className="payment-title">Payment Methods</h2>

            <div className="cards-list">
                <div className="card-item">
                    <div className="card-info">
                        <div className="card-icon">
                            <CreditCard size={20} />
                        </div>
                        <div className="card-details">
                            <span className="card-number">•••• •••• •••• 4242</span>
                            <span className="card-expiry">Expires 12/26</span>
                        </div>
                    </div>
                    <button className="remove-btn">Remove</button>
                </div>
            </div>

            <button className="add-card-btn">
                + Add Payment Method
            </button>
        </div>
    );
};
