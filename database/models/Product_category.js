module.exports = (sequelize, DataTypes) => {
   const alias = "Product_categories" //nombre del modelo en plural
   const cols = {
      product_category_id:{
         type : DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement : true,
         allowNull: false
      },
      product_category_name:{
         type: DataTypes.STRING,
         allowNull: false,
      }
   }
   const config = {
      tableName : 'product_categories',
      timestamps : false //por defecto asume que estan las columnas create_at y  update_at. Si no están hay que poner timestamps en false
   }
   
   const Product_category = sequelize.define(alias, cols, config)

   Product_category.associate = (models) => {
      Product_category.hasMany(models.Products,{
          as:'category_product',
          foreignKey: 'product_category_id'
      })
  }

   return Product_category
    
}