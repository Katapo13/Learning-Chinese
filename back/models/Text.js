const {Schema, model} = require ('mongoose')

const Text = new Schema({
    title: {type: String, unique: true, required: true},
    content: {type: String, unique: true, required: true},
    level: { type: String, required: true},
    translatation: {type: String, required: true}
    
})

module.exports = model ('Text', Text)