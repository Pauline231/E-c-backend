const Order = require("../../model/orderModel")
const User = require("../../model/userModel")

exports.createOrder = async(req,res)=>{
    const userID =  req.user.id
    const {shippingAddress, items, phoneNumber, paymentDetails,totalAmount} = req.body
    if(!shippingAddress|| !items >0|| !phoneNumber ||!paymentDetails||!totalAmount){
        return res.status(400).json({
            message : "Please provide all the details of your order."
        })
    }
    const order = await Order.create({
        user : userID,
        items,
        phoneNumber,
        totalAmount,
        paymentDetails,
        shippingAddress
    })
    const user = await User.findById(userID)
    user.cart = user.cart.filter((items)=>items.product != items.product)
    await user.save()
    res.status(200).json({
        message : "Order created succesfully.",
        data : order
    })
}

exports.getMyorder = async(req,res)=>{
    const userID = req.user.id
    const myOrders = await Order.find({user : userID}).populate({
        path : "items.product",
        model : "Product",
        select : "-productQty -productStatus -createdAt -updatedAt -reviews -__v"
    })
    if(myOrders.length == 0){
        return res.status(403).json({
            message : "You haven't placed your order yet."
        })
    }
    res.status(200).json({
        message : "Order fetched successfully.",
        data : myOrders
    })
}

exports.deleteMyorder = async(req,res) =>{
    const userID = req.user.id
    const orderID = req.params.id
    const myOrder = await Order.findById(orderID)
    if(!myOrder){
        return res.status(403).json({
            message : "Order with that Id not found",
            data : []
        })
    }
    if (userID != myOrder.user){
        return res.status(404).json({
            message : "You are not allowed."
        })
    }
    await Order.findByIdAndDelete(orderID)
    res.status(200).json({
        message : "Order deleted successfully.",
        data : null
    })
}

exports.updateMyorder = async(req,res)=>{
    const orderID = req.params.id
    const userID = req.user.id
    const {shippingAddress, items} = req.body
    const myOrder = await Order.findById(orderID)
    if(!shippingAddress || items.length ==0){
        return res.status(400).json({
            message : "Please provide shippindAddress and new items."
        })
    }
    if(!myOrder){
        return res.status(403).json({
            message : "Order with that Id not found."
        })
    }
    if(myOrder.user != userID){
        return res.status(404).json({
            message : "You are not allowed."
        })
    }
    if(myOrder.status == "ontheway"){
        return res.status(400).json({
            message : "You cannot change your order when it is on the way."
        })
    }
    const updatedOrder = await Order.findByIdAndUpdate(orderID,{
        shippingAddress,
        items
    },{new :true})
    res.status(200).json({
        message : "Your order has been updated succesfully.",
        data : updatedOrder
    })
}

exports.cancelMyorder = async(req,res)=>{
    const userID = req.user.id
    const {orderID} = req.body
    const myOrder = await Order.findById(orderID)
    if(!myOrder){
        return res.status(404).json({
            message : "There is no order with that id."
        })
    }
    if(myOrder.user != userID){
        return res.status(403).json({
            message : "You are not allowed to do that."
        })
    }
    const updatedOrder = await Order.findByIdAndUpdate(orderID,{
        orderStatus : "cancelled"
    },{new : true})
    res.status(200).json({
        message : "Order cancelled succesfully",
        data : updatedOrder
    })
}