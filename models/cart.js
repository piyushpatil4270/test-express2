const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id,prodPrice) {
    fs.readFile(p, (err, data) => {
      let cart = { products: [], totalPrice: 0 };
      if (err) {
        console.log(err);
        return;
      } else {
        try {
          cart = JSON.parse(data);
        } catch (error) {
          console.log(err);
        }
        const existingProdidx = cart.products.findIndex((prod) => id === prod.id);
        if (existingProdidx) {
          updatedProd = { ...cart.products[existingProdidx]};
          updatedProd.qty = updatedProd.qty + 1;
          cart.products=[...cart.products]
          cart.products[existingProdidx]=updatedProd
          
        } else {
            updatedProd={id:id,qty:1}
            cart.products=[...cart.products,updatedProd]
        }
        cart.totalPrice=cart.totalPrice+ +prodPrice
        fs.writeFile(p,JSON.stringify(cart),(err)=>console.log(err))
        
      }
    });
  }
};
