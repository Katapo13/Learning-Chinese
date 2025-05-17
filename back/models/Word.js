const {Schema, model} = require ('mongoose')

const Word = new Schema({
    chinese: {type: String, unique: true, required: true},
    pinyin: {type: String, required: true},
    translation: {type: String, required: true},
    partOfSpeech: {type: String, ref: 'PartOfSpeech'},
    topic: {type: String, ref: 'Topic'}
})

module.exports = model ('Word', Word)