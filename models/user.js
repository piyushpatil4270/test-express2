const sequelize=require("../util/database")
const Sequelize=require("sequelize")

const User=sequelize.define("User",{
id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true,
   

},
name:Sequelize.STRING,
email:Sequelize.STRING,
},{
    timestamps:false
})


module.exports=User