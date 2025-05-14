import { useState } from 'react';
import { CheckCircle, X, HelpCircle } from 'lucide-react';
//import { useDictionary } from '../contexts/DictionaryContext';
import { List } from 'lucide-react'; // Иконка списка
import { useAuth } from '../contexts/AuthContext';
import './css/Exercises.css';
import Header from '../components/Header'; // Компонент шапки
import Footer from '../components/Footer'; // Компонент футера


const Exercises = () => {
  //const { words } = useDictionary();
  const { user, updateUser } = useAuth();
  
  const [selectedType, setSelectedType] = useState('all');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const fillInBlanksExercises = [
    {
      id: 'fill-1',
      type: 'fill-in-blanks',
      title: 'Основные приветствия',
      level: 'beginner',
      instructions: 'Заполните пропуски правильными словами',
      content: {
        sentences: [
          { text: '早上好！___ 起床了吗？', answer: '你' },
          { text: '我___ 中国人。', answer: '是' },
          { text: '他___ 看书。', answer: '在' },
          { text: '她___ 吃饭吗？', answer: '要' },
          { text: '谢谢___ 的帮助。', answer: '你' }
        ]
      }
    },
    // ... другие упражнения
  ];

  const sentenceOrderingExercises = [
    {
      id: 'order-1',
      type: 'sentence-ordering',
      title: 'Порядок диалога',
      level: 'beginner',
      instructions: 'Расположите предложения в правильном порядке',
      content: {
        sentences: [
          { id: 1, text: '你好！' },
          { id: 2, text: '你好！你叫什么名字？' },
          { id: 3, text: '我叫小明。你呢？' },
          { id: 4, text: '我叫小红。很高兴认识你！' },
          { id: 5, text: '我也很高兴认识你！' }
        ],
        correctOrder: [1, 2, 3, 4, 5]
      }
    },
    // ... другие упражнения
  ];

  const characterWritingExercises = [
    {
      id: 'char-1',
      type: 'character-writing',
      title: 'Базовые иероглифы',
      level: 'beginner',
      instructions: 'Введите пиньинь для следующих иероглифов',
      content: {
        characters: [
          { character: '你', pinyin: 'nǐ' },
          { character: '好', pinyin: 'hǎo' },
          { character: '中', pinyin: 'zhōng' },
          { character: '国', pinyin: 'guó' },
          { character: '人', pinyin: 'rén' }
        ]
      }
    },
    // ... другие упражнения
  ];

  const allExercises = [...fillInBlanksExercises, ...sentenceOrderingExercises, ...characterWritingExercises];
  
  const filteredExercises = selectedType === 'all' 
    ? allExercises 
    : allExercises.filter(exercise => exercise.type === selectedType);

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
    
    let initialAnswers = [];
    if (exercise.type === 'fill-in-blanks') {
      initialAnswers = new Array(exercise.content.sentences.length).fill('');
    } else if (exercise.type === 'sentence-ordering') {
      const shuffledIndices = [...exercise.content.sentences]
        .sort(() => 0.5 - Math.random())
        .map(s => s.id.toString());
      initialAnswers = shuffledIndices;
    } else if (exercise.type === 'character-writing') {
      initialAnswers = new Array(exercise.content.characters.length).fill('');
    }
    
    setUserAnswers(initialAnswers);
    setIsSubmitted(false);
    setShowHint(false);
  };

  const handleBackClick = () => {
    setSelectedExercise(null);
    setUserAnswers([]);
    setIsSubmitted(false);
    setShowHint(false);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    
    if (user && selectedExercise) {
      const updatedCompletedLessons = [...(user.progress?.completedLessons || [])];
      if (!updatedCompletedLessons.includes(selectedExercise.id)) {
        updatedCompletedLessons.push(selectedExercise.id);
        updateUser({
          progress: {
            ...user.progress,
            completedLessons: updatedCompletedLessons
          }
        });
      }
    }
  };

  const handleReset = () => {
    let initialAnswers = [];
    if (selectedExercise?.type === 'fill-in-blanks') {
      initialAnswers = new Array(selectedExercise.content.sentences.length).fill('');
    } else if (selectedExercise?.type === 'sentence-ordering') {
      const shuffledIndices = [...selectedExercise.content.sentences]
        .sort(() => 0.5 - Math.random())
        .map(s => s.id.toString());
      initialAnswers = shuffledIndices;
    } else if (selectedExercise?.type === 'character-writing') {
      initialAnswers = new Array(selectedExercise.content.characters.length).fill('');
    }
    
    setUserAnswers(initialAnswers);
    setIsSubmitted(false);
    setShowHint(false);
  };

  const handleFillInBlankChange = (index, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const handleReorderSentence = (sourceIndex, targetIndex) => {
    if (isSubmitted) return;
    
    const newAnswers = [...userAnswers];
    const [removed] = newAnswers.splice(sourceIndex, 1);
    newAnswers.splice(targetIndex, 0, removed);
    setUserAnswers(newAnswers);
  };

  const handleCharacterInputChange = (index, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const checkFillInBlankAnswer = (index) => {
    if (!isSubmitted) return null;
    const userAnswer = userAnswers[index];
    const correctAnswer = selectedExercise?.content.sentences[index].answer;
    return userAnswer?.trim().toLowerCase() === correctAnswer?.trim().toLowerCase();
  };

  const checkSentenceOrderAnswer = () => {
    if (!isSubmitted || !selectedExercise) return null;
    const correctOrder = selectedExercise.content.correctOrder.map(id => id.toString());
    return JSON.stringify(userAnswers) === JSON.stringify(correctOrder);
  };

  const checkCharacterWritingAnswer = (index) => {
    if (!isSubmitted) return null;
    const userAnswer = userAnswers[index];
    const correctAnswer = selectedExercise?.content.characters[index].pinyin;
    const normalize = (str) => str?.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return normalize(userAnswer?.trim().toLowerCase()) === normalize(correctAnswer?.trim().toLowerCase());
  };

  const getLevelLabel = (level) => {
    switch (level) {
      case 'beginner': return 'Начальный';
      case 'intermediate': return 'Средний';
      case 'advanced': return 'Продвинутый';
      default: return level;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'fill-in-blanks': return 'Заполнение пробелов';
      case 'sentence-ordering': return 'Порядок предложений';
      case 'character-writing': return 'Написание иероглифов';
      default: return type;
    }
  };

  return (
    <div className="exercises-container">
    <Header/>
      {!selectedExercise ? (
        <>
          <div className="exercises-header">
            <h1>
                <List size={32} /> {/* Иконка "список" */}
                Упражнения 
                </h1>
            <div>
              <select
                className="select-input"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">Все типы</option>
                <option value="fill-in-blanks">Заполнение пробелов</option>
                <option value="sentence-ordering">Порядок предложений</option>
                <option value="character-writing">Написание иероглифов</option>
              </select>
            </div>
          </div>

          <div className="exercises-grid">
            {filteredExercises.map(exercise => (
              <div 
                key={exercise.id} 
                className="exercise-card" 
                onClick={() => handleExerciseClick(exercise)}
              >
                <h2 className="exercise-card-title">{exercise.title}</h2>
                <div className="exercise-tags">
                  <span className={`exercise-tag ${
                    exercise.level === 'beginner' ? 'tag-beginner' :
                    exercise.level === 'intermediate' ? 'tag-intermediate' :
                    'tag-advanced'
                  }`}>
                    {getLevelLabel(exercise.level)}
                  </span>
                  <span className={`exercise-tag ${
                    exercise.type === 'fill-in-blanks' ? 'tag-fill-in-blanks' :
                    exercise.type === 'sentence-ordering' ? 'tag-sentence-ordering' :
                    'tag-character-writing'
                  }`}>
                    {getTypeLabel(exercise.type)}
                  </span>
                </div>
                <p className="exercise-instructions">{exercise.instructions}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="exercise-detail-container">
          <button 
            onClick={handleBackClick}
            className="back-button"
          >
            ← Вернуться к списку упражнений
          </button>
          
          <div className="exercise-detail-header">
            <h1 className="exercise-detail-title">{selectedExercise.title}</h1>
            <div className="exercise-tags">
              <span className={`exercise-tag ${
                selectedExercise.level === 'beginner' ? 'tag-beginner' :
                selectedExercise.level === 'intermediate' ? 'tag-intermediate' :
                'tag-advanced'
              }`}>
                {getLevelLabel(selectedExercise.level)}
              </span>
              <span className={`exercise-tag ${
                selectedExercise.type === 'fill-in-blanks' ? 'tag-fill-in-blanks' :
                selectedExercise.type === 'sentence-ordering' ? 'tag-sentence-ordering' :
                'tag-character-writing'
              }`}>
                {getTypeLabel(selectedExercise.type)}
              </span>
            </div>
          </div>
          
          <p className="exercise-instructions-text">{selectedExercise.instructions}</p>
          
          {selectedExercise.type === 'fill-in-blanks' && (
            <div className="fill-in-blank-container">
              {selectedExercise.content.sentences.map((sentence, index) => (
                <div key={index} className="fill-in-blank-item">
                  <div className="fill-in-blank-sentence">
                    <span>{sentence.text.replace('___', '______')}</span>
                    {isSubmitted && (
                      checkFillInBlankAnswer(index) ? (
                        <CheckCircle className="icon-correct" />
                      ) : (
                        <X className="icon-incorrect" />
                      )
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      className={`fill-in-blank-input ${
                        isSubmitted && !checkFillInBlankAnswer(index) ? 'incorrect' : ''
                      }`}
                      placeholder="Введите ответ"
                      value={userAnswers[index] || ''}
                      onChange={(e) => handleFillInBlankChange(index, e.target.value)}
                      readOnly={isSubmitted}
                    />
                    {isSubmitted && !checkFillInBlankAnswer(index) && showHint && (
                      <span className="hint-text">Правильный ответ: {sentence.answer}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {selectedExercise.type === 'sentence-ordering' && (
            <div className="sentence-ordering-list">
              {userAnswers.map((sentenceId, index) => {
                const sentence = selectedExercise.content.sentences.find(
                  s => s.id.toString() === sentenceId
                );
                return (
                  <div
                    key={index}
                    className={`sentence-item ${
                      isSubmitted 
                        ? sentenceId === selectedExercise.content.correctOrder[index].toString()
                          ? 'correct'
                          : 'incorrect'
                        : ''
                    }`}
                  >
                    <span className="sentence-text">{sentence?.text}</span>
                    <div className="sentence-controls">
                      {!isSubmitted && (
                        <>
                          <button
                            onClick={() => index > 0 && handleReorderSentence(index, index - 1)}
                            disabled={index === 0}
                            className="sentence-button"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => index < userAnswers.length - 1 && handleReorderSentence(index, index + 1)}
                            disabled={index === userAnswers.length - 1}
                            className="sentence-button"
                          >
                            ↓
                          </button>
                        </>
                      )}
                      {isSubmitted && (
                        sentenceId === selectedExercise.content.correctOrder[index].toString() ? (
                          <CheckCircle className="icon-correct" />
                        ) : (
                          <X className="icon-incorrect" />
                        )
                      )}
                    </div>
                  </div>
                );
              })}
              
              {isSubmitted && (
                <div className={`feedback-message ${
                  checkSentenceOrderAnswer() ? 'feedback-correct' : 'feedback-incorrect'
                }`}>
                  {checkSentenceOrderAnswer() 
                    ? 'Отлично! Порядок предложений верный.' 
                    : 'Порядок предложений неверный. Попробуйте еще раз.'}
                </div>
              )}
            </div>
          )}
          
          {selectedExercise.type === 'character-writing' && (
            <div className="character-grid">
              {selectedExercise.content.characters.map((char, index) => (
                <div key={index} className="character-card">
                  <span className="character-display">{char.character}</span>
                  <div className="character-input-container">
                    <label className="character-label">Введите пиньинь:</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        className={`character-input ${
                          isSubmitted && !checkCharacterWritingAnswer(index) ? 'incorrect' : ''
                        }`}
                        placeholder="Например: nǐ"
                        value={userAnswers[index] || ''}
                        onChange={(e) => handleCharacterInputChange(index, e.target.value)}
                        readOnly={isSubmitted}
                      />
                      {isSubmitted && (
                        checkCharacterWritingAnswer(index) ? (
                          <CheckCircle className="icon-correct" />
                        ) : (
                          <X className="icon-incorrect" />
                        )
                      )}
                    </div>
                    {isSubmitted && !checkCharacterWritingAnswer(index) && showHint && (
                      <p className="hint-text">Правильный ответ: {char.pinyin}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="actions-container">
            <div>
              {isSubmitted && (
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="hint-button"
                >
                  <HelpCircle size={20} />
                  {showHint ? 'Скрыть подсказки' : 'Показать подсказки'}
                </button>
              )}
            </div>
            <div className="flex gap-3">
              {isSubmitted ? (
                <button
                  onClick={handleReset}
                  className="submit-button"
                >
                  Начать заново
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="submit-button"
                >
                  Проверить ответы
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Exercises;