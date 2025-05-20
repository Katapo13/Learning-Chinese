import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Для переходов по маршрутам
import { CheckSquare} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import getLevelLabel from '../contexts/levelContext';
import './css/Tests.css';

 const TestContent = ({ test, onBackClick }) => {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = test?.questions || [];
  const question = questions[currentQuestion];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === question.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  if (showResult) {
    return (
      <div className="testpage-result">
        <h2>Результаты теста</h2>
        <p>Вы ответили правильно на {score} из {questions.length} вопросов</p>
        <button 
         onClick={onBackClick}
         className="testpage-btn"
        >
        ← Вернуться к списку тестов
        </button>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="testpage-error">
        <p>Тест не найден</p>
        <button 
         onClick={onBackClick}
         className="testpage-btn"
        >
        ← Вернуться к списку тестов
        </button>
      </div>
    );
  }

  return (
    <div className="testpage-content">
      <div className="testpage-header">
        <h2>Вопрос {currentQuestion + 1} из {questions.length}</h2>
        <p>{question.question}</p>
      </div>
      
      <div className="testpage-options">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`testpage-option-btn ${
              selectedAnswer !== null 
                ? index === question.correctAnswer 
                  ? 'correct' 
                  : selectedAnswer === index 
                    ? 'incorrect' 
                    : ''
                : ''
            }`}
            onClick={() => handleAnswerSelect(index)}
            disabled={selectedAnswer !== null}
          >
            {option}
          </button>
        ))}
      </div>
      
      <div className="testpage-progress">
        Прогресс: {currentQuestion + 1}/{questions.length}
      </div>
    </div>
  );
};

const TestsPage = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedTest, setSelectedTest] = useState(null);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //получаем тесты с бд
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/test');
        const data = await response.json();
        setTests(data);
        setLoading(false);
      } catch (e) {
        console.error('Ошибка загрузки тестов:', e);
        setError('Не удалось загрузить тесты');
        setLoading(false);
      }
    };
    
    fetchTests();
  }, []);

  const handleBackClick = () => {
    setSelectedTest(null); // Сбрасываем выбранный тест
  };

  

  const filteredTests = selectedLevel === 'all' 
    ? tests 
    : tests.filter(test => test.level === selectedLevel);

  const handleTestClick = (test) => {
    setSelectedTest(test);
  };

  if (selectedTest) {
    return (
      <div className="testpage-container">
        <Header />
        <TestContent 
        test={selectedTest} 
        onBackClick={handleBackClick} // Передаем функцию обратного вызова
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="testpage-container">
      <Header/>

      <div className="testpage-header-section">
        <h1>
          <CheckSquare size={32} />
          Тесты
        </h1>
        
        <div>
          <select
            className="testpage-select-input"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="all">Все уровни</option>
            <option value="beginner">Начальный</option>
            <option value="intermediate">Средний</option>
            <option value="advanced">Продвинутый</option>
          </select>
        </div>
      </div>

      <div className="testpage-grid">
        {filteredTests.map(test => (
          <div key={test._id} className="testpage-card">
            <div className="testpage-card-content">
              <h2>{test.title}</h2>
              <p>{test.description}</p>
              
              <div className="testpage-meta">
                <div className={`testpage-level ${
                  test.level === 'beginner' ? 'testpage-level-beginner' :
                  test.level === 'intermediate' ? 'testpage-level-intermediate' :
                  'testpage-level-advanced'
                 }`}>
                    {getLevelLabel(test.level)}
                </div>
                <span className="testpage-questions">{test.questions.length} вопросов</span>
                <span className="testpage-duration">{test.duration}</span>
              </div>
              
              <button
                onClick={() => handleTestClick(test)}
                className="testpage-btn"
              >
                Начать тест
              </button>
            </div>
          </div>
        ))}
      </div>

      <Footer/>
    </div>
  );
};

export default TestsPage;