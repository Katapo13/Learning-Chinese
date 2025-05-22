import { useState, useEffect } from 'react';
import { CheckCircle, X, HelpCircle } from 'lucide-react';
import { List } from 'lucide-react'; // Иконка списка
import { useAuth } from '../contexts/AuthContext';
import getLevelLabel from '../contexts/levelContext';
import getTypeLabel from '../contexts/typeExerciseContext';
import './css/Exercises.css';
import Header from '../components/Header'; // Компонент шапки
import Footer from '../components/Footer'; // Компонент футера


const Exercises = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [userAnswers, setUserAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    //получаем тесты с бд
    useEffect(() => {
      const fetchExercises = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/exercise');
          const data = await response.json();
          setExercises(data);
          setLoading(false);
        } catch (e) {
          console.error('Ошибка загрузки тестов:', e);
          setError('Не удалось загрузить тесты');
          setLoading(false);
        }
      };
      
      fetchExercises();
    }, []);



   const allExercises = exercises;
  
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
        .map(s => (s && s.id !== undefined ? s.id.toString() : ''))

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
    
    // if (user && selectedExercise) {
    //   const updatedCompletedLessons = [...(user.progress?.completedLessons || [])];
    //   if (!updatedCompletedLessons.includes(selectedExercise.id)) {
    //     updatedCompletedLessons.push(selectedExercise.id);
    //     updateUser({
    //       progress: {
    //         ...user.progress,
    //         completedLessons: updatedCompletedLessons
    //       }
    //     });
    //   }
    // }
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


  return (
    <div>
      <Header/>
    <div className="exercises-container">
    
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
                key={exercise._id} 
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
                <p className="exercise-instructions">{exercise.information}</p>
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

                {/*блок с подсказками */}
                {isSubmitted && !checkSentenceOrderAnswer() && showHint && (
                <div className="hint-section">
                    <h4>Правильный порядок:</h4>
                    <ol>
                    {selectedExercise.content.correctOrder.map(id => {
                        const sentence = selectedExercise.content.sentences.find(s => s.id === id);
                        return <li key={id}>{sentence.text}</li>;
                    })}
                    </ol>
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
      
    </div>
    <Footer/>
    </div>
  );
};

export default Exercises;