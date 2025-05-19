const {Schema, model} = require ('mongoose')

const Word = new Schema({
    chinese: {type: String, required: true},
    pinyin: {type: String, required: true},
    translation: {type: String, required: true},
    partOfSpeech: {type: String, required: true},
    topic: {type: String, required: true}
})

module.exports = model ('Word', Word)