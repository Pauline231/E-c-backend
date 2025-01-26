const User = require("./model/userModel")
const bcrypt = require("bcrypt")

const adminSeed = async() =>{
    const adminExist = await User.findOne({userEmail : "admin002@gmail.com"})
    if(!adminExist){
      await User.create({
            userName : "admin",
            userEmail : "admin002@gmail.com",
            userPhoneNumber :"982389380",
            userPassword : bcrypt.hashSync("adminpassword",10),
            role : "admin"
        }) 
            console.log("admin seeded succesfully")
     }else{                      
            console.log("admin is already seeded")
     }    
    }


module.exports = adminSeed