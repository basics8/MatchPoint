import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle, FaApple } from 'react-icons/fa';
import './Auth.css';

const SignupForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="signup-form">
            <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="John Doe"
                />
            </div>

            <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                    type="email"
                    className="form-input"
                    placeholder="you@example.com"
                />
            </div>

            <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-input"
                        placeholder="••••••••"
                    />
                    <button
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>

            <button
                className="submit-btn"
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    navigate('/dashboard');
                }}
            >
                Create Account
            </button>

            <div className="auth-divider">
                <span>or continue with</span>
            </div>

            <button className="social-btn">
                <FaGoogle /> Continue with Google
            </button>

            <button className="social-btn">
                <FaApple /> Continue with Apple
            </button>
        </div>
    );
};

export default SignupForm;
