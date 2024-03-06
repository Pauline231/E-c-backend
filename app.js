const express = require ("express")
const { connectDatabase } = require("./database/database")
const app = express()
require("dotenv").config()
const cors = require('cors')
const {Server} = require('socket.io')
const  {promisify} = require("util")
const jwt = require('jsonwebtoken')

const authroute = require("./Router/auth/authrouter")
const productroute = require("./Router/admin/productrouter")
const adminuserroute = require("./Router/admin/adminuserroute")
const userReviewroute = require("./Router/user/userReviewroute")
const userProfileroute = require("./Router/user/profileroute")
const userCartroute = require("./Router/user/userCartroute")
const userOrderroute = require("./Router/user/userOrderroute")
const adminOrderroute = require("./Router/admin/adminOrderroute")
const userEsewaPayroute = require("./Router/user/esewapayroute")
const dataroute = require("./Router/admin/datarouter")
const User = require("./model/userModel")



app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin:'*',
}))

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
app.use('/api/admin',dataroute)//for dataservice 


//database invoke
connectDatabase()


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Here I am"
    })
})

//listening point
const PORT = process.env.PORT
const server = app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`)
} )

const io = new Server(server, {
    cors : ['https://steakhouse-user.vercel.app/','https://steakhouse-admin.vercel.app/']
})

let onlineUsers = []

const addToOnlineUsers = (socketId, userId, role)=>{
    onlineUsers = onlineUsers.filter((user)=> user.userId !== userId )
    onlineUsers.push({socketId, userId, role})
}

io.on('connection',async(socket)=>{
    const {token} = socket.handshake.auth
    if(token){
        const decoded = await promisify(jwt.verify)(token,process.env.SECRET_KEY)
        const userFound = await User.findOne({_id : decoded.id})
       if(userFound){
        addToOnlineUsers(socket.id, userFound.id, userFound.role)
       }
        }
        socket.on('updateOrderStatus', ({status, orderId, userId})=>{
            console.log(status,orderId,userId)
            const findUser = onlineUsers.find((user)=>user.userId === userId)
            io.to(findUser?.socketId).emit("statusUpdated", {status, orderId})
        })
})

