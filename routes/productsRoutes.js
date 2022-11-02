const express = require('express')
const productsController = require('../controllers/productsController.js')
const router = express.Router()

router.get('/product-detail',productsController.detail)
router.get('/product-cart',productsController.cart)
router.get('/create-product',productsController.create)
router.get('/edit-product',productsController.edit)

module.exports = router