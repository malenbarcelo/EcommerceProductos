const {body} = require('express-validator')
const path = require('path');
const db = require('../../database/models');


const productFormsValidations = {
    productFormValidations: [
        body('item').notEmpty().withMessage('Ingrese el código del producto')
                    .isLength({min:2}).withMessage('El código debe tener al menos 2 caracteres')
                    .custom(async(value, { req }) => {
                        const newProduct = await db.Products.findOne({where:{product_name:req.body.item}})
                        if(newProduct){
                            throw new Error('El producto ingresado ya existe')
                        }
                        return true
                    }),
        body('description').notEmpty().withMessage('Ingrese una descripción')
                           .isLength({min:10}).withMessage('La descripción debe tener al menos 10 carcateres'),
        body('price')
            .notEmpty().withMessage('Ingrese el precio del producto').bail()
            .isNumeric().withMessage('El precio debe ser numérico'),
        body('discount')
        .notEmpty().withMessage('Ingrese un descuento. Sino ingrese 0').bail()
        .isNumeric().withMessage('El descuento debe ser numérico'),
        body('stock')
            .notEmpty().withMessage('Ingrese el stock. Si no hay stock, ingrese 0').bail()
            .isNumeric().withMessage('El stock debe ser numérico'),        
        body('image').custom((value, { req }) => {
        let file = req.file
        let acceptedExtensions = ['.jpg','.jpeg','.png','.gif']               
        if(!file){
            throw new Error('Tienes que subir una imagen')
        }else{
            let fileExtension = path.extname(file.originalname)
            if(!acceptedExtensions.includes(fileExtension)){
                    throw new Error(`Las extensiones aceptadas son ${acceptedExtensions.join(',')}`)
            }
        }
        return true}),
        body('category').custom((value,{ req }) => {
            if (value == 'default') {
            throw new Error('Debe seleccionar una categoría válida')
            }
            return true
        })
    ]
    
}

module.exports = productFormsValidations