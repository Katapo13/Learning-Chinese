import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Для переходов по маршрутам
import { CheckSquare} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/Tests.css';

const TestContent = ({ testId, onBackClick }) => {
  const testQuestions = {
    1: [
      {
        id: 1,
        question: 'Как сказать "Привет" на китайском?',
        options: ['你好 (nǐ hǎo)', '谢谢 (xiè xiè)', '再见 (zài jiàn)', '早上好 (zǎo shang hǎo)'],
        correctAnswer: 0
      },
      {
        id: 2,
        question: 'Как будет "Спасибо" по-китайски?',
        options: ['不客气 (bù kè qi)', '谢谢 (xiè xiè)', '对不起 (duì bu qǐ)', '没关系 (méi guān xi)'],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'Как сказать "До свидания" на китайском?',
        options: ['你好 (nǐ hǎo)', '谢谢 (xiè xiè)', '再见 (zài jiàn)', '早上好 (zǎo shang hǎo)'],
        correctAnswer: 2
      },
      {
        id: 4,
        question: 'Как сказать "Добрый вечер" на китайском?',
        options: ['晚上好(wǎnshàng hǎo)', '谢谢 (xiè xiè)', '再见 (zài jiàn)', '早上好 (zǎo shang hǎo)'],
        correctAnswer: 0
      },
      {
        id: 5,
        question: 'Как сказать "Доброе утро" на китайском?',
        options: ['你好 (nǐ hǎo)', '晚上好(wǎnshàng hǎo)', '再见 (zài jiàn)', '早上好 (zǎo shang hǎo)'],
        correctAnswer: 3
      },
      {
        id: 6,
        question: 'Как сказать "Прошу прощения" на китайском?',
        options: ['对不起 (duìbùqǐ)', '晚上好(wǎnshàng hǎo)', '恐怕 (kǒngpà)', '你好吗 (nǐ hǎo ma)'],
        correctAnswer: 0
      }
    ],
    2: [
      {
        id: 1,
        question: 'Как сказать "Меню, пожалуйста" в ресторане?',
        options: ['请给我菜单 (qǐng gěi wǒ cài dān)', '我要买单 (wǒ yào mǎi dān)', '好吃 (hǎo chī)', '服务员 (fú wù yuán)'],
        correctAnswer: 0
      },
      {
        id: 2,
        question: 'Как попросить куриный суп в ресторане?',
        options: ['我想要咖啡 (Wǒ xiǎng yào kāfēi)', '我要买单 (wǒ yào mǎi dān)', '好吃 (hǎo chī)', '我要鸡汤 (Wǒ yào jītāng)'],
        correctAnswer: 3
      }
    ]
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = testQuestions[testId] || [];
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
  
  const handleBackClick = () => {
    setSelectedTest(null); // Сбрасываем выбранный тест
  };
  const tests = [
    {
      id: 1,
      title: 'Основные приветствия',
      description: 'Тест на базовые китайские приветствия и вежливые выражения',
      level: 'beginner',
      questions: 10,
      duration: '5-10 мин'
    },
    {
      id: 2,
      title: 'В ресторане',
      description: 'Тест на лексику для заказа еды и общения в ресторане',
      level: 'intermediate',
      questions: 15,
      duration: '10-15 мин'
    },
    {
      id: 3,
      title: 'Путешествия',
      description: 'Тест на слова и фразы для путешествий по Китаю',
      level: 'intermediate',
      questions: 12,
      duration: '10-12 мин'
    },
    {
      id: 4,
      title: 'Китайские идиомы',
      description: 'Продвинутый тест на знание китайских идиом',
      level: 'advanced',
      questions: 20,
      duration: '15-20 мин'
    }
  ];

  const filteredTests = selectedLevel === 'all' 
    ? tests 
    : tests.filter(test => test.level === selectedLevel);

  const handleTestClick = (test) => {
    setSelectedTest(test);
  };


  const getLevelLabel = (level) => {
    switch(level) {
      case 'beginner': return 'Начальный';
      case 'intermediate': return 'Средний';
      case 'advanced': return 'Продвинутый';
      default: return level;
    }
  };

  const getLevelClass = (level) => {
    switch(level) {
      case 'beginner': return 'testpage-level-beginner';
      case 'intermediate': return 'testpage-level-intermediate';
      case 'advanced': return 'testpage-level-advanced';
      default: return '';
    }
  };

  if (selectedTest) {
    return (
      <div className="testpage-container">
        <Header />
        <TestContent 
        testId={selectedTest.id} 
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
          <div key={test.id} className="testpage-card">
            <div className="testpage-card-content">
              <h2>{test.title}</h2>
              <p>{test.description}</p>
              
              <div className="testpage-meta">
                <span className={`testpage-level ${getLevelClass(test.level)}`}>
                  {getLevelLabel(test.level)}
                </span>
                <span className="testpage-questions">{test.questions} вопросов</span>
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