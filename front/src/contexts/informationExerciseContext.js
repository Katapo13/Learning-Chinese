const getInformationLabel = (type) => {
    switch (type) {
      case 'fill-in-blanks': return 'Заполните пропуски правильными словами';
      case 'sentence-ordering': return 'Расположите предложения в правильном порядке';
      case 'character-writing': return 'Введите пиньинь для следующих иероглифов';
      default: return type;
    }
  };

  export default getInformationLabel
