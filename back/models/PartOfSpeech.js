const {Schema, model} = require ('mongoose')

const PartOfSpeech = new Schema({
    
    name: {type: String, required: true, unique: true}
   
})

module.exports = model ('PartOfSpeech', PartOfSpeech)