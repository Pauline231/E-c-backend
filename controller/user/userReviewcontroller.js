const Review = require("../../model/reviewModel")
const Product = require("../../model/productModel")

exports.createReview = async(req,res)=>{
    const userID = req.user.id
    const productID = req.params.id
    const {rating, message} = req.body
    const productFound = await Product.findById(productID)
    if(!productFound){
        return res.status(400).json({
            message : "Product with that id does not exist."
        })
    }
    if(!rating || !message ||!productID){
        return res.status(400).json({
            message : "Please provide your rating,message and productID in your review."
        })
    }
    await Review.create({
        userID,
        productID,
        rating,
        message
    })
    res.status(200).json({
        message : "Review created succesfully"
    })
}

exports.getmyReview = async(req, res)=>{
    const userID = req.user.id
    console.log(userID)
    const reviews = await Review.find({userID : userID})
    if(reviews.length > 0){
        res.status(200).json({
            message : "Reviews fetched succesfully.",
            data : reviews
        })
    }else{
        res.status(400).json({
            message : "You have not given reviews to any product yet.",
            data : []
        })
    }
}

exports.deleteReview = async(req, res)=>{
    const userID = req.user.id
    const reviewID = req.params.id //can use req.param but it must be const {id}\
    if(!reviewID){
        return res.status(400).json({
            message : "Please provide the reviewID"
        })
    }
    const review = await Review.findById(reviewID)
    if(!review){
        return res.status(400).json({
            message : "Review is not found"
        })
    }
    //to check if the deleter is the reviewowner
    const reviewOwner = review.userID   
    if(reviewOwner != userID){
        return res.status(403).json({
            message : "You are not authorized to delete this review."
        })
    }
    await Review.findByIdAndDelete(reviewID)
    res.status(200).json({
        message : "Review deleted succesfully."
    })
}