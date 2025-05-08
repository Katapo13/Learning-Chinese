import { createContext, useContext, useState, useCallback } from 'react';

// Создаем контекст
const DictionaryContext = createContext();

// Начальные данные словаря
const initialWords = [
  {
    id: '1',
    chinese: '你好',
    pinyin: 'nǐ hǎo',
    translation: 'привет',
    partOfSpeech: 'phrase',
    topic: 'greetings'
  },
  {
    id: '2',
    chinese: '谢谢',
    pinyin: 'xiè xiè',
    translation: 'спасибо',
    partOfSpeech: 'phrase',
    topic: 'greetings'
  },
  {
    id: '3',
    chinese: '学习',
    pinyin: 'xué xí',
    translation: 'учиться',
    partOfSpeech: 'verb',
    topic: 'education'
  },
  {
    id: '4',
    chinese: '语言',
    pinyin: 'yǔ yán',
    translation: 'язык',
    partOfSpeech: 'noun',
    topic: 'education'
  },
  {
    id: '5',
    chinese: '中国',
    pinyin: 'zhōng guó',
    translation: 'Китай',
    partOfSpeech: 'noun',
    topic: 'geography'
  },
  {
    id: '6',
    chinese: '朋友',
    pinyin: 'péng yǒu',
    translation: 'друг',
    partOfSpeech: 'noun',
    topic: 'relationships'
  },
  {
    id: '7',
    chinese: '吃',
    pinyin: 'chī',
    translation: 'кушать',
    partOfSpeech: 'verb',
    topic: 'food'
  },
  {
    id: '8',
    chinese: '喝',
    pinyin: 'hē',
    translation: 'пить',
    partOfSpeech: 'verb',
    topic: 'food'
  }
];

// Провайдер контекста
export const DictionaryProvider = ({ children }) => {
  const [words, setWords] = useState(initialWords);

  // Добавление слова
  const addWord = useCallback((word) => {
    const newWord = {
      id: Date.now().toString(),
      ...word
    };
    setWords(prev => [...prev, newWord]);
  }, []);

  // Удаление слова
  const removeWord = useCallback((id) => {
    setWords(prev => prev.filter(word => word.id !== id));
  }, []);

  // Поиск слов
  const searchWords = useCallback((query) => {
    if (!query.trim()) return words;
    
    const lowerQuery = query.toLowerCase();
    return words.filter(word => 
      word.chinese.includes(query) || 
      word.pinyin.toLowerCase().includes(lowerQuery) || 
      word.translation.toLowerCase().includes(lowerQuery)
    );
  }, [words]);

  // Фильтрация по теме
  const filterWordsByTopic = useCallback((topic) => {
    return topic === 'all' ? words : words.filter(word => word.topic === topic);
  }, [words]);

  // Фильтрация по части речи
  const filterWordsByPartOfSpeech = useCallback((partOfSpeech) => {
    return partOfSpeech === 'all' ? words : words.filter(word => word.partOfSpeech === partOfSpeech);
  }, [words]);

  // Сортировка по пиньиню
  const sortWordsByPinyin = useCallback(() => {
    return [...words].sort((a, b) => a.pinyin.localeCompare(b.pinyin));
  }, [words]);

  // Значение контекста
  const contextValue = {
    words,
    addWord,
    removeWord,
    searchWords,
    filterWordsByTopic,
    filterWordsByPartOfSpeech,
    sortWordsByPinyin
  };

  return (
    <DictionaryContext.Provider value={contextValue}>
      {children}
    </DictionaryContext.Provider>
  );
};

// Хук для использования контекста
export const useDictionary = () => {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }
  return context;
};