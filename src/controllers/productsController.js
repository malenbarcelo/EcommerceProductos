const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator')
const db = require('../../database/models');
const { ResultWithContext } = require('express-validator/src/chain');

const productsFilePath = path.resolve('./src/data/productsJSON.json');
//let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    allProducts: async(req,res) => {
        try{
            const page = req.params.page
            const offset = 12 * (page.replace('page','')-1)
            const products = await db.Products.findAll({
                include: [{association:'product_category'}],
                offset:offset,
                limit:12
            })
            const allProducts = await db.Products.findAll()
            return res.render('products/products',{title:'Productos',products,allProducts})

        }catch(error){
            return res.send('Ups, algo salió mal')
        }
    },
    filteredProducts: async(req,res) => {
        let categoryRouteFiltered = './'
        let productCategory = req.params.productCategory
        let categoryTitle = productCategory.charAt(0).toUpperCase() + productCategory.slice(1)
        try{
            const productCategoryId = await db.Product_categories.findOne({where:{product_category_name:productCategory}})
            const products = await db.Products.findAll({include: [{association:'product_category'}],where:{product_category_id:productCategoryId.dataValues.product_category_id}})
            return res.render('products/productsFiltered',{title:productCategory,products:products,categoryTitle: categoryTitle})
        }catch(error){
            return res.send('Ups, algo salió mal')
        }
    },
    productDetail: async (req,res) => {
        const productItem = req.params.productItem
        try{
            const selectedProduct = await db.Products.findOne({where:{product_name:productItem}})
            if(!selectedProduct){
                return res.render('products/productNotFound',{title:'Error',productItem})
            }else{
                return res.render('products/productDetail',{title:'Detalle del producto',selectedProduct})
            }
        }catch(error){
            return res.send('Ups, algo salió mal')
        }
    },
    cart: (req,res) => {
        res.render('products/productCart',{title:'Tu carrito de compras'})
    },
    create: async (req,res) => {
        try{
            const productCategories = await db.Product_categories.findAll()
            return res.render('products/createProduct.ejs',{title:'Crear producto',productCategories})
        }catch(error){
            console-log('errorrrr')
            return res.send('Ups, algo salió mal')
        }
    },
    store: async (req, res) => {
        const resultValidation = validationResult(req)
        if (resultValidation.errors.length > 0){
            const oldData = req.body
            const productCategories = await db.Product_categories.findAll()
            return res.render('products/createProduct',{
                errors:resultValidation.mapped(),
                oldData: oldData,
                title:'Crear producto',
                productCategories
            })
        } else{
            try{
                const category_id = await db.Product_categories.findOne({where:{product_category_name:req.body.category}})
                await db.Products.create({
                    product_name: req.body.item,
                    product_description: req.body.description,
                    product_category_id: category_id.product_category_id,
                    price: req.body.price,
                    discount: req.body.discount,
                    stock: req.body.stock,
                    product_image: req.file.filename
                })
                //return res.send(category_id.product_category_id + 'a')
                return res.redirect('/products/page1')
            }catch(error){
                return res.send('Ups, algo salió mal')
            }
        }
    },
    edit: async (req,res) => {
        const productItem = req.params.productItem
        const productCategories = await db.Product_categories.findAll()

        try{
            
            const selectedProduct = await db.Products.findOne({where:{product_name:productItem}})
            const selectedProductCategory = await db.Product_categories.findOne({
                where:{
                    product_category_id:selectedProduct.product_category_id
                    }
            })
            return res.render('products/editProduct',{
                title:'Editar producto',
                product:selectedProduct,
                selectedProductCategory,
                productCategories
            })
        }catch(error){
            return res.send('Ups, algo salió mal')
        }
    },
    update: async (req, res) => {
        const resultValidation = validationResult(req)
        const productItem = req.body.item
        const oldData = req.body

        try{
            let productToEdit = await db.Products.findOne({where:{product_name:productItem}})
            let productImage = ''
            const productCategories = await db.Product_categories.findAll()
            const selectedProductCategory = await db.Product_categories.findOne({
                where:{
                    product_category_id:productToEdit.product_category_id
                    }
            })

            if (resultValidation.errors.length > 0){
                let errors = 0
                for(let i = 0; i < resultValidation.errors.length; i++){
                    if (resultValidation.errors[i].param != 'item' && resultValidation.errors[i].param != 'image'){
                        errors += 1
                    }
                }
                if (errors > 0){
                    oldData.image=productToEdit.product_image
                    return res.render('products/editProduct',{
                    errors:resultValidation.mapped(),
                    oldData: oldData,
                    title:'Editar producto',
                    productCategories,
                    selectedProductCategory})
                }else{
                    //Si no se carga ningún archivo, se coloca la imagen que ya estaba
                    if(!req.file){
                        productImage = productToEdit.product_image
                    }else{
                        productImage = req.file.filename
                    }
                    //Modifico la base de datos
                    const categoryId = await db.Product_categories.findOne({where:{product_category_name:req.body.category }})
                    await db.Products.update(
                        {
                        product_name: req.body.item,
                        product_description: req.body.description,
                        product_category_id: categoryId.product_category_id,
                        price: req.body.price,
                        discount: req.body.discount,
                        stock: req.body.stock,
                        product_image: productImage},
                        {where: {product_name:productItem}})

                    return res.redirect('/products/page1')
                }
            }
    
        }catch(error){
            return res.send('Ups, algo salió mal')
        }
    },
    delete: async(req,res) => {
        const productItem = req.params.productItem
        try{
            const productToDelete = await db.Products.findOne({include: [{association:'product_category'}],where:{product_name:productItem}})
            return res.render('products/deleteProduct',{title:'Borrar producto',product:productToDelete})
        }catch(error){
            return res.send('Ups, algo salió mal')
        }
    },
    destroy : async(req, res) => {
        const item = req.body.item;
        try{
            await db.Products.destroy({where: {product_name:item}})
            return res.redirect('/products/page1')
        }catch(error){
            return res.send('El producto no se puede eliminar porque tiene asociaciones en el carro de compras')
        }
    }
}
module.exports = productsController