import { useState, useEffect } from 'react';
import { Search, Filter, ArrowDown, ArrowUp, Plus } from 'lucide-react';
import { useDictionary,  DictionaryProvider} from '../contexts/DictionaryContext';
import { useAuth } from '../contexts/AuthContext';
import './css/Dictionary.css';

const Dictionary = () => {
  const { words, addWord, searchWords, filterWordsByTopic, filterWordsByPartOfSpeech, sortWordsByPinyin } = useDictionary();
  const { user } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState('all');
  const [sortDirection, setSortDirection] = useState('asc'); // Убрали TypeScript аннотацию
  const [filteredWords, setFilteredWords] = useState(words);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWord, setNewWord] = useState({
    chinese: '',
    pinyin: '',
    translation: '',
    partOfSpeech: '',
    topic: ''
  });
  const topics = [
    { value: 'all', label: 'Все темы' },
    { value: 'greetings', label: 'Приветствия' },
    { value: 'education', label: 'Образование' },
    { value: 'food', label: 'Еда' },
    { value: 'geography', label: 'География' },
    { value: 'relationships', label: 'Отношения' }
  ];
  
  const partsOfSpeech = [
    { value: 'all', label: 'Все части речи' },
    { value: 'noun', label: 'Существительное' },
    { value: 'verb', label: 'Глагол' },
    { value: 'adjective', label: 'Прилагательное' },
    { value: 'adverb', label: 'Наречие' },
    { value: 'phrase', label: 'Фраза' }
  ];

  useEffect(() => {
    let result = words;
    
    if (searchQuery) {
      result = searchWords(searchQuery);
    }
    
    if (selectedTopic !== 'all') {
      result = filterWordsByTopic(selectedTopic);
    }
    
    if (selectedPartOfSpeech !== 'all') {
      result = filterWordsByPartOfSpeech(selectedPartOfSpeech);
    }
    
    result = sortWordsByPinyin();
    
    if (sortDirection === 'desc') {
      result = [...result].reverse();
    }
    
    setFilteredWords(result);
  }, [words, searchQuery, selectedTopic, selectedPartOfSpeech, sortDirection, searchWords, filterWordsByTopic, filterWordsByPartOfSpeech, sortWordsByPinyin]);

  const handleAddWord = () => {
    if (!newWord.chinese || !newWord.pinyin || !newWord.translation || !newWord.partOfSpeech || !newWord.topic) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
    addWord(newWord);
    setNewWord({
      chinese: '',
      pinyin: '',
      translation: '',
      partOfSpeech: '',
      topic: ''
    });
    setShowAddForm(false);
  };

  const getTopicLabel = (value) => {
    const topic = topics.find(t => t.value === value);
    return topic ? topic.label : value;
  };

  const getPartOfSpeechLabel = (value) => {
    const pos = partsOfSpeech.find(p => p.value === value);
    return pos ? pos.label : value;
  };

  return (
    <div className="dictionary-container">
      <div className="dictionary-header">
        <h1 className="dictionary-title">Китайский словарь</h1>
        {user && (
          <button 
            onClick={() => setShowAddForm(!showAddForm)} 
            className="add-word-btn"
          >
            <Plus className="add-word-icon" />
            Добавить слово
          </button>
        )}
      </div>

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
  );
};

export default Dictionary;