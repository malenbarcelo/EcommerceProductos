const db = require('./database/models')
const bcrypt = require('bcryptjs')

//const productCategories = require("model/Product_category.js")

/*db.Products.findAll({
    include: [{association:'product_category'}]
})
    .then((products)=>{
        products.forEach(product => {
            console.log(product.product_name + ' Categoría: ' + product.product_category.product_category_name)
            
        });
        
    
    })

/*db.Product_categories.findAll()
.then((categories)=>{
    categories.forEach(category => {
        console.log(category.product_category_name)
        
    });
    

})*/

/*db.Users.findAll({
    include: [{association:'user_category'},{association:'user_sector'}]
})
    .then((users)=>{
        users.forEach(user => {
            console.log(user.email + ' ' + user.user_category.user_category_name + ' ' + user.user_sector.user_sector_name)
            
        });
        
    
    })*/

/*const promesa = async()=>{
    try{
        const resultadoPromesa = await modeloUsuario.eliminar(1)
    }
    catch(error){
        console.log('algo salió mal')
    }
}*/

const passwords = ['pswcompany1','pswcompany2','pswcompany3','pswcompany4','pswcompany5','pswcompany6','pswadm1','pswadm2','pswadm3']

for (const psw of passwords) {
    console.log(bcrypt.hashSync(psw,10))    
}

