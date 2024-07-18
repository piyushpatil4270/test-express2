const sequelize=require("../util/database")
const Sequelize=require("sequelize")


const Cartitem=sequelize.define("cartItem",{
id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
},
quantity:Sequelize.INTEGER,

},{
    timestamps:false
})

module.exports=Cartitem