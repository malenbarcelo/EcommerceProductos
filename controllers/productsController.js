const fs = require('fs');
const path = require('path');

const productsFilePath = path.resolve('./data/productsJSON.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    allProducts: (req,res) => {
        let categoryRoute = '/products/products-filtered/'
        res.render('products/products',{title:'Productos',products:products, categoryRoute:categoryRoute})
    },
    filteredProducts: (req,res) => {
        let categoryRoute = './'
        let productCategory = req.params.productCategory
        let categoryTitle = productCategory.charAt(0).toUpperCase() + productCategory.slice(1)
        let productsFiltered = products.filter(product => product.category == productCategory)
        return res.render('products/productsFiltered',{title:productCategory,products:productsFiltered,categoryRoute:categoryRoute, categoryTitle: categoryTitle})
    },
    productDetail: (req,res) => {
        let productId = req.params.productId
        let selectedProduct = products.find(product => product.id == productId)
        if(selectedProduct == undefined){
            return res.send('El producto no existe')
        }
        return res.render('products/productDetail',{title:'Detalle del producto',selectedProduct})
    },
    cart: (req,res) => {
        res.render('products/productCart',{title:'Tu carrito de compras'})
    },
    create: (req,res) => {
        res.render('products/createProduct.ejs',{title:'Crear producto'})
    },
    store: (req, res) => {
		const camposNuevoProducto = req.body
        camposNuevoProducto.image = req.file.filename
        camposNuevoProducto.discount = req.body.discount/100
		products.push(camposNuevoProducto)
		fs.writeFileSync(productsFilePath,JSON.stringify(products))
        return res.redirect('/products')

    },
    edit: (req,res) => {
        const productId = req.params.productId
        const productToEdit = products.find(product => product.id == productId)
        if(productToEdit == undefined){
            return res.send('El producto no existe')
        }

        return res.render('products/editProduct',{title:'Editar producto',product:productToEdit})
    },
    update: (req, res) => {
		let productEdited = req.body
        productEdited.discount = req.body.discount /100
        let productId = req.body.id
        let productToEdit =products.find(product => product.id == productId)
        let index = products.indexOf(productToEdit);
        if(!req.file){
            productEdited.image=products[index].image
        }else{
            productEdited.image=req.file.filename
        }

        products[index]=productEdited
        fs.writeFileSync(productsFilePath,JSON.stringify(products))
        return res.redirect('/products')
    },
    delete: (req,res) => {
        const productId = req.params.productId
        const productToDelete = products.find(product => product.id == productId)
        if(productToDelete == undefined){
            return res.send('El producto no existe')
        }
        return res.render('products/deleteProduct',{title:'Borrar producto',product:productToDelete})
    },
    /*destroy: (req, res) => {
        let productToDeleteId = req.body.id
        let productToDelete =products.find(product => product.id == productToDeleteId)
        let index = products.indexOf(productToDelete);
        products.splice(index,1)
        fs.writeFileSync(productsFilePath,JSON.stringify(products))
        return res.redirect('/products')
    }*/

    destroy : (req, res) => {
        const id = req.body.id;
        products = products.filter(products=> products.id != id)
        fs.writeFileSync(productsFilePath,JSON.stringify(products));
        res.redirect('/products')
    }
}
module.exports = productsController