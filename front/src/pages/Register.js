import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import './css/Register.css';

const Register = () => {
  const [userLogin, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Проверка длины пароля
    if (newPassword.length < 8) {
      setError('Пароль слишком короткий (минимум 8 символов)');
    } else {
      setError(''); 
    }
 }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
        return setError('Пароли не совпадают');
    }

    try {
      setError('');
      setLoading(true);
      await login(email, login, password);
      navigate('/');
    } catch (err) {
      setError('Не удалось создать учётную запись');
    } finally {
      setLoading(false);
    }

    
};

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2 className="register-title">Регистрация</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

         <div className="form-group">
          <label htmlFor="login">Логин</label>
            <div className="login-input-wrapper">
                <input
                id="login"
                type="text"
                value={userLogin}
                onChange={(e) => setLogin(e.target.value)}
                required
                />
            </div>

            <label htmlFor="password">Пароль</label>
            <div className="password-input-wrapper">
                <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                required
                />
                <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>

            <label htmlFor="repeatPassword">Повтор пароля</label>
            <div className="repeat-password-input-wrapper">
                <input
                id="repeatPassword"
                type={showRepeatPassword ? 'text' : 'password'}
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}  
                required
                />
                <button
                type="button"
                className="toggle-password"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                {showRepeatPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
         </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Выполняется регистрация...' : 'Регистрация'}
          </button>

          <p className="login-text">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="login-link">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
