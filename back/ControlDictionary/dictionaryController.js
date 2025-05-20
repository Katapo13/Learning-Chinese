const Word = require('../models/Word');

class dictionaryController{

    async getWords(req, res){
        try{
            const words = await Word.find();
            res.json(words);
        }catch(e){
            console.log(e);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new dictionaryController();