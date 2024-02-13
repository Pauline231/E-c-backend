const roleCheck = (...roles) =>{
    return (req,res,next)=>{ 
        userRole = req.user.role
        console.log(userRole)
        if(!roles.includes(userRole)){
            res.status(403).json({
                message : "Not allowed"
            })
        }else{
            next()
        }
    }
}
module.exports = roleCheck