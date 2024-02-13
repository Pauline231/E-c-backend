const mongoose = require("mongoose")
const adminSeed = require("../adminSeed")

exports.connectDatabase =async()=>{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("database connected succesfully")
    adminSeed();
}