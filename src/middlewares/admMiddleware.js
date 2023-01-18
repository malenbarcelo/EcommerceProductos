//Middleware de ruta
function admMiddleware(req,res,next){
    if(!req.session.userLogged || req.session.userLogged.user_category_id == 2){
        return res.redirect('/products/page1')
    }
    console.log('chau desde middle')
    return next()
}
module.exports=admMiddleware