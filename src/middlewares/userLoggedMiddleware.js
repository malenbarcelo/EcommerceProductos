//Middleware de aplicación
const fs = require('fs');
const path = require('path');
const usersFilePath = path.resolve('./src/data/usersJSON.json');

let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function userLoggedMiddleware(req,res,next){
    res.locals.isLogged=false

    const emailInCookie = req.cookies.userEmail
    const userFromCookie = users.find(user => user.email == emailInCookie)

    if(userFromCookie){
        req.session.userLogged=userFromCookie
    }

    if(req.session.userLogged){
        res.locals.isLogged=true
        res.locals.userLogged=req.session.userLogged
    }


    next()
}
module.exports=userLoggedMiddleware
