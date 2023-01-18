module.exports = (sequelize, DataTypes) => {
    const alias = "User_sectors" //nombre del modelo en plural
    const cols = {
       user_sector_id:{
          type : DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement : true,
          allowNull: false
       },
       user_sector_name:{
          type: DataTypes.STRING,
          allowNull: false,
       }
    }
    const config = {
       tableName : 'user_sectors',
       timestamps : false //por defecto asume que estan las columnas create_at y  update_at. Si no están hay que poner timestamps en false
    }
    
    const User_sector = sequelize.define(alias, cols, config)

    User_sector.associate = (models) => {
      User_sector.hasMany(models.Users,{
          as:'user_sector',
          foreignKey: 'user_sector_id'
      })
   }
 
    return User_sector
     
 }