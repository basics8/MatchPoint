import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle, FaApple } from 'react-icons/fa';
import './Auth.css';

const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="login-form">
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

            <a href="#" className="forgot-password">Forgot password?</a>

            <button
                className="submit-btn"
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    navigate('/dashboard');
                }}
            >
                Sign In
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

export default LoginForm;
