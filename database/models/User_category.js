module.exports = (sequelize, DataTypes) => {
    const alias = "User_categories" 
    const cols = {
       user_category_id:{
          type : DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement : true,
          allowNull: false
       },
       user_category_name:{
          type: DataTypes.STRING,
          allowNull: false,
       }
    }
    const config = {
       tableName : 'user_categories',
       timestamps : false 
    }
    
    const User_category = sequelize.define(alias, cols, config)

    User_category.associate = (models) => {
      User_category.hasMany(models.Users,{
          as:'user_category',
          foreignKey: 'user_category_id'
      })
   }
 
    return User_category
     
 }