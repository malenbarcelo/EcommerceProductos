const express = require('express')
const usersController = require('../controllers/usersController.js')
const router = express.Router()

router.get('/',usersController.usersList)
router.get('/:id',usersController.usersFiltered)


module.exports = router