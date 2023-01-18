module.exports = (sequelize, DataTypes) => {
    const alias = "Products" //nombre del modelo en plural
    const cols = {
        product_id:{
          type : DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement : true,
          allowNull: false
       },
       product_name:{
          type: DataTypes.STRING,
          allowNull: false,
       },
       product_description:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_category_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price:{
        type: DataTypes.FLOAT(7,2),
        allowNull: false,
      },
      discount:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_image:{
        type: DataTypes.STRING,
        allowNull: false,
      }
    }
    const config = {
       tableName : 'products',
       timestamps : false //por defecto asume que estan las columnas create_at y  update_at. Si no están hay que poner timestamps en false
    }
    
    const Product = sequelize.define(alias, cols, config)

    Product.associate = (models) => {
        Product.belongsTo(models.Product_categories,{
            as:'product_category',
            foreignKey: 'product_category_id'
        })
        Product.hasMany(models.Cart_details,{
          as:'cart_product',
          foreignKey: 'product_id'
      })
    }
 
    return Product
     
 }