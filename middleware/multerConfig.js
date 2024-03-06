const multer = require("multer")

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        //checking the mimetype of file 
        const allowedFiletypes = ['image/png','image/jpg','image/jpeg']
        if(!allowedFiletypes.includes(file.mimetype)){
            cb(new Error("This filetype is not allowed."))
            return
        }
        cb(null, "./uploads")
    },  
    filename : function(req,file,cb){
        cb(null, Date.now() +" - "+ file.originalname)
    }
})

module.exports = {multer, storage}

/*const storage = multer.memoryStorage()
const multerUploads = multer({storage}).single('image');
const dUri = new Datauri()
/**
* @description This function converts the buffer to data url
* @param {Object} req containing the field object
* @returns {String} The data url from the string buffer
*/
//const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(),req.file.buffer);*/
//module.exports = {multerUploads, dataUri}

/*const storage = multer({
    storage : multer.diskStorage({}),
    fileFilter : (req, file, cb) =>{
        let ext = path.extname(file.originalname);
        if(ext !== ".jpg" && ext !== '.jpeg' && ext !== '.png'){
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true)
    }
})*/
