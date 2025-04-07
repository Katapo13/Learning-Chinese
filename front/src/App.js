import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import Navbar from './components/layout/Navbar';
//import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
//import Dictionary from './pages/Dictionary';
//import Tests from './pages/Tests';
//import Texts from './pages/Texts';
//import Exercises from './pages/Exercises';
//import ProtectedRoute from './components/auth/ProtectedRoute';
//import TestDetails from './pages/TestDetails';
//import TextDetails from './pages/TextDetails';
//import ExerciseDetails from './pages/ExerciseDetails';

function App() {
  return React.createElement(
    'div',
    { className: 'flex flex-col min-h-screen' },
    React.createElement(Navbar),
    React.createElement(
      'main',
      { className: 'flex-grow' },
      React.createElement(
        Routes,
        null,
        React.createElement(Route, { path: '/', element: React.createElement(Home) }),
        React.createElement(Route, { path: '/login', element: React.createElement(Login) }),
        React.createElement(Route, { path: '/register', element: React.createElement(Register) }),
        /*React.createElement(Route, {
          path: '/dictionary',
          element: React.createElement(ProtectedRoute, null, React.createElement(Dictionary))
        }),
        React.createElement(Route, {
          path: '/tests',
          element: React.createElement(ProtectedRoute, null, React.createElement(Tests))
        }),
        React.createElement(Route, {
          path: '/tests/:id',
          element: React.createElement(ProtectedRoute, null, React.createElement(TestDetails))
        }),
        React.createElement(Route, {
          path: '/texts',
          element: React.createElement(ProtectedRoute, null, React.createElement(Texts))
        }),
        React.createElement(Route, {
          path: '/texts/:id',
          element: React.createElement(ProtectedRoute, null, React.createElement(TextDetails))
        }),
        React.createElement(Route, {
          path: '/exercises',
          element: React.createElement(ProtectedRoute, null, React.createElement(Exercises))
        }),
        React.createElement(Route, {
          path: '/exercises/:id',
          element: React.createElement(ProtectedRoute, null, React.createElement(ExerciseDetails))
        })*/
      )
    ),
    React.createElement(Footer)
  );
}

export default App;


