// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Ошибка входа');
    }

    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const register = async (email, userName, password) => {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, userName, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Ошибка регистрации');
    }

    // автоматически логиним после регистрации
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);





// import React, { createContext, useContext, useState, useEffect } from 'react';

// //Создаем контекст
// const AuthContext = createContext();

// //Провайдер для обертывания всего приложения
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // При монтировании проверим, авторизован ли пользователь
//   useEffect(() => {
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   // Функции входа и выхода
//   const login = (userData) => {
//     localStorage.setItem('user', JSON.stringify(userData));
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   const isAuthenticated = !!user;

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// //Хук для доступа к AuthContext
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

