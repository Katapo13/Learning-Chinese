const {Schema, model} = require ('mongoose')

const Level = new Schema({
    
    level: {type: String, required: true, unique: true}
   
})

module.exports = model ('Level', Level)