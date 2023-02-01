const {body} = require('express-validator')
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
const usersFilePath = path.resolve('./src/data/usersJSON.json')
const db = require('../../database/models');

const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const userFormsValidations = {
    registerFormValidations: [
        body('company')
            .notEmpty().withMessage('Ingrese Razón Social')
            .isLength({min:2}).withMessage('La razón social debe tener al menos 2 caracteres'),
        body('cuit')
            .notEmpty().withMessage('Ingrese el CUIT').bail()
            .isNumeric().withMessage('El CUIT debe ser numérico'),
        body('email')
            .notEmpty().withMessage('Ingrese un mail').bail()
            .isEmail().withMessage('Ingrese un mail válido')
            .custom(async(value, { req }) => {
                const email = await db.Users.findOne({where:{email:req.body.email}})
                if(email){
                    throw new Error('Ya hay un usuario registrado con ese email')
                }
                return true
            }),
        body('address').notEmpty().withMessage('Ingrese el domicilio'),    
        body('city').notEmpty().withMessage('Ingrese la localidad'),
        body('phoneNumber')
            .notEmpty().withMessage('Ingrese el número de teléfono').bail()
            .isNumeric().withMessage('El campo teléfono debe ser numérico'),
        body('password').notEmpty().withMessage('Ingrese una contraseña')
                        .isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres')
                        .custom((value,{ req }) => {
                            var re = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_?¿¡"/()+*])/
                            if(!re.test(value)){
                            throw new Error('La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial')
                            }
                            return true
                        }),
        body('passwordConfirmation')
            .notEmpty().withMessage('Valide la constraseña').bail()
            .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('La validación no coincide con la contraseña')
            }
            return true
        }),
        body('sector').custom((value,{ req }) => {
            if (value == 'default') {
            throw new Error('Debe seleccionar un rubro válido')
            }
            return true
        }),
        body('image').custom((value, { req }) => {
            let file = req.file
            let acceptedExtensions = ['.jpg','.jpeg','.png','.gif']               
            if(!file){
                return true
            }else{
                let fileExtension = path.extname(file.originalname)
                if(!acceptedExtensions.includes(fileExtension)){
                        throw new Error(`Las extensiones aceptadas son ${acceptedExtensions.join(',')}`)
                }
            }
            return true}),

    ],
    loginFormValidations: [
        body('email')
            .notEmpty().withMessage('Ingrese un mail').bail()
            .isEmail().withMessage('Ingrese un mail válido')
            .custom(async(value,{ req }) => {                
                const userToLogin = await db.Users.findOne({where:{email:req.body.email}})
                if (!userToLogin) {
                throw new Error('Usuario inválido')
                }
                return true
            }),
        body('password')
            .notEmpty().withMessage('Ingrese una contraseña')
            .custom(async(value,{ req }) => {
                const userToLogin = await db.Users.findOne({where:{email:req.body.email}})
                if (!bcrypt.compareSync(req.body.password, userToLogin.password)) {
                    throw new Error('Contraseña inválida')
                }
                return true
            })
    ]
    
}

module.exports = userFormsValidations