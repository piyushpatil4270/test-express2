const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        try {
          cb(JSON.parse(fileContent));
        } catch (error) {
          cb([])
        }
        
      }
    });
  
  
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id=Math.ceil(Math.random()).toString()
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id,cb){
   getProductsFromFile((products)=>{
    const product=products.find((prod)=>prod.id===id)
     cb(product)
   })
  }
  static deleteProduct(id,cb){
    let arr=[]
    fs.readFile(p,(err,data)=>{
         if(err){
          return cb()
         }
         try {
          arr=JSON.parse(data)
         } catch (error) {
          console.log(error)
         }
         let newarr=arr.filter((prod)=>{
          prod.id!=id
         })
         fs.writeFile(p,JSON.stringify(newarr),(err)=>{
          if(err){
         cb()
          }
            cb()
         })
    })
  }
};
