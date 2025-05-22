import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book, User, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'; // Контекст авторизации
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-brand">
            <Link to="/" className="brand-link">
              <Book className="brand-icon" />
              <span className="brand-text-h">汉语学习</span>
            </Link>
            {/* Ссылки в зависимости от авторизации */}
            {user ? (
            <div className="header-links">
              <Link to="/" className="header-link">Главная</Link>
              <Link to="/dictionary" className="header-link">Словарь</Link>
              <Link to="/tests" className="header-link">Тесты</Link>
              <Link to="/texts" className="header-link">Тексты</Link>
              <Link to="/exercises" className="header-link">Упражнения</Link>
            </div>
            ) : (
            <div className="header-links">
              <Link to="/" className="header-link">Главная</Link>
              <Link to="/login" className="header-link">Словарь</Link>
              <Link to="/login" className="header-link">Тесты</Link>
              <Link to="/login" className="header-link">Тексты</Link>
              <Link to="/login" className="header-link">Упражнения</Link>
            </div>
              )}
              
            
          </div>
          
          <div className="user-actions">
          {user ? (
            <div className="user-actions">
              <Link to="/" className="user-profile">
                <User className="user-icon-man" />
                <span>{user.userName}</span>
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                <LogOut className="user-icon-logout" />
                <span>Выйти</span>
              </button>
            </div>
          ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn-outline">Войти</Link>
                <Link to="/register" className="btn-primary">Регистрация</Link>
              </div>
            )}
          </div>
          
          <div className="mobile-menu-btn">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-menu-btn"
            >
              {isOpen ? <X className="mobile-menu-icon" /> : <Menu className="mobile-menu-icon" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="mobile-menu">
          <div className="mobile-links">
            <Link 
              to="/" 
              className="mobile-link"
              onClick={() => setIsOpen(false)}
            >
              Главная
            </Link>
            <Link 
              to="/dictionary" 
              className="mobile-link"
              onClick={() => setIsOpen(false)}
            >
              Словарь
            </Link>
            <Link 
              to="/tests" 
              className="mobile-link"
              onClick={() => setIsOpen(false)}
            >
              Тесты
            </Link>
            <Link 
              to="/texts" 
              className="mobile-link"
              onClick={() => setIsOpen(false)}
            >
              Тексты
            </Link>
            <Link 
              to="/exercises" 
              className="mobile-link"
              onClick={() => setIsOpen(false)}
            >
              Упражнения
            </Link>
          </div>
          
          <div className="mobile-auth-section">
            {user ? (
              <div className="mobile-links">
                <Link
                  to="/profile"
                  className="mobile-link"
                  onClick={() => setIsOpen(false)}
                >
                  Профиль
                </Link>
                <button
                  onClick={handleLogout}
                  className="mobile-link"
                >
                  Выйти
                </button>
              </div>
            ) : (
              <div className="mobile-auth-links">
                <Link
                  to="/login"
                  className="mobile-login-btn"
                  onClick={() => setIsOpen(false)}
                >
                  Войти
                </Link>
                <Link
                  to="/register"
                  className="mobile-register-btn"
                  onClick={() => setIsOpen(false)}
                >
                  Регистрация
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;