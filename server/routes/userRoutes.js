const userController = require('../controllers/userController')
const router = require('express').Router()
const {
    Authenticate
} = require('../middleware/auth')

router.get('/', userController.getAll)

module.exports = router