const {Schema, model} = require ('mongoose')

const Text = new Schema({
    title: {type: String, unique: true, required: true},
    content: {type: String, unique: true, required: true},
    roles: { type: String, ref: 'Level'},
    translatation: {type: String, required: true}
    
})

module.exports = model ('Text', Text)