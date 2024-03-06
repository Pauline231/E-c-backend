const Order = require("../../model/orderModel")
const Product = require("../../model/productModel")
const Review = require("../../model/reviewModel")

exports.getProducts = async(req, res)=>{
    const products = await Product.find()
    if(products.length ==0){
        res.status(400).json({
            message: "No products found",
            data : []
        })
    }else{
        res.status(200).json({
            message : "Products fetched successfully",
            data: products
        })
    }
}

exports.getProduct = async(req,res)=>{
    const {id} = req.params
    if(!id){
      return  res.status(400).json({
            message : "Please send id"
        })
    }
    const product = await Product.findById(id)
    const reviews = await Review.find({productID : id}).populate("userID")
    const orders = await Order.find({'items.product' : id}).populate('user')
    
    if(product.length==0){
        res.status(400).json({
            message : "No product was found with that id"
        })
    }else{
        res.status(200).json({
            message : "Product found successfully",
            data: product,
              reviews,
              orders
        })
    }
}
