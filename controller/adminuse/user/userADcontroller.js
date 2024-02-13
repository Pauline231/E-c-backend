const User = require("../../../model/userModel")

exports.getUsers = async(req,res)=>{
    const userId = req.user.id
    const users = await User.find({_id : { $ne :userId }}).select(["-userPassword"])
    if(users.length > 1){
        res.status(200).json({
            message : "Users fetched succesfully",
            data : users
        })
    }else{
        res.status(400).json({
            message : "Could not get users"
        })
    }
}

//delete User api
exports.deleteUser = async(req,res)=>{
    const {id} = req.params
    const userFound = await User.findById(id)
    if(!userFound) {
        return res.status(400).json({
            message : "User with that id not found"
        })
    }
    await User.findByIdAndDelete(id)
    res.status(200).json({
        message: "User deleted succesfully."
    })
}