import { useState,useEffect } from 'react';
import './css/Texts.css';
import { FileText } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import getLevelLabel from '../contexts/levelContext';

const Texts = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedText, setSelectedText] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

// Загрузка текстов из бэка
  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/text');
        const data = await response.json();
        setTexts(data);
        setLoading(false);
      } catch (e) {
        console.error('Ошибка загрузки текстов:', e);
        setError('Не удалось загрузить тексты');
        setLoading(false);
      }
    };
    
    fetchTexts();
  }, []);

  const filteredTexts = selectedLevel === 'all' 
    ? texts 
    : texts.filter(text => text.level === selectedLevel);

  const handleTextClick = (text) => {
    setSelectedText(text);
    setShowTranslation(false);
  };

  const handleBackClick = () => {
    setSelectedText(null);
  };

  return (
    <div>
      <Header/>
      <div className="texts-container">
        {!selectedText ? (
          <>
            <div className="texts-header">
              <h1>
                <FileText size={32} />
                Тексты
              </h1>
              <div>
                <select
                  className="select-input"
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

            <div className="texts-grid">
            {error && <p style={{ color: 'red' }}>{error}</p>}
              {filteredTexts.map(text => (
                <div 
                  key={text._id} 
                  className="text-card" 
                  onClick={() => handleTextClick(text)}
                >
                  <h2 className="text-card-title">{text.title}</h2>
                  <div className={`text-level ${
                    text.level === 'beginner' ? 'level-beginner' :
                    text.level === 'intermediate' ? 'level-intermediate' :
                    'level-advanced'
                  }`}>
                    {getLevelLabel(text.level)}
                  </div>
                  <p className="text-preview">
                    {text.content.substring(0, 100)}...
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-detail-container">
            <button 
              onClick={handleBackClick}
              className="back-button"
            >
              ← Вернуться к списку текстов
            </button>
            
            <div className="text-detail-header">
              <h1 className="text-detail-title">{selectedText.title}</h1>
              <span className={`text-level ${
                selectedText.level === 'beginner' ? 'level-beginner' :
                selectedText.level === 'intermediate' ? 'level-intermediate' :
                'level-advanced'
              }`}>
                {getLevelLabel(selectedText.level)}
              </span>
            </div>
            
            <div className="text-content">
              {selectedText.content.split('\n').map((paragraph, index) => (
                <p key={index} className="whitespace-pre-line">{paragraph}</p>
              ))}
            </div>
            
            <div className="translation-button">
              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className="btn btn-outline"
              >
                {showTranslation ? 'Скрыть перевод' : 'Показать перевод'}
              </button>
            </div>
            
            {showTranslation && (
              <div className="translation-container">
                <h3 className="translation-title">Перевод:</h3>
                {selectedText.translation.split('\n').map((paragraph, index) => (
                  <p key={index} className="whitespace-pre-line">{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Texts;