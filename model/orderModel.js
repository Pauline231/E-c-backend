const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    items : [{
        quantity : {
            type : Number, 
            required : [true, "Please provide quantity."]           
        },
        product : {
            type : Schema.Types.ObjectId,
            ref : "Product",
            required : true
        }
    }],
    totalAmount :{
        type : Number,
        required : true
    },
    shippingAddress :{
        type : String,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    orderStatus : {
        type : String,
        enum : ["pending","delivered","cancelled","ontheway","processing"],
        default : "pending"
    },
    paymentDetails :{
        pidx : {type : String},
        status : {type : String, enum: ["paid", "unpaid","pending"], default:"pending"},
        method : {type : String, enum: ["COD", "Khalti"]}
    }
},{timestamps : true})

const Order = mongoose.model("Order", orderSchema)
module.exports = Order