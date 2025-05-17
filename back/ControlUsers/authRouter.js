//файл для прослушки запросов

const Router = require('express')

const router = new Router ()
const controller = require('./AuthController')
const authmiddleware = require('./middleware/authMiddleware')

router.post('/register', controller.register)
router.post('/login', controller.login)

router.get('/users',authmiddleware, controller.getUsers)

module.exports = router
