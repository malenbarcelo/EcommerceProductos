//Middleware de ruta
function admMiddleware(req,res,next){
    if(!req.session.userLogged || req.session.userLogged.category == "cliente"){
        return res.redirect('/products')
    }
    return next()
}
module.exports=admMiddleware