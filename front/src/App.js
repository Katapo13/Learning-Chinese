import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Tests from './pages/Tests';
import Dictionary from './pages/Dictionary';
import Texts from './pages/Texts.js';
import Exercises from './pages/Exercises.js';
import Profile from './pages/Profile.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import NotFoundPage from './pages/NotFound.js';
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          {/* пути к определённым элементам сайта*/ }
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tests" element={<ProtectedRoute><Tests /></ProtectedRoute>} />
          <Route path="/dictionary" element={<ProtectedRoute><Dictionary /></ProtectedRoute>} />
          <Route path="/texts" element={<ProtectedRoute><Texts /></ProtectedRoute>} />
          <Route path="/exercises" element={<ProtectedRoute><Exercises /></ProtectedRoute>} />
          {/* <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

