//файл для прослушки запросов

const Router = require('express')

const router = new Router ()
const controller = require('./testController')

//для прослушки гет запроса по этому адресу
router.get('/test', controller.getTests)

module.exports = router