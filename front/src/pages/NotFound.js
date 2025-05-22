import React from 'react';
import { Link } from 'react-router-dom';
import './css/NotFound.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Страница не найдена</h2>
        <p>
          Возможно, эта страница была удалена или вы ввели неправильный адрес.
        </p>
        <Link to="/" className="home-link">
          На главную
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;