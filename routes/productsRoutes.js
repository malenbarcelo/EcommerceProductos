const express = require('express')
const productsController = require('../controllers/productsController.js')
const router = express.Router()
const multer = require('multer')
const path = require('path')

//Configuro Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('public/images/productos')) 
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()    
      const fileExtension = path.extname(file.originalname)   
      const fileName = file.originalname.replace(fileExtension,'')     
      cb(null, fileName + '-' + uniqueSuffix + fileExtension)
    }
  })

  const upload = multer({storage})  

router.get('/',productsController.allProducts)
router.get('/product-detail/:productId',productsController.productDetail)
router.get('/product-cart',productsController.cart)
router.get('/create-product',productsController.create)
router.post('/', upload.single('image'),productsController.store)
router.get('/edit-product/:productId',productsController.edit)
router.put('/',upload.single('image'),productsController.update)
router.get('/delete-product/:productId',productsController.delete)
router.delete('/',productsController.destroy)


module.exports = router