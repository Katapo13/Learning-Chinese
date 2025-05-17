const jwt = require ('jsonwebtoken') //для токена
const {secret} = require('../config'); //секретный ключ токена
module.exports = function (req, res, next){
    if(req.method === "OPTIONS"){
        next()
    }

    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(403).json({message:"This user is not authorized"}) 
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    }catch(e){
        console.log(e)
        return res.status(403).json({message:"This user is not authorized"})
    }
};