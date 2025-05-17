import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Проверяем наличие пользователя при загрузке приложения
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  // Функция регистрации
  async function register(email, userName, password) {
    try {
      const response = await AuthService.register(email, userName, password);
      setCurrentUser(response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Функция входа
  async function login(email, password) {
    try {
      const response = await AuthService.login(email, password);
      setCurrentUser(response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Функция выхода
  function logout() {
    AuthService.logout();
    setCurrentUser(null);
  }

  const value = {
    currentUser,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}