module.exports = (sequelize, DataTypes) => {
    const alias = "Cart_details"
    const cols = {
        cart_detail_id:{
          type : DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement : true,
          allowNull: false
       },
       sale_id:{
          type: DataTypes.INTEGER,
          allowNull: false,
       },
       user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_qty:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_price:{
        type: DataTypes.FLOAT(7,2),
        allowNull: false,
      }
    }
    const config = {
       tableName : 'cart_details',
       timestamps : false
    }

    const Cart_detail = sequelize.define(alias, cols, config)

    Cart_detail.associate = (models) => {
      Cart_detail.belongsTo(models.Users,{
          as:'cart_user',
          foreignKey: 'user_id'
      })
      Cart_detail.belongsTo(models.Products,{
        as:'cart_product',
        foreignKey: 'product_id'
    })
  }


    return Cart_detail

 }