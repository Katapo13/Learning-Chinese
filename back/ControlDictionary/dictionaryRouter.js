//файл для прослушки запросов

const Router = require('express')

const router = new Router ()
const controller = require('./dictionaryController')

//путь по которому будет слушаться гет запрос

router.get('/dictionary', controller.getWords)  
module.exports = router
