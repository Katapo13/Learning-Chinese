const Text = require('../models/Text');

class textController{

    async getTexts(req, res){
        try{
            const texts = await Text.find();
            res.json(texts);
        }catch(e){
            console.log(e);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new textController();