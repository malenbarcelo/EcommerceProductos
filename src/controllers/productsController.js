const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator')

const productsFilePath = path.resolve('./src/data/productsJSON.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    allProducts: (req,res) => {
        res.render('products/products',{title:'Productos',products:products})
    },
    filteredProducts: (req,res) => {
        let categoryRouteFiltered = './'
        let productCategory = req.params.productCategory
        let categoryTitle = productCategory.charAt(0).toUpperCase() + productCategory.slice(1)
        let productsFiltered = products.filter(product => product.category == productCategory)
        return res.render('products/productsFiltered',{title:productCategory,products:productsFiltered,categoryTitle: categoryTitle})
    },
    productDetail: (req,res) => {
        let productItem = req.params.productItem
        let selectedProduct = products.find(product => product.item == productItem)
        if(selectedProduct == undefined){
            return res.send('El producto no existe')
        }
        console.log(selectedProduct)
        return res.render('products/productDetail',{title:'Detalle del producto',selectedProduct})
    },
    cart: (req,res) => {
        res.render('products/productCart',{title:'Tu carrito de compras'})
    },
    create: (req,res) => {
        res.render('products/createProduct.ejs',{title:'Crear producto'})
    },
    store: (req, res) => {
        const resultValidation = validationResult(req)
        if (resultValidation.errors.length > 0){
            const oldData = req.body
            return res.render('products/createProduct',{
                errors:resultValidation.mapped(),
                oldData: oldData,
                title:'Crear producto'})
        } else{
            const camposNuevoProducto = req.body
            camposNuevoProducto.image = req.file.filename
            camposNuevoProducto.discount = req.body.discount/100
            products.push(camposNuevoProducto)
            fs.writeFileSync(productsFilePath,JSON.stringify(products))
            return res.redirect('/products')
        }
    },
    edit: (req,res) => {
        const productItem = req.params.productItem
        const productToEdit = products.find(product => product.item == productItem)
        if(productToEdit == undefined){
            return res.send('El producto no existe')
        }
        console.log(req.session.userLogged)
        return res.render('products/editProduct',{
            title:'Editar producto',
            product:productToEdit})
    },
    update: (req, res) => {
        const resultValidation = validationResult(req)
        if ((resultValidation.errors.length > 1) || (resultValidation.errors.length == 1 && resultValidation.errors[0].param != 'image')){
            const productToEdit = products.find(product => product.item == req.body.item)
            const oldData = req.body
            oldData.image=productToEdit.image
            return res.render('products/editProduct',{
                errors:resultValidation.mapped(),
                oldData: oldData,
                title:'Editar producto',
            })
        } else{
            let productEdited = req.body
            productEdited.discount = req.body.discount
            let productItem = req.body.item
            let productToEdit =products.find(product => product.item == productItem)
            let index = products.indexOf(productToEdit);
            if(!req.file){
                productEdited.image=products[index].image
            }else{
                productEdited.image=req.file.filename
            }
            products[index]=productEdited
            fs.writeFileSync(productsFilePath,JSON.stringify(products))
            return res.redirect('/products')

        }
    },
    delete: (req,res) => {
        const productItem = req.params.productItem
        const productToDelete = products.find(product => product.item == productItem)
        if(productToDelete == undefined){
            return res.send('El producto no existe')
        }
        return res.render('products/deleteProduct',{title:'Borrar producto',product:productToDelete})
    },
    destroy : (req, res) => {
        const item = req.body.item;
        products = products.filter(products=> products.item != item)
        fs.writeFileSync(productsFilePath,JSON.stringify(products));
        res.redirect('/products')
    }
}
module.exports = productsController