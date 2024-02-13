const User = require("../../model/userModel")
const bcrypt = require("bcrypt")

exports.getMyprofile = async(req,res)=>{
    const id = req.user.id
    const myProfile = await User.findById(id).select("-userPassword")
    res.status(200).json({
        message : 'Profile fetched succesfully',
        data : myProfile
    })
}

exports.updateMyProfile = async(req,res)=>{
    const id = req.user.id
    const {userName, userEmail, userPhoneNumber} = req.body
    if(!userName && !userEmail && !userPhoneNumber){
        return res.status(400).json({
            message : "Please provide your updated information."
        })
    }
    //update Profile
    const updatedProfile = await User.findByIdAndUpdate(id,{
        userName,
        userEmail,
        userPhoneNumber
    }).select("-userPassword")
    res.status(200).json({
        message : "Profile updated successfully.",
        data : updatedProfile
    })
}

exports.deleteMyprofile = async(req,res) =>{
    const {id} = req.user.id
    await User.findByIdAndDelete(id)
    res.status(200).json({
        message : "User profile deleted successfully."
    })
}

exports.changePassword = async(req,res)=>{
    const id = req.user.id
    const {password, newPassword, confirmPassword} = req.body
    if(!password||!newPassword||!confirmPassword){
        return res.status(400).json({
            message : "Please provide your password,newPassword and confirm it."
        })
    }
    if( newPassword != confirmPassword) {
        return res.status(400).json({
            message : "Your new password does not match with the confirmPassword."
        })
    }
    const currentUser = await User.findById(id)
    const currentPassword = currentUser.userPassword
    const correctPassword = bcrypt.compareSync(password, currentPassword)
    if(!correctPassword){
        res.status(403).json({
            message : "Password does not match."
        })
    }else{
        //changing password if the password matches
        currentUser.userPassword = bcrypt.hashSync(newPassword,10)
        await currentUser.save()
        res.status(200).json({
            message : "Password changed successfully."
        })
    }
}