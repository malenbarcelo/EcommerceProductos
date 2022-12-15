
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
const usersFilePath = path.resolve('./src/data/usersJSON.json');
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
                title:'Registro'
                })
        }
        const newUser = req.body
        delete newUser.passwordConfirmation
        newUser.password = bcrypt.hashSync(req.body.password,10)
        newUser.category = 'cliente'
        if(!req.file){
            newUser.image = 'default.jpg'
        }else{
            newUser.image = req.file.filename
        }
        users.push(newUser)
        fs.writeFileSync(usersFilePath,JSON.stringify(users))
        return res.redirect('/users/login')
    },
    login: (req,res) => {
        res.render('users/login',{title:'Login'})
    },
    processLogin: (req, res) => {
        const resultValidation = validationResult(req)
        if (resultValidation.errors.length > 0){
            return res.render('users/login',{
                errors:resultValidation.mapped(),
                oldData: req.body,
                title:'Registro'
                
            })
        }
        const userToLogin = users.find(user => user.email == req.body.email)
        req.session.userLogged = userToLogin
        delete req.session.userLogged.password
        return res.redirect('/users/profile')

    },
    logout: (req,res) => {
       req.session.destroy()
       return res.redirect('/')
    },
    forgotPassword: (req,res) => {
        res.render('users/forgotPassword',{title:'Login'})
    },
    viewProfile: (req,res) => {
        res.render('users/profile',{
            title:'Perfil',
            userLogged: req.session.userLogged
        })
    }

}

module.exports = usersController