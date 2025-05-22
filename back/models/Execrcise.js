const {Schema, model} = require ('mongoose')

// Схемы для content разных типов
const characterWriting = new Schema({
  characters: [
    {
      character: { type: String, required: true },
      pinyin: { type: String, required: true },
    }
  ]
}, { _id: false });

const sentenceOrdering = new Schema({
  sentences: [{
    id: { type: Number, required: true },
    text: { type: String, required: true }
  }],
  correctOrder: [{ type: Number, required: true }]
}, { _id: false });

const fillInBlanks = new Schema({
  sentences: [
    {
      text: { type: String, required: true },
      answer: { type: String, required: true }
    }
  ]
}, { _id: false });

// Главная схема упражнения
const Exercise = new Schema({
  type: {type: String,  
        required: true
  },
  title: { type: String, required: true },
  level: {type: String, required: true},
  information: {type: String, required: true},
  content: {type: Schema.Types.Mixed, required: true }
});

// Подключение моделей с дополнительной валидацией по типу упражнения
Exercise.pre('save', function (next) {
  const { type, content } = this;

  let valid = false;

  switch (type) {
    case 'character-writing':
      valid = characterWriting.validateSync(content) == null;
      break;
    case 'sentence-ordering':
      valid = sentenceOrdering.validateSync(content) == null;
      break;
    case 'fill-in-blanks':
      valid = fillInBlanks.validateSync(content) == null;
      break;
    default:
      valid = false;
  }

  if (!valid) return next(new Error('Invalid content for type: ' + type));
  next();
});

module.exports = model('Exercise', Exercise);