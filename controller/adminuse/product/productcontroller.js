const fs = require("fs")
const Product= require("../../../model/productModel")

exports.createProduct =async(req, res)=>{
    const file = req.file
    let filePath
    if(!file){
        filePath = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D"
    } 
    else{
        filePath = req.file.filename
    }
    const {productName, productDescription,productPrice,productQty,productStatus} = req.body
    if(!productName || !productDescription||! productPrice||! productQty|| ! productStatus){
        return res.status(400).json({
            message : "Please provide all the contents"
        })
    }
    //creating new product
    await Product.create({
        productName,
        productDescription,
        productPrice,
        productQty,
        productStatus,
        productImage : process.env.BACKEND_URL + filePath
    })
    res.status(200).json({
        message : "Product created succesfully."
    })
}

exports.deleteProduct = async(req, res)=>{
    const {id} = req.params
    if(!id){
        return res.status(400).json({
            message : "Please provide id"
        })                
    }
     await Product.findByIdAndDelete(id)
     res.status(200).json({
        message: 'Product deleted succesfully'
     })
}

exports.updateProduct = async(req, res)=>{
    const {id} = req.params
    
    const {productName, productDescription,productPrice,productQty,productStatus} = req.body
    if(!productName || !productDescription||! productPrice||! productQty|| ! productStatus|| !id){
        return res.status(400).json({
            message : "Please provide all the contents"
        })
    }
    const oldData = await Product.findById(id)
    if(!oldData){
        return res.status(400).json({
            message : "Could not find the product with that id"
        })                                 
    }
    oldImage = oldData.productImage
    const sliceLength = process.env.BACKEND_URL.length
    const afterSlice = oldImage.slice(sliceLength)
    if(req.file && req.file.filename){
        await fs.unlink("./uploads/" +afterSlice, (err)=>{
            if(err){
                console.log('error deleting file',err)
            }else{
                console.log("file deleted succesfully")
            }
        })
    }
    const data = await Product.findByIdAndUpdate(id,{
        productDescription,
        productImage: req.file && req.file.filename ? process.env.BACKEND_URL + req.file.filename : oldImage,
        productName,
        productPrice,
        productQty,
        productStatus
    })
    res.status(200).json({
        message : "Product updated succesfully"
    })
}