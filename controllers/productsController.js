const fs = require('fs');
const path = require('path');

const productsFilePath = path.resolve('./data/productsJSON.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    allProducts: (req,res) => {
        res.render('products/products',{title:'Productos',products:products})
    },    
    productDetail: (req,res) => {
        let productId = req.params.productId
        let selectedProduct = products.find(product => product.id == productId)
        res.render('products/productDetail',{title:'Detalle del producto',selectedProduct})
        
        
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