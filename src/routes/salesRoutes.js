const express = require('express')
const salesController = require('../controllers/salesController.js')
const router = express.Router()

const path = require('path')
const productFormsValidations = require('../validations/productFormsValidations.js')
const authMiddleware = require('../middlewares/authMiddleware')
const admMiddleware = require('../middlewares/admMiddleware')

router.get('/cart-details',/*admMiddleware,*/salesController.cartDetail)
router.get('/sales-details',/*admMiddleware,*/salesController.salesDetail)

module.exports = router