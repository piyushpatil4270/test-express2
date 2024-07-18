const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};


exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit
  if(!editMode) return res.redirect("/")
  const prodId=req.params.productId
  Product.findByPk(prodId)
  
  .then((product)=>{
    if(!product[0]) return res.redirect("/")
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing:editMode,
      product:product[0]
    })
  })
  .catch((err)=>console.log(err))

  
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description,
    
  })
  .then(()=>{
    res.redirect("/admin/products")
  })
  .catch((err)=>console.log(err))
  
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  .then((products)=>{
    res.render('admin/products', {
         prods: products,
         pageTitle: 'Admin Products',
         path: '/admin/products'
       });
     
   })
  
  .catch((err)=>console.log(err))
};


exports.deleteProduct=(req,res,next)=>{
  const prodId=req.params.id
  console.log("product deleted")
  Product.destroy({where:{id:prodId}})
  .then(()=>{
    res.redirect("/")
  })
  .catch((err)=>{
    console.log("Error: ",err)
  })

  
}