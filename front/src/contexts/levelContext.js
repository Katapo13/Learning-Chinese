const getLevelLabel = (level) => {
    switch (level) {
      case 'beginner': return 'Начальный';
      case 'intermediate': return 'Средний';
      case 'advanced': return 'Продвинутый';
      default: return level;
    }
  };

export default getLevelLabel