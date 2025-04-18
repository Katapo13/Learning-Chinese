const Router = require('express')

const router = new Router ()
const controller = require('./AuthController')

router.post('/register', controller.register)
router.post('/login', controller.login)

router.get('/users', controller.getUsers)
module.exports = router
