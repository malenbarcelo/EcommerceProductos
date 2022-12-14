const {body} = require('express-validator')
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
const usersFilePath = path.resolve('./src/data/usersJSON.json')

const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const userFormsValidations = {
    registerFormValidations: [
        body('company').notEmpty().withMessage('Ingrese Razón Social'),
        body('cuit')
            .notEmpty().withMessage('Ingrese el CUIT').bail()
            .isNumeric().withMessage('El CUIT debe ser numérico'),
        body('email')
            .notEmpty().withMessage('Ingrese un mail').bail()
            .isEmail().withMessage('Ingrese un mail válido'),
        body('address').notEmpty().withMessage('Ingrese el domicilio'),    
        body('city').notEmpty().withMessage('Ingrese la localidad'),
        body('phoneNumber')
            .notEmpty().withMessage('Ingrese el número de teléfono').bail()
            .isNumeric().withMessage('El campo teléfono debe ser numérico'),
        body('password').notEmpty().withMessage('Ingrese una contraseña'),
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
        })

    ],
    loginFormValidations: [
        body('email')
            .notEmpty().withMessage('Ingrese un mail').bail()
            .isEmail().withMessage('Ingrese un mail válido')
            .custom((value,{ req }) => {                
                let userToLogin = users.find(user => user.email == req.body.email)
                if (!userToLogin) {
                throw new Error('Usuario inválido')
                }
                return true
            }),
        body('password')
            .notEmpty().withMessage('Ingrese una contraseña')
            .custom((value,{ req }) => {
                userToLogin = users.find(user => user.email == req.body.email)
                if (!bcrypt.compareSync(req.body.password, userToLogin.password)) {
                    throw new Error('Contraseña inválida')
                }
                return true
            })
    ]
    
}

module.exports = userFormsValidations