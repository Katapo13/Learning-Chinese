import { useState, useEffect } from 'react';
import { Search, Filter, ArrowDown, ArrowUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Book } from 'lucide-react';
import topics from '../contexts/topicContext';
import partsOfSpeech from '../contexts/partOfSpeachContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/Dictionary.css';


const Dictionary = () => {
  const { user } = useAuth();
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Состояния для фильтрации и сортировки
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState('all');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filteredWords, setFilteredWords] = useState([]);
  
  // Состояния для формы добавления 
  /*
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWord, setNewWord] = useState({
    chinese: '',
    pinyin: '',
    translation: '',
    partOfSpeech: '',
    topic: ''
  });
  */
  
  // Загрузка слов из бэка
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dictionary');
        const data = await response.json();
        setWords(data);
        setLoading(false);
      } catch (e) {
        console.error('Ошибка загрузки слов:', e);
        setError('Не удалось загрузить слова');
        setLoading(false);
      }
    };
    
    fetchWords();
  }, []);

  // Фильтрация и сортировка слов
  useEffect(() => {
    let result = [...words];
    
    // Поиск
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(word => 
        word.chinese.toLowerCase().includes(query) || 
        word.pinyin.toLowerCase().includes(query) || 
        word.translation.toLowerCase().includes(query))
    }
    
    // Фильтрация по теме
    if (selectedTopic !== 'all') {
      result = result.filter(word => word.topic === selectedTopic);
    }
    
    // Фильтрация по части речи
    if (selectedPartOfSpeech !== 'all') {
      result = result.filter(word => word.partOfSpeech === selectedPartOfSpeech);
    }
    
    // Сортировка по пиньиню
    result.sort((a, b) => a.pinyin.localeCompare(b.pinyin));
    
    // Обратная сортировка
    if (sortDirection === 'desc') {
      result.reverse();
    }
    
    setFilteredWords(result);
  }, [words, searchQuery, selectedTopic, selectedPartOfSpeech, sortDirection]);

  // Добавление нового слова (закомментировано)
  /*
  const handleAddWord = async () => {
    if (!newWord.chinese || !newWord.pinyin || !newWord.translation || !newWord.partOfSpeech || !newWord.topic) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
      const addedWord = {
        ...newWord,
        id: Date.now() // Временный ID
      };
      
      setWords(prev => [...prev, addedWord]);
      setNewWord({
        chinese: '',
        pinyin: '',
        translation: '',
        partOfSpeech: '',
        topic: ''
      });
  };
  */

  // Вспомогательные функции для отображения
  const getTopicLabel = (value) => {
    const topic = topics.find(t => t.value === value);
    return topic ? topic.label : value;
  };

  const getPartOfSpeechLabel = (value) => {
    const pos = partsOfSpeech.find(p => p.value === value);
    return pos ? pos.label : value;
  };

  return (
    <div>
      <Header/>
      <div className="dictionary-container">
        <div className="dictionary-header">
          <h1 className="dictionary-title">
            <Book size={32} />
            Китайский словарь
          </h1>
          {/* Кнопка добавления слова (закомментировано) 
          {user && (
            <button 
              onClick={() => setShowAddForm(!showAddForm)} 
              className="add-word-btn"
            >
              <Plus className="add-word-icon" />
              Добавить слово
            </button>
          )}
          */}
        </div>

        {/* Форма добавления слова (закомментировано)
        {showAddForm && (
          <div className="card add-form">
            <h2 className="add-form-title">Добавить новое слово</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="label">Иероглиф</label>
                <input
                  type="text"
                  className="input"
                  value={newWord.chinese}
                  onChange={(e) => setNewWord({...newWord, chinese: e.target.value})}
                  placeholder="Например: 你好"
                />
              </div>
              <div className="form-group">
                <label className="label">Пиньинь</label>
                <input
                  type="text"
                  className="input"
                  value={newWord.pinyin}
                  onChange={(e) => setNewWord({...newWord, pinyin: e.target.value})}
                  placeholder="Например: nǐ hǎo"
                />
              </div>
              <div className="form-group">
                <label className="label">Перевод</label>
                <input
                  type="text"
                  className="input"
                  value={newWord.translation}
                  onChange={(e) => setNewWord({...newWord, translation: e.target.value})}
                  placeholder="Например: привет"
                />
              </div>
              <div className="form-group">
                <label className="label">Часть речи</label>
                <select
                  className="input"
                  value={newWord.partOfSpeech}
                  onChange={(e) => setNewWord({...newWord, partOfSpeech: e.target.value})}
                >
                  <option value="">Выберите часть речи</option>
                  {partsOfSpeech.filter(pos => pos.value !== 'all').map(pos => (
                    <option key={pos.value} value={pos.value}>{pos.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="label">Тема</label>
                <select
                  className="input"
                  value={newWord.topic}
                  onChange={(e) => setNewWord({...newWord, topic: e.target.value})}
                >
                  <option value="">Выберите тему</option>
                  {topics.filter(topic => topic.value !== 'all').map(topic => (
                    <option key={topic.value} value={topic.value}>{topic.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button onClick={() => setShowAddForm(false)} className="btn btn-outline">
                Отмена
              </button>
              <button onClick={handleAddWord} className="btn btn-primary">
                Добавить
              </button>
            </div>
          </div>
        )}
        */}

        <div className="card">
          <div className="search-filter-container">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Поиск слов..."
                className="input search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="filters-container">
              <div className="filter-group">
                <Filter className="filter-icon" />
                <select
                  className="input filter-select"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                >
                  {topics.map(topic => (
                    <option key={topic.value} value={topic.value}>
                      {topic.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group">
                <Filter className="filter-icon" />
                <select
                  className="input filter-select"
                  value={selectedPartOfSpeech}
                  onChange={(e) => setSelectedPartOfSpeech(e.target.value)}
                >
                  {partsOfSpeech.map(pos => (
                    <option key={pos.value} value={pos.value}>
                      {pos.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                className="btn btn-outline sort-btn"
              >
                Сортировка
                {sortDirection === 'asc' ? (
                  <ArrowDown className="sort-icon" />
                ) : (
                  <ArrowUp className="sort-icon" />
                )}
              </button>
            </div>
          </div>

          {filteredWords.length === 0 ? (
            <div className="empty-state">
              <p>Слова не найдены</p>
            </div>
          ) : (
            <div className="words-grid">
              {filteredWords.map((word) => (
                <div key={word._id} className="word-card">
                  <div className="word-chinese">{word.chinese}</div>
                  <div className="word-pinyin">{word.pinyin}</div>
                  <div className="word-translation">{word.translation}</div>
                  <div className="word-meta">
                    <span>{getPartOfSpeechLabel(word.partOfSpeech)}</span>
                    <span>{getTopicLabel(word.topic)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Dictionary;