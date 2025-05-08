import { useState } from 'react';
//import { useDictionary } from '../contexts/DictionaryContext';
import './css/Texts.css';
import { FileText } from 'lucide-react'; // Иконка для заголовка
import Header from '../components/Header'; // Компонент шапки
import Footer from '../components/Footer'; // Компонент футера

const Texts = () => {
 // const { words } = useDictionary();
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedText, setSelectedText] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);

  // Sample texts
  const texts = [
    {
      id: 'text-1',
      title: 'Самопредставление',
      content: '你好！我叫小明。我是中国人。我今年二十岁。我是大学生。我学习汉语和英语。我喜欢读书和听音乐。很高兴认识你！',
      level: 'beginner',
      translation: 'Привет! Меня зовут Сяо Мин. Я китаец. Мне 20 лет. Я студент университета. Я изучаю китайский и английский языки. Мне нравится читать книги и слушать музыку. Рад познакомиться с тобой!',
      keywords: ['你好', '中国', '学习', '喜欢']
    },
    {
      id: 'text-2',
      title: 'В ресторане',
      content: '服务员：欢迎光临，请问几位？\n顾客：两位。\n服务员：请跟我来。请坐。这是菜单。\n顾客：谢谢。我要一碗牛肉面和一杯茶。\n服务员：好的，请稍等。',
      level: 'beginner',
      translation: 'Официант: Добро пожаловать, сколько человек?\nКлиент: Двое.\nОфициант: Пожалуйста, следуйте за мной. Присаживайтесь. Вот меню.\nКлиент: Спасибо. Я хочу миску лапши с говядиной и чашку чая.\nОфициант: Хорошо, пожалуйста, подождите немного.',
      keywords: ['服务员', '菜单', '牛肉面', '茶']
    },
    {
      id: 'text-3',
      title: 'Традиционные китайские праздники',
      content: '中国有很多传统节日。春节是中国最重要的节日，人们会贴春联、吃饺子、看春晚。中秋节的时候，家人团聚，一起吃月饼、赏月。端午节，人们包粽子、赛龙舟，纪念诗人屈原。这些节日都有着悠久的历史和丰富的文化内涵。',
      level: 'intermediate',
      translation: 'В Китае много традиционных праздников. Весенний фестиваль (Китайский Новый год) - самый важный праздник в Китае. Люди вешают парные надписи, едят пельмени и смотрят новогодний гала-концерт. Во время Праздника середины осени семьи собираются вместе, едят лунные пряники и любуются луной. На Праздник драконьих лодок люди заворачивают клейкий рис и проводят гонки на лодках-драконах в память о поэте Цюй Юане. Все эти праздники имеют долгую историю и богатое культурное содержание.',
      keywords: ['传统', '春节', '中秋节', '端午节']
    },
    {
      id: 'text-4',
      title: 'Преимущества изучения нового языка',
      content: '学习一门新语言有很多好处。首先，它可以帮助你更好地了解不同的文化和思维方式。其次，掌握多种语言可以提高你的就业竞争力。研究表明，学习新语言还能锻炼大脑，延缓认知衰退。此外，当你旅行到国外时，会说当地语言可以让你的旅行体验更加丰富和便利。最重要的是，学习新语言是一个不断挑战自我、拓展视野的过程。',
      level: 'advanced',
      translation: 'Есть много преимуществ в изучении нового языка. Во-первых, это помогает лучше понять разные культуры и образы мышления. Во-вторых, владение несколькими языками может повысить вашу конкурентоспособность при трудоустройстве. Исследования показывают, что изучение нового языка также тренирует мозг и замедляет когнитивное снижение. Кроме того, когда вы путешествуете за границу, владение местным языком делает ваше путешествие более насыщенным и удобным. Самое главное, изучение нового языка - это процесс постоянного вызова самому себе и расширения кругозора.',
      keywords: ['语言', '学习', '文化', '旅行']
    }
  ];

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

  {/*const highlightKeywords = (content) => {
    if (!selectedText) return content;

    let highlightedContent = content;
   // const dictionaryWords = words.map(word => word.chinese);
    //const allKeywords = [...new Set([...dictionaryWords, ...selectedText.keywords])];
    //allKeywords.sort((a, b) => b.length - a.length);
    
    allKeywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'g');
      highlightedContent = highlightedContent.replace(
        regex, 
        `<span class="highlighted-word">${keyword}</span>`
      );
    });

    return highlightedContent;
   };*/}

  const getLevelLabel = (level) => {
    switch (level) {
      case 'beginner': return 'Начальный';
      case 'intermediate': return 'Средний';
      case 'advanced': return 'Продвинутый';
      default: return level;
    }
  };

  return (
    <div>
        <Header/>
      <div className="texts-container">
            {!selectedText ? (
            <>
            <div className="texts-header">
                <h1>
                    <FileText size={32} /> {/* Иконка "галочка в квадрате" */}
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
                {filteredTexts.map(text => (
                <div 
                    key={text.id} 
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
            
            {/*<div className="text-content" dangerouslySetInnerHTML={{ 
                __html: highlightKeywords(selectedText.content) 
            }} />
            
            <div className="translation-button">
                <button
                onClick={() => setShowTranslation(!showTranslation)}
                className="btn btn-outline"
                >
                {showTranslation ? 'Скрыть перевод' : 'Показать перевод'}
                </button>
            </div>*/}
            
            {showTranslation && (
                <div className="translation-container">
                <h3 className="translation-title">Перевод:</h3>
                <p className="whitespace-pre-line">{selectedText.translation}</p>
                </div>
            )}
            
            {/*<div className="keywords-container">
                <h3 className="keywords-title">Ключевые слова:</h3>
                <div className="keywords-list">
                {selectedText.keywords.map((keyword, index) => (
                    <span key={index} className="keyword">
                    {keyword}
                    </span>
                ))}
                </div>
            </div>*/}
            </div>
        )}
        </div>
        <Footer/>
    </div>
  );
};

export default Texts;