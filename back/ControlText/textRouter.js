//файл для прослушки запросов

const Router = require('express')

const router = new Router ()
const controller = require('./textController')

router.get('/texts', controller.getText)

module.exports = router
