const express = require('express')
const usersController = require('../controllers/usersController.js')
const router = express.Router()
const userFormsValidations = require('../validations/userFormsValidations.js')

router.get('/register',usersController.register)
router.post('/register',userFormsValidations.registerFormValidations,usersController.processRegister)
router.get('/login',usersController.login)
router.post('/login',userFormsValidations.loginFormValidations,usersController.processLogin)
router.get('/forgotPassword',usersController.forgotPassword)

module.exports = router