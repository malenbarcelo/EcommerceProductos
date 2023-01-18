module.exports = (sequelize, DataTypes) => {
    const alias = "Users" 
    const cols = {
        user_id:{
          type : DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement : true,
          allowNull: false
       },
       user_name:{
          type: DataTypes.STRING,
          allowNull: false,
       },
       cuit_cuil:{
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      user_sector_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_category_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      address:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      city:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_image:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
      }
    }
    const config = {
       tableName : 'users',
       timestamps : false 
    }
    
    const User = sequelize.define(alias, cols, config)

    User.associate = (models) => {
        User.belongsTo(models.User_categories,{
            as:'user_category',
            foreignKey: 'user_category_id'
        })
        User.belongsTo(models.User_sectors,{
            as:'user_sector',
            foreignKey: 'user_sector_id'
        })
        User.hasMany(models.Cart_details,{
          as:'cart_user',
          foreignKey: 'user_id'
      })
    }
 
    return User
     
 }