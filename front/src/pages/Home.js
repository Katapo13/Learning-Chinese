import React from 'react';
import { Link } from 'react-router-dom';
import { Book, CheckSquare, FileText, List } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './css/Home.css'; 

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
     
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Изучайте китайский язык эффективно</h1>
              <p>Комплексная платформа для изучения китайского языка с тестами, текстами, упражнениями и интерактивным словарем.</p>
              {isAuthenticated ? (
                <div className="btn-group">
                  <Link to="/dictionary" className="btn btn-primary">Начать обучение</Link>
                  <Link to="/tests" className="btn btn-outline">Перейти к тестам</Link>
                </div>
              ) : (
                <div className="btn-group">
                  <Link to="/register" className="btn btn-primary">Регистрация</Link>
                  <Link to="/login" className="btn btn-outline">Вход</Link>
                </div>
              )}
            </div>
            <div className="hero-img">
              <img
                src="https://images.unsplash.com/photo-1542695807939-063af86fa22f?ixlib=rb-4.0.3&fit=fillmax&h=600&w=800"
                alt="Китайская каллиграфия"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

     
      <section className="section">
        <div className="container">
          <h2 className="text-center">Наши возможности</h2>
          <div className="features-grid">
            <div className="card">
              <Book size={48} color="#4299e1" />
              <h3>Тематический словарь</h3>
              <p>Изучайте слова по категориям с правильным произношением и примерами.</p>
            </div>
            <div className="card">
              <CheckSquare size={48} color="#4299e1" />
              <h3>Интерактивные тесты</h3>
              <p>Проверяйте свои знания с помощью разнообразных интерактивных тестов.</p>
            </div>
            <div className="card">
              <FileText size={48} color="#4299e1" />
              <h3>Тексты для чтения</h3>
              <p>Читайте тексты разного уровня сложности с переводом и комментариями.</p>
            </div>
            <div className="card">
              <List size={48} color="#4299e1" />
              <h3>Упражнения</h3>
              <p>Практикуйте грамматику и лексику с помощью интерактивных упражнений.</p>
            </div>
          </div>
        </div>
      </section>

     
      <section className="cta-section section">
        <div className="container">
          <h2>Готовы начать изучать китайский?</h2>
          <p>Присоединяйтесь к нашей платформе и начните свой путь к свободному владению китайским языком уже сегодня.</p>
          {isAuthenticated ? (
            <Link to="/dictionary" className="btn btn-primary">Перейти к обучению</Link>
          ) : (
            <Link to="/register" className="btn btn-primary">Зарегистрироваться бесплатно</Link>
          )}
        </div>
      </section>
    </div> 
  );
};

export default Home;


