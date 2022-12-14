
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
const usersFilePath = path.resolve('./src/data/usersJSON.json');
const {validationResult} = require('express-validator')

let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {

    register: (req,res) => {
        res.render('users/register',{title:'Registro',userLogged:req.session.userLogged})
    },
    processRegister: (req,res)=>{
        const resultValidation = validationResult(req)
        if (resultValidation.errors.length > 0){
            return res.render('users/register',{
                errors:resultValidation.mapped(),
                oldData: req.body,
                title:'Registro',
                userLogged:req.session.userLogged
            })
        }
        const newUser = req.body
        delete newUser.passwordConfirmation
        newUser.password = bcrypt.hashSync(req.body.password,10)
        if(!req.file){
            newUser.image = 'default.jpg'
        }else{
            newUser.image = req.file.filename
        }
        users.push(newUser)
        fs.writeFileSync(usersFilePath,JSON.stringify(users))
        return res.redirect('/products')
    },
    login: (req,res) => {
        res.render('users/login',{title:'Login',userLogged:req.session.userLogged})
    },
    processLogin: (req, res) => {
        const resultValidation = validationResult(req)
        console.log(resultValidation)
        if (resultValidation.errors.length > 0){
            return res.render('users/login',{
                errors:resultValidation.mapped(),
                oldData: req.body,
                title:'Registro',
                userLogged:req.session.userLogged
            })
        }
        const userToLogin = users.find(user => user.email == req.body.email)
        req.session.userLogged = userToLogin
        return res.redirect('/')

    },
    logout: (req,res) => {
        req.session.destroy()
        return res.redirect('/')
    },
    forgotPassword: (req,res) => {
        res.render('users/forgotPassword',{title:'Login',userLogged:req.session.userLogged})
    },

}

module.exports = usersController