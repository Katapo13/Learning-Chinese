const Exercise = require('../models/Execrcise');

class exerciseController{

    async getExercises(req, res){
        try{
            const exercises = await Exercise.find();
            res.json(exercises);
        }catch(e){
            console.log(e);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new exerciseController();