const express = require ("express")
const { connectDatabase } = require("./database/database")
const app = express()
require("dotenv").config()
const authroute = require("./Router/auth/authrouter")
const productroute = require("./Router/admin/productrouter")
const adminuserroute = require("./Router/admin/adminuserroute")
const userReviewroute = require("./Router/user/userReviewroute")
const userProfileroute = require("./Router/user/profileroute")
const userCartroute = require("./Router/user/userCartroute")
const userOrderroute = require("./Router/user/userOrderroute")
const adminOrderroute = require("./Router/admin/adminOrderroute")
const userEsewaPayroute = require("./Router/user/esewapayroute")

app.use(express.json())
app.use(express.urlencoded({extended : true}))

//to give access to uploads folder(before 25)
app.use(express.static("./uploads"))

//router
app.use("/api/auth", authroute)//register and loginUser api
app.use("/api/products", productroute)//product apis
app.use("/api/admin/users", adminuserroute)//for users
app.use("/api/reviews", userReviewroute)//for reviews
app.use("/api/user/profile", userProfileroute)//for userprofiles
app.use("/api/user/cart", userCartroute)//for usercart
app.use("/api/user/order", userOrderroute)//for userorders
app.use("/api/admin/order", adminOrderroute)//for admin & orders
app.use("/api/payment", userEsewaPayroute)//for esewa payment


//database invoke
connectDatabase()

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Here I am"
    })
})

//listening point
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`)
} )


