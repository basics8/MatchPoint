import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle, FaApple } from 'react-icons/fa';
import './Auth.css';

const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // State for inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login Success
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('token', data.accessToken);

                if (data.roles === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setError(data.message || "Login failed.");
            }
        } catch (err) {
            setError(`Failed to connect to server. Error: ${err instanceof Error ? err.message : String(err)}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="login-form" onSubmit={handleLogin}>
            {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            <div className="form-group">
                <label className="form-label">Username</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-input"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
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
                disabled={loading}
            >
                {loading ? "Signing In..." : "Sign In"}
            </button>

            <div className="auth-divider">
                <span>or continue with</span>
            </div>

            <button className="social-btn" type="button">
                <FaGoogle /> Continue with Google
            </button>

            <button className="social-btn" type="button">
                <FaApple /> Continue with Apple
            </button>
        </form>
    );
};

export default LoginForm;
