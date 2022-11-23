
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')

const usersFilePath = path.resolve('./data/usersJSON.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
    register: (req,res) => {
        res.render('users/register',{title:'Registro'})
        
    },
    login: (req,res) => {
        res.render('users/login',{title:'Login'})
    },
    processLogin: (req, res) => {
        let usuario = req.body
        let userToLogin = users.find(user => user.email == req.body.email)
        if (userToLogin && req.body.password == userToLogin.password){
            return res.send('usuario logueado: ' + userToLogin.userName)
            req.session.userLogged = userToLogin
        }
        return res.send('Usuario inválido')
    },
    forgotPassword: (req,res) => {
        res.render('users/forgotPassword',{title:'Login'})
    },

}

module.exports = usersController