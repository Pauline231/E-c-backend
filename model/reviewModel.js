const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewModel = new Schema({
    userID :{
        type : Schema.Types.ObjectId,
        ref :"User"
    },
    productID :{
        type : Schema.Types.ObjectId,
        ref : "Project"
    },
    rating : {
        type : Number,
        required : [true, "Please provide your rating"],
        default : 3
    },
    message : {
        type : String,
        require : true
    }
})
const Review = mongoose.model("Review",reviewModel)
module.exports = Review