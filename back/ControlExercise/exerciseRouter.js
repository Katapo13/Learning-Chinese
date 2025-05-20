//файл для прослушки запросов

const Router = require('express')

const router = new Router ()
const controller = require('./exerciseController')

//для прослушки гет запроса по этому адресу
router.get('/exercise', controller.getExercises)

module.exports = router