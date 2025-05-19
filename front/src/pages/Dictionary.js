import { useState, useEffect } from 'react';
import { Search, Filter, ArrowDown, ArrowUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Book } from 'lucide-react';
import './css/Dictionary.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
  
  // Состояния для формы добавления (закомментировано)
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

  // Темы и части речи
  const topics = [
    { value: 'all', label: 'Все темы' },
    { value: 'greetings', label: 'Приветствия' },
    { value: 'education', label: 'Образование' },
    { value: 'food', label: 'Еда' },
    { value: 'geography', label: 'География' },
    { value: 'relationships', label: 'Отношения' },
    { value: 'family', label: 'Семья' },
  ];
  
  const partsOfSpeech = [
    { value: 'all', label: 'Все части речи' },
    { value: 'noun', label: 'Существительное' },
    { value: 'verb', label: 'Глагол' },
    { value: 'adjective', label: 'Прилагательное' },
    { value: 'adverb', label: 'Наречие' },
    { value: 'phrase', label: 'Фраза' }
  ];

  // Загрузка слов при монтировании компонента
  useEffect(() => {
    const fetchWords = async () => {
        setTimeout(() => {
          const mockWords = [
            { id: 1, chinese: '你好', pinyin: 'nǐ hǎo', translation: 'привет', partOfSpeech: 'phrase', topic: 'greetings' },
            { id: 2, chinese: '谢谢', pinyin: 'xiè xie', translation: 'спасибо', partOfSpeech: 'phrase', topic: 'greetings' },
            { id: 3, chinese: '学校', pinyin: 'xué xiào', translation: 'школа', partOfSpeech: 'noun', topic: 'education' },
            { id: 4, chinese: '美', pinyin: 'Měi', translation: 'красивый', partOfSpeech: 'adjective', topic: 'relationships' },
            { id: 5, chinese: '爱', pinyin: 'Ài', translation: 'любовь', partOfSpeech: 'noun', topic: 'relationships' },
            { id: 6, chinese: '苹果', pinyin: 'Píngguǒ', translation: 'яблоко', partOfSpeech: 'noun', topic: 'food' },
            { id: 7, chinese: '老师', pinyin: 'Lǎoshī', translation: 'учитель', partOfSpeech: 'noun', topic: 'education' },
            { id: 8, chinese: '吃', pinyin: 'Chī', translation: 'кушать', partOfSpeech: 'verb', topic: 'Kěkǒu' },
            { id: 9, chinese: '飞机', pinyin: 'Fēijī', translation: 'самолёт', partOfSpeech: 'noun', topic: 'geography' },
            { id: 10, chinese: '中国', pinyin: 'Zhōngguó', translation: 'Китай', partOfSpeech: 'noun', topic: 'geography' },
            { id: 11, chinese: '朋友', pinyin: 'Péngyǒu', translation: 'друг', partOfSpeech: 'noun', topic: 'relationships' },
            { id: 12, chinese: '我爱你', pinyin: 'wǒ ài nǐ', translation: 'я люблю тебя', partOfSpeech: 'phrase', topic: 'relationships' },
            { id: 13, chinese: '爸爸', pinyin: 'Bàba', translation: 'папа', partOfSpeech: 'noun', topic: 'family' },
            { id: 14, chinese: '妈妈', pinyin: 'Māmā', translation: 'мама', partOfSpeech: 'noun', topic: 'family' },
            { id: 15, chinese: '汤', pinyin: 'Tāng', translation: 'суп', partOfSpeech: 'noun', topic: 'food' },
            { id: 16, chinese: '可口', pinyin: 'Kěkǒu', translation: 'вкусный', partOfSpeech: 'adjective', topic: 'Kěkǒu' },
            { id: 17, chinese: '等', pinyin: 'Děng', translation: 'ждать', partOfSpeech: 'verb', topic: 'relationships' }

          ];
          setWords(mockWords);
          setLoading(false);
        }, 500);
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
                <div key={word.id} className="word-card">
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