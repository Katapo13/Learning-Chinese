import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './ProtectedRoute.css'; 

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, user, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Проверка авторизации...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ 
          from: location,
          message: 'Пожалуйста, войдите в систему для доступа к этой странице.' 
        }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;