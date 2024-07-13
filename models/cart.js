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
        let updatedProd
        const existingProdidx = cart.products.findIndex((prod) => id === prod.id);
        if (existingProdidx!=-1) {
          updatedProd = { ...cart.products[existingProdidx]};
          updatedProd.qty = updatedProd.qty + 1;
          cart.products=[...cart.products]
          cart.products[existingProdidx]=updatedProd
          
        } else {
            updatedProd={id:id,qty:1}
            cart.products.push(updatedProd)
        }
        cart.totalPrice=cart.totalPrice+ +prodPrice
        fs.writeFile(p,JSON.stringify(cart),(err)=>{if(err)console.log(err)})
        
      }
    });
  }
};
