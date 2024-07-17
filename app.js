const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize=require("./util/database")
const errorController = require('./controllers/error');

const app = express();
sequelize.sync()
.then(()=>console.log("Connected to Database"))
.catch((err)=>console.log("Error connecting to database ",err))

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'))

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
