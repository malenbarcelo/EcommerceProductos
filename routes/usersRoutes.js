const express = require('express')
const usersController = require('../controllers/usersController.js')
const router = express.Router()

router.get('/register',usersController.register)
router.get('/login',usersController.login)
router.get('/forgotPassword',usersController.forgotPassword)

module.exports = router