const Cart = require('../models/cart');
const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products)=>{
    res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    
  })
  .catch((err)=>{console.log("Error: ",err)})
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then((products)=>{
    res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    
  })
  .catch((err)=>{console.log("Error: ",err)})
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
  .then((cart)=>{
   return cart.getProducts()
   .then((prods)=>{
    res.render('shop/cart',{
      path:"/cart",
      pageTitle:"Your Cart",
      products:prods
    })
   })
   .catch((error)=>console.log("Cart error ",error))
  })
  
  .catch((err)=>{
    console.log(err)
  })
};


exports.postCart=(req,res,next)=>{
 const prodId=req.body.productId
 let fetchedCart;
 req.user.getCart()
 .then((cart)=>{
  fetchedCart=cart
   return cart.getProducts({where:{id:prodId}})
})
.then((products)=>{
 console.log("These are cart products ",products)
 let product;
 if(products.length>0){
  product=products[0]
 }
 let newQty=1
 if(product){
  const oldqty=product.cartItem.quantity
  newQty=oldqty+1
  return fetchedCart.addProduct(product,{through:{quantity:newQty}})

 }
 return Product.findByPk(prodId)
 .then((prod)=>{
  return fetchedCart.addProduct(prod,{through:{quantity:newQty}})
 })
 .then(()=>{
  res.redirect("/cart")
 })
 .catch((err)=>console.log("Error: ",err))


})

.catch((err)=>console.log("Error: ".err))
 
 res.redirect("/cart")
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};


exports.getProductById=(req,res,next)=>{
 const prodId=req.params.productId
 Product.findByPk(prodId)
 .then((product)=>{
  res.render('shop/product-detail',{
    product:product[0],
    pageTitle:product[0].title,
    path:'/products'
  })
 })
 .catch((err)=>console.log("Error: ",err))
}

exports.PostCartDelete=(req,res,next)=>{
const prodId=req.body.productId
req.user.getCart()
.then((cart)=>{
return cart.getProducts({where:{id:prodId}})

})
.then((products)=>{
const prod=products[0]
prod.cartItem.destroy()
})
.then(()=>{
  res.redirect("/cart")
})
.catch((err)=>console.log("Error: ",err))
}