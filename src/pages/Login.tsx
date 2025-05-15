import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLogin } from '../hooks/useLogin';
import '../styles/login.css';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const { isAuthenticated, login: authLogin } = useAuth();
    const { login, loading, error } = useLogin();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const phoneRegex = /^\+998\d{9}$/;
        if (!phoneRegex.test(phoneNumber)) {
            alert('Iltimos, to‘g‘ri telefon raqam kiriting (+998901234567)');
            return;
        }

        if (password.length < 6) {
            alert('Parol kamida 6 ta belgidan iborat bo‘lishi kerak');
            return;
        }

        try {
            const userData = await login(phoneNumber, password);
            authLogin(userData.tokens, {
                ...userData,
                name: userData.first_name 
                    ? `${userData.first_name} ${userData.last_name || ''}`.trim() 
                    : undefined
            });
            if (remember) {
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('rememberMe');
            }
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    return (
        <div className="login-root">
            <div className="login-left-panel">
                <div className="login-logo-block">
                    <div className="login-logo-square"></div>
                    <h1 className="login-title">Noventer</h1>
                    <p className="login-subtitle">CRM tizimi bilan biznesingizni rivojlantiring</p>
                </div>
            </div>
            <div className="login-right-panel">
                <div className="login-form-card">
                    <h2 className="login-form-title">Noventer</h2>
                    <p className="login-form-desc">CRM tizimiga xush kelibsiz</p>

                    {error && (
                        <div className="error-message">
                            {error === 'Telefon raqam yoki parol noto‘g‘ri' ? (
                                <>
                                    <p>Kiritilgan ma'lumotlar noto‘g‘ri</p>
                                    <p>Iltimos, qaytadan urinib ko‘ring</p>
                                </>
                            ) : (
                                error
                            )}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="phone">Telefon raqam</label>
                            <input
                                type="tel"
                                id="phone"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="+998901234567"
                                pattern="\+998\d{9}"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Parolingiz</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                required
                                minLength={6}
                            />
                        </div>

                        <div className="login-form-row">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={() => setRemember(!remember)}
                                />
                                <span>Eslab qolish</span>
                            </label>
                            <a href="#" className="forgot-password-link">Parolni unutdingizmi?</a>
                        </div>

                        <button 
                            type="submit" 
                            className="login-submit-btn" 
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Kirish jarayonda...
                                </>
                            ) : 'Kirish'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;