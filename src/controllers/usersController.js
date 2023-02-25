
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
const usersFilePath = path.resolve('./src/data/usersJSON.json');
const {validationResult} = require('express-validator')
const db = require('../../database/models');
const fetch = require('cross-fetch')

let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {

    register: (req,res) => {
        return res.render('users/register',{title:'Registro'})
    },
    processRegister: async (req,res)=>{
        const resultValidation = validationResult(req)
        try{
            if (resultValidation.errors.length > 0){
                return res.render('users/register',{
                    errors:resultValidation.mapped(),
                    oldData: req.body,
                    title:'Registro'
                    })
            }
            const newUser = req.body
            newUser.password = bcrypt.hashSync(req.body.password,10)
            if(!req.file){
                newUser.image = 'default.jpg'
            }else{
                newUser.image = req.file.filename
            }
            const user_sector = await db.User_sectors.findOne({where:{user_sector_name:req.body.sector}})
            await db.Users.create({
                user_name: req.body.company,
                cuit_cuil: req.body.cuit,
                user_sector_id: user_sector.dataValues.user_sector_id,
                user_category_id: 2,
                email: req.body.email,
                address: req.body.address,
                city: req.body.city,
                phone_number: req.body.phoneNumber,
                user_image: newUser.image,
                password: newUser.password
            })
            return res.redirect('/users/profile')
        }catch(error){
            const newUser = req.body
            newUser.password = bcrypt.hashSync(req.body.password,10)
            console.log('user_name:' + req.body.company)
            console.log('cuit_cuil:' + req.body.cuit)
            //console.log('user_sector_id:' + user_sector.dataValues.user_sector_id)
            console.log('user_category_id:' + 2)
            console.log('email:' + req.body.email)
            console.log('address:' + req.body.address)
            console.log('city:' + req.body.city)
            console.log('phone_number:' + req.body.phoneNumber)
            console.log('user_image:' + newUser.image)
            console.log('password:' + newUser.password)
            return res.send('Ups, algo salió mal')

        }
    },
    login: (req,res) => {
        return res.render('users/login',{title:'Login'})
    },
    processLogin: async(req, res) => {
        try{
            const resultValidation = validationResult(req)
        if (resultValidation.errors.length > 0){
            console.log(resultValidation)
            return res.render('users/login',{
                errors:resultValidation.mapped(),
                oldData: req.body,
                title:'Registro'
            })
        }
        const userToLogin = await db.Users.findOne({where:{email:req.body.email}})
        const user_sector = await db.User_sectors.findOne(
            {where:{user_sector_id:userToLogin.user_sector_id}}
            )
        userToLogin.dataValues.sector_name = user_sector.dataValues.user_sector_name
        req.session.userLogged = userToLogin
        delete req.session.userLogged.password
        if(req.body.remember_user){
            res.cookie('userEmail',req.body.email,{maxAge:(1000 * 60) * 5})
        }
        return res.redirect('/users/profile')
        }catch(error){
            res.send('Ups, algo salió mal')
        }
    },
    logout: (req,res) => {
       res.clearCookie('userEmail')
       req.session.destroy()
       return res.redirect('/')
    },
    forgotPassword: (req,res) => {
        res.render('users/forgotPassword',{title:'Login'})
    },
    viewProfile: (req,res) => {
        return res.render('users/profile',{
            title:'Perfil',
            userLogged: req.session.userLogged
        })

    },
    editProfile: (req,res) =>{
        return res.render('users/editProfile',{title:'Editar perfil'})
    },
    usersList: async(req,res) =>{
        try{
            let usersDb = await db.Users.findAll({attributes: ['user_id', 'user_name','email']})
            users=[]
            for(let i=0;i<usersDb.length;i++){
                users.push({'user_id':usersDb[i].user_id, 'user_name':usersDb[i].user_name,'email':usersDb[i].email,'detail':'api/users/' + usersDb[i].user_id})
            }

            return res.status(200).json({
                count: users.length,
                users: users,
                status:200
            })

        }catch(error){
            return res.json('Ups, algo salió mal')
        }
    },
    /*usersListRender:async(req,res)=>{
        return res.render('users/usersList',
        {title:'Usuarios'})
    },*/
    usersListRender:async(req,res)=>{
        fetch('http://localhost:3000/api/users/')
            .then(response => response.json())
            .then(users => {
                return res.render('users/usersList',{title:'Usuarios',users})
            })

    },
    usersFiltered:async(req,res) =>{
        try{
            let userFiltered = await db.Users.findByPk(req.params.id)

            return res.status(200).json({
                user: userFiltered,
                status:200
            })
        }catch(error){
            return res.json('Ups, algo salió mal')
        }
    },
    userProfile: async(req,res) => {
        try{
            const userName = req.params.name
            let user = await db.Users.findOne({
                where:{user_name:userName}
            })
            const userSector = await db.User_sectors.findOne({
                where:{user_sector_id:user.dataValues.user_sector_id}
            })
            return res.render('users/userProfile',{
                title:'Perfil',
                user,
                userSector
            })
        }catch(error){
            return res.send('Ups, algo salió mal')
        }

    },
}

module.exports = usersController

