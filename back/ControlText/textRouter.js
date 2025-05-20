//файл для прослушки запросов

const Router = require('express')

const router = new Router ()
const controller = require('./textController')

//для прослушки гет запроса по этому адресу
router.get('/text', controller.getTexts)

module.exports = router
