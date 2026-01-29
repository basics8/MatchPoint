import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './Auth.css';

const AuthContainer = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-container">
            <div className="auth-header-main">
                <h1 className="app-title">MatchPoint</h1>
                <p className="auth-subtitle">
                    {isLogin ? "Welcome back!" : "Create your account"}
                </p>
            </div>

            <div className="auth-card">
                <div className="auth-toggle">
                    <button
                        className={`toggle-btn ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`toggle-btn ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </button>
                </div>

                {isLogin ? <LoginForm /> : <SignupForm />}
            </div>

            <div className="footer-text">
                By continuing, you agree to our <a href="#" className="link">Terms of Service</a><br />
                and <a href="#" className="link">Privacy Policy</a>
            </div>
        </div>
    );
};

export default AuthContainer;
