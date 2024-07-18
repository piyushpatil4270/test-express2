const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const errorController = require("./controllers/error");
const User = require("./models/user");
const Product = require("./models/product");
const Cart=require('./models/cart')
const CartItem=require('./models/cartitem')
const app = express();


app.use((req,res,next)=>{
    User.findByPk(1)
    .then((user)=>{
        req.user=user
        next()
    })
    .catch((err)=>console.log("Error: ",err))
    
})

Product.belongsTo(User, { constraints: true, onDelete: "Cascade" });
User.hasMany(Product);
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product,{through:CartItem})
Product.belongsToMany(Cart,{through:CartItem})


sequelize
  .sync()
  .then(() => {
    console.log("Connected to Database");
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Henry",
        email: "Henry@gmail.com",
      });
    }
    return Promise.resolve(user);
  })
  .then((user)=>{
   return user.createCart()
   console.log(user)
  })
  .catch((err) => console.log("Error connecting to database ", err));

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
