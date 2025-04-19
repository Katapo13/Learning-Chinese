import React from 'react';
import { Link } from 'react-router-dom'; // Для создания ссылок на маршруты
import { CheckSquare } from 'lucide-react'; // Иконка для заголовка
import Header from '../components/Header'; // Шапка сайта
import Footer from '../components/Footer'; // Футер сайта
import './css/Tests.css'; // Стили для страницы тестов

const Tests = () => {
  return (
    <div className="container">
      {/* Шапка сайта */}
      <Header/>

      {/* Заголовок страницы с иконкой */}
      <div className="header">
        <h1>
          <CheckSquare size={32} /> {/* Иконка "галочка в квадрате" */}
          Тесты
        </h1>
      </div>

      {/* Сетка карточек с тестами */}
      <div className="grid">
        <div key={1} className="card">
          <div className="p-6">
            <Link 
              to={`/tests`} // Пока ссылка ведёт на текущую страницу, можно заменить на конкретный тест
              className="btn"
            >
              Начать тест
            </Link>
          </div>
        </div>
      </div>

      {/* Футер сайта */}
      <Footer/>
    </div>
  );
};

export default Tests;
