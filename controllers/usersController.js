
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
const usersFilePath = path.resolve('./data/usersJSON.json');
const {validationResult} = require('express-validator')

let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {

    register: (req,res) => {
        res.render('users/register',{title:'Registro'})

    },
    processRegister: (req,res)=>{
        const resultValidation = validationResult(req)
        if (resultValidation.errors.length > 0){
            return res.render('users/register',{
                errors:resultValidation.mapped(),
                oldData: req.body,
                title:'Registro'})
        }
        return res.send('datos ok')
    },
    login: (req,res) => {
        res.render('users/login',{title:'Login'})
    },
    processLogin: (req, res) => {
        const resultValidation = validationResult(req)
        console.log(resultValidation)
        if (resultValidation.errors.length > 0){
            return res.render('users/login',{
                errors:resultValidation.mapped(),
                oldData: req.body,
                title:'Registro'})
        }
        return res.send('datos ok')
        //let usuario = req.body
        //let userToLogin = users.find(user => user.email == req.body.email)
        //if (userToLogin && req.body.password == userToLogin.password){
        //    return res.send('usuario logueado: ' + userToLogin.userName)
        //    req.session.userLogged = userToLogin
        //}
        //return res.send('Usuario inválido')
    },
    forgotPassword: (req,res) => {
        res.render('users/forgotPassword',{title:'Login'})
    },

}

module.exports = usersController