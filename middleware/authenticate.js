const jwt = require("jsonwebtoken")
const User = require("../model/userModel")
const {promisify}= require("util")

exports.authenticate = async(req, res, next)=>{
    const token = req.headers.authorization
    if(!token){
        res.status(403).json({
            message : "Please log in first."
        })
    }
    //verifying token
    try {
        const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY)
        const userFound = await User.findOne({_id : decoded.id})
        if(!userFound){
         return res.status(404).json({
             message : "Not found"
         })
        }
        req.user = userFound
        next()
    } catch (error) {
        return res.status(403).json({
            message : "You are not authorized."
        })
    } 
}