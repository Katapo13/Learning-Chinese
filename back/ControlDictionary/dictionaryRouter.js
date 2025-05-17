//файл для прослушки запросов

const Router = require('express')

const router = new Router ()
const controller = require('./dictionaryController')

router.get('/dictionary', controller.getWords)

module.exports = router
