import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Для работы с авторизацией
import { Eye, EyeOff } from 'lucide-react'; // Иконки глазика для скрытия/показа пароля
import './css/Register.css'; // Стили формы регистрации

const Register = () => {
  // Состояния формы
  const [userLogin, setLogin] = useState('');                 // Логин
  const [email, setEmail] = useState('');                     // Email
  const [password, setPassword] = useState('');               // Пароль
  const [repeatPassword, setRepeatPassword] = useState('');   // Повтор пароля
  const [error, setError] = useState('');                     // Сообщение об ошибке
  const [loading, setLoading] = useState(false);              // Состояние загрузки
  const [showPassword, setShowPassword] = useState(false);    // Скрытие/отображение пароля
  const [showRepeatPassword, setShowRepeatPassword] = useState(false); // Отображение повторного пароля

  const { login } = useAuth(); // Функция регистрации
  const navigate = useNavigate(); // Навигация между страницами

  // Обработчик изменения пароля с валидацией длины
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Проверка длины пароля
    if (newPassword.length < 8) {
      setError('Пароль слишком короткий (минимум 8 символов)');
    } else {
      setError('');
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка совпадения паролей
    if (password !== repeatPassword) {
      return setError('Пароли не совпадают');
    }

    try {
      setError('');
      setLoading(true);

      // Регистрация пользователя (возможно, login — это ошибка, должна быть register)
      await login(email, userLogin, password);

      // Перенаправление на главную страницу после успешной регистрации
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

        {/* Блок ошибки */}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Поле email */}
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
            {/* Поле логина */}
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

            {/* Поле пароля с кнопкой показа/скрытия */}
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

            {/* Повтор пароля с иконкой глаза */}
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

          {/* Кнопка отправки */}
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Выполняется регистрация...' : 'Регистрация'}
          </button>

          {/* Ссылка на страницу входа */}
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
