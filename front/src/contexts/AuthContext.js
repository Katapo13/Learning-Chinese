import React, { createContext, useContext, useState, useEffect } from 'react';

//Создаем контекст
const AuthContext = createContext();

//Провайдер для обертывания всего приложения
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // При монтировании проверим, авторизован ли пользователь
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Функции входа и выхода
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

//Хук для доступа к AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
