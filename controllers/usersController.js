const usersController = {
    register: (req,res) => {
        res.render('users/register',{title:'Registro'})
    },
    login: (req,res) => {
        res.render('users/login',{title:'Login'})
    },
    forgotPassword: (req,res) => {
        res.render('users/forgotPassword',{title:'Login'})
    },

}

module.exports = usersController