const express = require('express')
const usersController = require('../controllers/usersController.js')
const router = express.Router()
const userFormsValidations = require('../validations/userFormsValidations.js')
const multer = require('multer')
const path = require('path')

//Configuro Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('public/images/usersImages')) 
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()    
      const fileExtension = path.extname(file.originalname)   
      const fileName = file.originalname.replace(fileExtension,'')     
      cb(null, fileName + '-' + uniqueSuffix + fileExtension)
    }
  })

const upload = multer({storage})

router.get('/register',usersController.register)
router.post('/register',upload.single('image'),userFormsValidations.registerFormValidations,usersController.processRegister)
router.get('/login',usersController.login)
router.post('/login',userFormsValidations.loginFormValidations,usersController.processLogin)
router.get('/forgotPassword',usersController.forgotPassword)
router.get('/logout',usersController.logout)

module.exports = router