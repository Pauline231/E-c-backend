const Order = require("../../../model/orderModel")
const Product = require("../../../model/productModel")

exports.getAllorders = async(req,res)=>{
    const orders = await Order.find().populate({
        path : "items.product",
        model : "Product"
    }).populate('user')
    if(orders.length == 0){
        res.status(403).json({
            message : "No orders have been placed.",
            data : []
        })
    }else{
        res.status(200).json({
            message : "All orders fetched successfully",
            data : orders
        })
    }
}   

exports.getSingleOrder = async(req,res)=>{
    const orderID = req.params.id
    const order = await Order.findById(orderID).populate({
        path : "items.product",
        model : 'Product'
    }).populate('user')
    if(!order){
        return res.status(404).json({
            message : "No order found with that id."
        })
    }
    res.status(200).json({
        message : "Order fetched successfully.",
        data : order
    })
}

exports.updateOrderstatus = async(req, res)=>{
    const orderId = req.params.id
    const {orderStatus} = req.body
    console.log(orderStatus)
    const order = await Order.findById(orderId)
    if(!orderStatus || !["pending","delivered","cancelled","ontheway","processing"].includes(orderStatus)){
        return res.status(400).json({
            message : "Please provide a valid orderStatus."
        })
    }
    if(!order){
        return res.status(404).json({
            message : "No order found with that id."
        })
    }
    const updatedOrder = await Order.findByIdAndUpdate(orderId,{
        orderStatus
    },{new : true}).populate({
        path : "items.product",
        ref : "Product"
    }).populate('user')

    let productData
    if(orderStatus === 'delivered'){
        productData = updatedOrder.items.map((item)=>{
            return {
                quantity: item.quantity,
                productId : item.product._id, 
                productStockQty : item.product.productQty
            }
        })
    
    for(var i=0;i<productData.length;i++){
        await Product.findByIdAndUpdate(productData.productId,{
            productQty : productData[i].productStockQty - productData[i].quantity
        })
    }
}

    res.status(200).json({
        message : "Orderstatus updated successfully.",
        data : updatedOrder
    })
}

exports.deleteOrder = async(req,res)=>{
    const orderId = req.params.id
    const order = await Order.findById(orderId)
    if(!order){
        return res.status(404).json({
            message : "No order found with that id."
        })
    }
    await Order.findByIdAndDelete(orderId)
    res.status(200).json({
        message : "Order deleted succesfully."
    })
}

exports.updatePaymentStatus = async(req,res)=>{
    const orderId = req.params.id
    const {paymentStatus} = req.body
    console.log(paymentStatus)
    const order = await Order.findById(orderId)
    if(!paymentStatus|| !["paid", "unpaid","pending"].includes(paymentStatus)){
        return res.status(400).json({
            message : "Please provide a valid payment status."
        })
    }
    if(!order){
        return res.status(404).json({
            message : "No order found with that id."
        })
    }
    const updatedOrder = await Order.findByIdAndUpdate(orderId,{
        'paymentDetails.status' : paymentStatus
    },{new: true}).populate({
        path : "items.product", 
        ref : "Product"
    }).populate("user")
    res.status(200).json({
        message : "Payment Status has been updated successfully.",
        data : updatedOrder
    })    
}