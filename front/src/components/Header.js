import React from 'react';
import { Link } from 'react-router-dom'; // Для навигации по маршрутам
import { useAuth } from '../contexts/AuthContext'; // Контекст авторизации
import './Header.css'; // Стили для шапки сайта

const Header = () => {
  // Достаём из контекста данные об авторизации и функцию выхода
  const { isAuthenticated, logout } = useAuth();

  // Обработчик выхода из аккаунта
  const handleLogout = async () => {
    try {
      await logout(); // Выход из аккаунта
    } catch (error) {
      console.error('Ошибка при выходе:', error); // Ловим возможные ошибки
    }
  };

  return (
    <header className="header">
      <div className="container header-content">
        {/* Логотип сайта */}
        <h1 className="logo">Learn Chinese</h1>

        {/* Навигационное меню */}
        <nav>
          <ul className="nav-links">
            {/* Ссылки на разделы сайта */}
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/dictionary">Словарь</Link></li>
            <li><Link to="/tests">Тесты</Link></li>

            {/* Если пользователь авторизован — показать кнопку выхода */}
            {isAuthenticated ? (
              <li>
                <button
                  type="button"
                  className="logout-link"
                  onClick={handleLogout}
                >
                  Выйти
                </button>
              </li>
            ) : (
              // Если не авторизован — показать ссылку на вход
              <li><Link to="/login">Вход</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
