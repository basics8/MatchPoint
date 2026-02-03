import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle, FaApple } from 'react-icons/fa';
import './Auth.css';

const SignupForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // State for inputs
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Account created successfully! Please login.");
                window.location.reload();
            } else {
                setError(data.message || "Registration failed.");
            }
        } catch (err) {
            setError(`Failed to connect to server. Error: ${err instanceof Error ? err.message : String(err)}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="signup-form" onSubmit={handleSignup}>
            {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            <div className="form-group">
                <label className="form-label">Username</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="JohnDoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                    type="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

            <button
                className="submit-btn"
                type="submit"
                disabled={loading}
            >
                {loading ? "Creating Account..." : "Create Account"}
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

export default SignupForm;
