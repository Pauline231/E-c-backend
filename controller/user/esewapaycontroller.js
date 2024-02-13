const {default:axios} = require("axios")
const {createHmac} = require("node:crypto")
const Order = require("../../model/orderModel")
const {Buffer}= require("node:buffer")

exports.initiateEsewa = async(req,res)=>{
    const {orderId, amount} = req.body
    if(!orderId||!amount){
        return res.status(400).json({
            message : "Please provide orderId and amount."
        })
    }
  /*  const order = await Order.findById(orderId)
    if(!order){
        return res.status(404).json({
            message : "No order found with that id."
        })
    }
    //checking if the total amount of order is equal to amount
    if(order.totalAmount != amount){
        return res.status(400).json({
            message : "The total amount does not match with the amount provided."
        })
    }*/
    const inputForHash = `total_amount=${amount},transaction_uuid=${orderId},product_code=EPAYTEST`
    const SecretKey = process.env.SECRET_KEY_ESEWA
    const hash = createHmac('sha256', SecretKey).update(inputForHash).digest('base64')
    //form data for esewa 
    const data = {
        "amount": amount,
        "failure_url": "http://localhost:3000/",
        "product_delivery_charge": "0",
        "product_service_charge": "0",
        "product_code": "EPAYTEST",
        "signature": hash,
        "signed_field_names": "total_amount,transaction_uuid,product_code",
        "success_url": "http://localhost:3000/success",
        "tax_amount": "0",
        "total_amount": amount,
        "transaction_uuid": orderId
        }
    const response = await axios.post("https://epay.esewa.com.np/api/epay/main/v2/form",data)
    const bufResponse = Buffer.from(response,"base64")
}