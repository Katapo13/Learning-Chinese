import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import './css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        setError('');
        setLoading(true);
        await login(email, password); 
        navigate('/');
      } catch (err) {
        console.error(err);
        setError(err.message || 'Ошибка входа');
      } finally {
        setLoading(false);
      }

    };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <Link to="/" className="back-link">←</Link>
        <h2 className="login-title">Вход</h2>
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
            <label htmlFor="password">Пароль</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Выполняется вход...' : 'Войти'}
          </button>

          <p className="register-text">
            Еще нет аккаунта?{' '}
            <Link to="/register" className="register-link">
              Зарегистрироваться
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext'; // Для работы с авторизацией
// import { Eye, EyeOff } from 'lucide-react'; // Иконки глазика для показа/скрытия пароля
// import './css/Login.css'; // Стили для формы входа

// const Login = () => {
//   // Состояния для формы
//   const [userLogin, setLogin] = useState('');      // Логин (не используется в handleSubmit)
//   const [email, setEmail] = useState('');          // Email
//   const [password, setPassword] = useState('');    // Пароль
//   const [error, setError] = useState('');          // Сообщение об ошибке
//   const [loading, setLoading] = useState(false);   // Состояние загрузки
//   const [showPassword, setShowPassword] = useState(false); // Отображение пароля

//   const { login } = useAuth(); // Получаем функцию login из контекста авторизации
//   const navigate = useNavigate(); // Навигация между страницами

//   // Обработка отправки формы
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Предотвращаем перезагрузку страницы

//     try {
//       setError('');
//       setLoading(true); // Показываем, что идет загрузка
//       await login(email, password); // Пытаемся войти
//       navigate('/'); // После успешного входа перенаправляем на главную
//     } catch (err) {
//       setError('Ошибка входа. Проверьте email и пароль.'); // Ошибка при входе
//     } finally {
//       setLoading(false); // Снимаем состояние загрузки
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-card">
//        <Link to="/" className="back-link">←</Link>
//         <h2 className="login-title">Вход</h2>

//         {/* Отображение ошибки, если есть */}
//         {error && <div className="error-message">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           {/* Поле Email */}
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           {/* Поле логина — не используется при авторизации, можно удалить или адаптировать */}
//           <div className="form-group">
//             <label htmlFor="login">Логин</label>
//             <div className="login-input-wrapper">
//               <input
//                 id="login"
//                 type="text"
//                 value={userLogin}
//                 onChange={(e) => setLogin(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Поле пароля */}
//             <label htmlFor="password">Пароль</label>
//             <div className="password-input-wrapper">
//               <input
//                 id="password"
//                 type={showPassword ? 'text' : 'password'} // Переключение между скрытым/открытым паролем
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               {/* Кнопка для показа/скрытия пароля */}
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//           </div>

//           {/* Кнопка отправки формы */}
//           <button type="submit" className="login-button" disabled={loading}>
//             {loading ? 'Выполняется вход...' : 'Войти'}
//           </button>

//           {/* Ссылка на регистрацию */}
//           <p className="register-text">
//             Еще нет аккаунта?{' '}
//             <Link to="/register" className="register-link">
//               Зарегистрироваться
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;