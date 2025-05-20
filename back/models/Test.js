const {Schema, model} = require ('mongoose')

const questions = new Schema({
    question: {type: String, required: true},
    options: [{type: String, required: true}],
    correctAnswer: Number
})
const Test = new Schema({
    title: {type: String, unique: true, required: true},
    description: {type: String, required: true},
    level: { type: String, required: true},
    questions: [questions],
    duration: {type: String, required: true}
    
})

module.exports = model ('Test', Test)