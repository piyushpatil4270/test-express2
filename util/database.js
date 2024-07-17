const Sequelize = require("sequelize");

const sequelize = new Sequelize("shop", "root", "Piyush@nyc85", {
  dialect: "mysql",
  host: "localhost",
});

module.exports=sequelize