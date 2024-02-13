const mongoose = require("mongoose")
const { stringify } = require("querystring")
const Product = require("./productModel")
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName :{
        type : String,
        required :[true, "userName is required"]
    },
    userEmail :{
        type : String,
        required : [true, 'userEmail must be provided']
    },
    userPhoneNumber : {
        type : Number,
        required :[true, 'please provide your number']
    },
    userPassword :{
        type : String,
        required :[true, "User-password is required"],
    },
    role :{
        type : String,
        enum : ['customer', "admin"],
        default : 'customer',
    },
    otp :{
        type : Number,
    },
    cart :[{
        quantity :{
            type : Number,
            required : true
        },
        product :{
            type : Schema.Types.ObjectId,
            ref : "Product"
        }
    }]
}, {timestamps : true})
const User = mongoose.model("User", userSchema)
module.exports = User