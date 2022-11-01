const express = require('express')
const productsController = require('../controllers/productsController.js')
const router = express.Router()

router.get('/product-detail',productsController.detail)
router.get('/product-cart',productsController.cart)

module.exports = router