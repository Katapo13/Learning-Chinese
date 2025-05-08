import React from 'react';
import { Link } from 'react-router-dom'; // Для переходов по маршрутам
import { Book, CheckSquare, FileText, List } from 'lucide-react'; // Иконки для разделов
import { useAuth } from '../contexts/AuthContext'; // Контекст авторизации
import Header from '../components/Header'; // Компонент шапки
import Footer from '../components/Footer'; // Компонент футера

import './css/Home.css'; // Стили главной страницы

const Home = () => {
  // Получаем данные о том, авторизован ли пользователь и функцию выхода
  const { isAuthenticated, logout } = useAuth(); 

  // Обработчик выхода из аккаунта
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <div>
      
      <Header/>

      {/* Основной баннер с описанием и кнопками */}
      <section className="main-section">
        <div className="container">
          <div className="main-content">
            {/* Текст слева */}
            <div className="main-text">
              <h1>Изучайте китайский язык эффективно</h1>
              <p>
                Комплексная платформа для изучения китайского языка с тестами, 
                текстами, упражнениями и интерактивным словарем.
              </p>
              {/* Кнопки в зависимости от авторизации */}
              {isAuthenticated ? (
                <div className="main-button">
                  <Link to="/dictionary" className="button button-dictionary">
                    Начать обучение
                  </Link>
                  <Link to="/tests" className="button button-tests">
                    Перейти к тестам
                  </Link>
                </div>
              ) : (
                <div className="main-button">
                  <Link to="/register" className="button button-register">
                    Регистрация
                  </Link>
                  <Link to="/login" className="button button-login">
                    Вход
                  </Link>
                </div>
              )}
            </div>

            {/* Изображение справа */}
            <div className="main-img">
              <img
                src="https://images.unsplash.com/photo-1542695807939-063af86fa22f?ixlib=rb-4.0.3&fit=fillmax&h=600&w=800"
                className="main-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Раздел с возможностями платформы */}
      <section className="section">
        <div className="container">
          <h2 className="text-center">Наши возможности</h2>
          <div className="features-grid">
            {/* Карточки с возможностями */}
            <div className="card">
              <Book size={48} color="#a01515" />
              <h3>Тематический словарь</h3>
              <p>Изучайте слова по категориям с правильным произношением и примерами.</p>
            </div>
            <div className="card">
              <CheckSquare size={48} color="#a01515" />
              <h3>Интерактивные тесты</h3>
              <p>Проверяйте свои знания с помощью разнообразных интерактивных тестов.</p>
            </div>
            <div className="card">
              <FileText size={48} color="#a01515" />
              <h3>Тексты для чтения</h3>
              <p>Читайте тексты разного уровня сложности с переводом и комментариями.</p>
            </div>
            <div className="card">
              <List size={48} color="#a01515" />
              <h3>Упражнения</h3>
              <p>Практикуйте грамматику и лексику с помощью интерактивных упражнений.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Раздел с призывом к действию */}
      <section className="cta-section">
        <div className="container">
          <h2>Готовы начать изучать китайский?</h2>
          <p>Присоединяйтесь к нашей платформе и начните свой путь к свободному владению китайским языком уже сегодня.</p>
          {/* Кнопка — в зависимости от авторизации */}
          {isAuthenticated ? (
            <Link to="/dictionary" className="button button-dictionary">
              Перейти к обучению
            </Link>
          ) : (
            <Link to="/register" className="button button-register">
              Зарегистрироваться бесплатно
            </Link>
          )}
        </div>
      </section>

      {/* Футер сайта */}
      <Footer/>
    </div> 
  );
};

export default Home;
