const multer = require("multer")

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        //checking the mimetype of file 
        const allowedFiletypes = ['image/png','image/jpg','image/jpeg']
        if(!allowedFiletypes.includes(file.mimetype)){
            cb(new Error("This filetype is not allowed."))
        }
        cb(null, "./uploads")
    },
    filename : function(req,file,cb){
        cb(null, Date.now() +" - "+ file.originalname)
    }
})

module.exports = {multer, storage}