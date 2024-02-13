const User = require('../../model/userModel')
const Product = require("../../model/productModel")

exports.addtoCart = async(req, res)=>{
    try {    const userId = req.user.id
        const productId= req.params.id//product-id should use req.params.id because of the route
        if(!productId){
            return res.status(400).json({   
                message : "Please provide productID."
            })
        }
        productExist = await Product.findById(productId)
        if(!productExist){
            return res.status(404).json({
                message : "Product with that id not found."
            })
        }
        const user = await User.findById(userId)
        //checkind if the product is already in cart
        const productInCart = await user.cart.find((item)=> item.product.equals(productId))
        if(productInCart){
            productInCart.quantity += 1
        }else{
            user.cart.push({
                product : productId,
                quantity : 1
            })
        }
        await user.save()
        const updatedUser = await User.findById(userId).populate("cart.product")
        res.status(200).json({
            message : "Product added to cart successfully.",
            data : updatedUser.cart
        })
    } catch (error) {
        res.status(400).json({
            message : "something went wrong",
            data : error
        })
    }
}

exports.getMyCartItems = async(req,res)=>{
    const userId = req.user.id
    const user = await User.findById(userId).populate({
        path : "cart.product",
        select : "-productStatus"
    })
    res.status(200).json({
        message : "Cart Items fetched successfully.",
        data : user.cart
    })
}

exports.deleteItemsFromCart = async(req,res)=>{
    const userID = req.user.id
    const productId = req.params.id
    const product = await Product.findById(productId)
    if(!product){
        return res.status(404).json({
            message : "Product does not exist."
        })
    }
    const user = await User.findById(userID)
    //filtering or selecting except the given product id and saving 
    user.cart = await user.cart.filter((item)=> item.product != productId)
    await user.save()
    res.status(200).json({
        message: "Item deleted from cart succesfully."
    })
}

exports.updateCartItems = async(req,res)=>{
    const userId = req.user.id
    const productId = req.params.id
    const {quantity} = req.body

    const user = await User.findById(userId)
    //checking if the product is in cart 
    const itemInCart = user.cart.find((item)=>item.product.equals(productId))
    if(!itemInCart){
        return res.status(404).json({
            message : "Item is not present in Cart"
        })  
    }
    itemInCart.quantity = quantity;
    await user.save()
    res.status(200).json({
        message : "Item in cart updated succesfully",
        data : user.cart
    })
}