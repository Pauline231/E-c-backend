const { Timestamp } = require("bson")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    productName:{
        type : String,
        required : [true, 'Product name must be provided']
    },
    productDescription :{
        type : String,
        required : [true, 'Product description must be provided.']
    },
    productPrice : {
        type : Number,
        required : [true, "Product price must be mentioned"]
    },
    productQty :{
        type : Number,
        required : [true, "Product stock must be provided."]
    },
    productStatus :{
        type : String,
        enum : ['available','unavailable'],
        default : 'available'
    },
    productImage :{
        type : String,
        required : [true, "Product Image is required"]
    }
},{timestamps : true})
const Product = mongoose.model("Product", productSchema)
module.exports = Product