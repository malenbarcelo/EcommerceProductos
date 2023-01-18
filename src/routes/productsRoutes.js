const express = require('express')
const productsController = require('../controllers/productsController.js')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const productFormsValidations = require('../validations/productFormsValidations.js')
const authMiddleware = require('../middlewares/authMiddleware')
const admMiddleware = require('../middlewares/admMiddleware')


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

//router.get('/',productsController.allProducts)
router.get('/create-product',admMiddleware,productsController.create)
router.get('/:page',productsController.allProducts)
router.get('/products-filtered/:productCategory',productsController.filteredProducts)
router.get('/product-detail/:productItem',productsController.productDetail)
router.get('/product-cart',authMiddleware,productsController.cart)
router.post('/', upload.single('image'),productFormsValidations.productFormValidations,productsController.store)
router.get('/edit-product/:productItem',admMiddleware,productsController.edit)
router.put('/',upload.single('image'),productFormsValidations.productFormValidations,productsController.update)
router.get('/delete-product/:productItem',admMiddleware,productsController.delete)
router.delete('/',upload.single('image'),productsController.destroy)

module.exports = router