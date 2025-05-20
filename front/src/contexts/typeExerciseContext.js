const getTypeLabel = (type) => {
    switch (type) {
      case 'fill-in-blanks': return 'Заполнение пробелов';
      case 'sentence-ordering': return 'Порядок предложений';
      case 'character-writing': return 'Написание иероглифов';
      default: return type;
    }
  };

  export default getTypeLabel
