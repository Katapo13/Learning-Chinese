import React from 'react';
import { Link } from 'react-router-dom';
import './css/NotFound.css'; 

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Страница не найдена</h1>
      <p>Извините, запрашиваемая страница не существует.</p>
      <Link to="/" className="home-link">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;