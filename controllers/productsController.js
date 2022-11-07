const productsController = {
    detail: (req,res) => {
        res.render('products/productDetail',{title:'Detalle'})
    },
    cart: (req,res) => {
        res.render('products/productCart',{title:'Tu carrito de compras'})
    },
    create: (req,res) => {
        res.render('products/createProduct.ejs',{title:'Crear producto'})
    },
    edit: (req,res) => {
        res.render('products/editProduct',{title:'Editar producto'})
    },

}

module.exports = productsController