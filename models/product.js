const fs = require('fs');
const path = require('path');
const db=require("../util/database")


const getProductsFromFile = cb => {

};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(`INSERT INTO products (title,price,description,imageUrl) VALUES ('${this.title}','${this.price}','${this.description}','${this.imageUrl}') `)
  }

  static fetchAll(cb) {
   return  db.execute('SELECT * FROM products')
  }

  static findById(id){
   return db.execute('SELECT * FROM products WHERE products.id=?',[id])
  }
  static deleteProduct(id){
    return db.execute('Delete FROM products WHERE products.id=?',[id])
  }
};
