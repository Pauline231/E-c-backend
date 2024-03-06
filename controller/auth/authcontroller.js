const User = require("../../model/userModel")
const bcrypt = require("bcrypt")
const sendEmail = require("../../services/sendEmail")
const jwt = require("jsonwebtoken")


exports.registerUser = async(req,res)=>{
    const {name, email, password, phoneNumber} = req.body
    if(!name || !email || !password || !phoneNumber){
      return  res.status(400).json({
            message : 'Please provide your credentials'
        })
    }
    //checking if useremail is already registered
    const userFound = await User.find({userEmail:email})
    if (userFound.length > 0){
        return res.status(400).json({
            message : "Usermail is already registered"
        })
    }

    //else
   const user = await User.create({
        userName : name,
        userEmail : email,
        userPassword : bcrypt.hashSync(password, 10),
        userPhoneNumber : phoneNumber
    })
    res.status(201).json({
        message : "User created successfully",
        data : user
    })
}

exports.loginUser = async(req,res)=>{
    const {email, password} = req.body
    if(!email||!password){
        return res.status(400).json({
            message : "Please fill in your email and password"
        })
    }
    //checking userEmail
    const userFound = await User.find({userEmail : email})
    if (userFound == 0){
        return res.status(404).json({
            message : "User with that email is not found."
        })
    }
    //checking password
    const isMatched = bcrypt.compareSync(password, userFound[0].userPassword)
    if(isMatched == false){
        res.status(400).json({
            message : "Invalid Password"
        })
    }else{
        //creating token
        const token = jwt.sign({id :userFound[0]._id }, process.env.SECRET_KEY,{
            expiresIn : "20d"
        })
        res.status(200).json({
            message : "User logged in successfully.",
            data :token
        })
    }
}
exports.forgotPassword =async(req,res)=>{
    const {email} = req.body //email address of the user
    if(!email){
        return res.status(400).json({
            message : "Please provide your email."
        })
    }
    //checking if the email exists
    const userFound = await User.find({userEmail: email})
    if(userFound.length == 0){
        return res.status(400).json({
            message : "User with that email doesn't exist."
        })
    }
    //sending otp to the email
    const otp = Math.floor(1000*Math.random()*9000)
    userFound[0].otp = otp
    await userFound[0].save()

    await sendEmail({
        email : email, //email address of the user
        subject : 'Otp code for forgotten password',
        text : `Your otp is ${otp}. Do not share with anyone.`
    })
    res.status(200).json({
        message : "otp sent to your gmail"
    })
}
exports.verifyOtp = async(req, res)=>{
    const {email, otp} = req.body
    //checking email and otp
    if(!email || !otp){
     return res.status(200).json({
            message: "Please provide your otp"
        })
    }
    //checking if the email is registered
    const userFound = await User.find({userEmail: email})
    if(userFound.length == 0){
     return res.status(400).json({
            message: 'The email is not registered'
        })
    }
    //checking the correct otp
    if (userFound[0].otp != otp){
     return res.status(400).json({
            message: "Incorrect otp"
        })
    }
    //isotpverified status remaining    
    res.status(200).json({
        message: "Otp is correct and verified."
    })
    userFound[0].otp = undefined
    await userFound[0].save()
}
exports.resetPassword = async(req, res) =>{
    const {email, newPassword , confirmPassword}= req.body
    if(!email ||!newPassword || !confirmPassword){
     return res.status(400).json({
        message: "Please provide your new password and confirm it."
     })
    }
    //checking  both password
    if(newPassword != confirmPassword){
     return res.status(400).json({
        message : "Password does not match"
     })
    }
    //finding the user
    const userFound = await User.find({userEmail: email})
    userFound[0].userPassword = bcrypt.hashSync(newPassword, 10)
    userFound[0].save()
    res.status(200).json({
        message : "New password set successfully."
    })
}
