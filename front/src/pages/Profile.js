import { useState, useEffect } from 'react';
import { User, Edit, CheckCircle, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/Profile.css';

function Profile() {
  const { user, updateUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user?.userName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getUser/${user._id}`);
        const data = await response.json();
        console.log('Загруженные данные:', data);
        updateUser(data);
        setUserName(data.userName || '');
        setEmail(data.email || '');
        setLoading(false);
      } catch (err) {
        console.error('Ошибка загрузки данных пользователя:', err);
        setLoading(false);
      }
    };

    if (user && user._id) {
      // Инициализируем состояния из текущего пользователя
      setUserName(user.userName || '');
      setEmail(user.email || '');
      
      // Затем загружаем свежие данные с сервера
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [user?._id]);

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/updateProfile/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, email }),
      });

      const data = await response.json();
      if (response.ok) {
        updateUser(data);
        setIsEditing(false);
      } else {
        console.error('Ошибка при обновлении профиля:', data.message);
      }
    } catch (err) {
      console.error('Ошибка сети:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return <p>Вы не авторизованы. Пожалуйста, войдите в систему.</p>;
  }

  if (loading) {
    return <p>Загрузка профиля...</p>;
  }

  if (!user) {
    return <p>Не удалось загрузить данные пользователя.</p>;
  }

  const totalTests = 4;
  const totalExercises = 6;
  const completedTests = user?.progress?.completedTests?.length || 0;
  const completedExercises = user?.progress?.completedLessons?.length || 0;

  const testProgress = Math.round((completedTests / totalTests) * 100);
  const exerciseProgress = Math.round((completedExercises / totalExercises) * 100);
  const overallProgress = Math.round((testProgress + exerciseProgress) / 2);

  return (
    <div>
      <Header />
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">
            <User size={32} />
            Профиль
          </h1>
        </div>

        <div className="profile-grid">
          <div className="profile-card profile-info">
            <div className="profile-header">
              <h2 className="profile-subtitle">Информация пользователя</h2>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="btn outline">
                  <Edit className="icon" />
                  Редактировать
                </button>
              ) : (
                <button onClick={handleSaveProfile} className="btn primary">
                  <CheckCircle className="icon" />
                  Сохранить
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="profile-form">
                <div className="form-group">
                  <label htmlFor="userName">Имя пользователя</label>
                  <input
                    id="userName"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Введите имя пользователя"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Электронная почта</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Введите вашу почту"
                  />
                </div>
              </div>
            ) : (
              <div className="profile-details">
                <div className="detail-item">
                  <User className="icon-sm" />
                  <div>
                    <p className="detail-label">Имя пользователя</p>
                    <p className="detail-value">{userName || 'Не указано'}</p>
                  </div>
                </div>
                <div className="detail-item">
                  <svg className="icon-sm" viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="detail-label">Электронная почта</p>
                    <p className="detail-value">{email || 'Не указана'}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="logout-section">
              <button onClick={handleLogout} className="logout-button">
                <LogOut className="icon-sm" />
                Выйти из аккаунта
              </button>
            </div>
          </div>

          <div className="profile-card profile-progress">
            <h2 className="profile-subtitle">Прогресс обучения</h2>

            <div className="progress-section">
              <ProgressBar label="Общий прогресс" value={overallProgress} color="primary" />
              <ProgressBar label="Тесты завершены" value={testProgress} total={`${completedTests}/${totalTests}`} color="secondary" />
              <ProgressBar label="Упражнения завершены" value={exerciseProgress} total={`${completedExercises}/${totalExercises}`} color="blue" />
            </div>

            <div className="activity-section">
              <h3>Недавняя активность</h3>
              <div className="activity-list">
                {user?.progress?.completedTests?.slice(0, 3).map((testId, i) => (
                  <div key={`test-${i}`} className="activity-item">
                    <CheckCircle className="icon-sm green" />
                    <span>
                      {{
                        'greetings-test': 'Тест по приветствиям',
                        'education-test': 'Тест по образованию',
                        'food-test': 'Тест по еде',
                      }[testId] || 'Завершен тест'}
                    </span>
                  </div>
                ))}
                {user?.progress?.completedLessons?.slice(0, 3).map((lessonId, i) => (
                  <div key={`lesson-${i}`} className="activity-item">
                    <CheckCircle className="icon-sm green" />
                    <span>
                      {{
                        'fill-1': 'Заполнение пробелов',
                        'fill-2': 'Словарь еды',
                        'order-1': 'Диалог',
                        'order-2': 'История',
                        'char-1': 'Базовые иероглифы',
                      }[lessonId] || 'Упражнение'}
                    </span>
                  </div>
                ))}
                {completedTests === 0 && completedExercises === 0 && (
                  <div className="no-activity">
                    Вы еще не выполнили никаких заданий. Начните учиться!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ProgressBar({ label, value, total, color }) {
  return (
    <div className="progress-item">
      <div className="progress-header">
        <span>{label}</span>
        <span>{total || `${value}%`}</span>
      </div>
      <div className="progress-bar">
        <div className={`progress-fill ${color}`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}

export default Profile;