const productsController = {
    detail: (req,res) => {
        res.render('productDetail')
    },
    cart: (req,res) => {
        res.render('productCart')
    },
    create: (req,res) => {
        res.render('createProduct')
    },
    edit: (req,res) => {
        res.render('editProduct')
    },

}

module.exports = productsController