const mainController = {
    index: (req,res) => {
        res.render('index',{title:'Home',userLogged:req.session.userLogged})
    }
}
module.exports = mainController

