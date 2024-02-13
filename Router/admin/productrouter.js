const {createProduct, deleteProduct, updateProduct}= require("../../controller/adminuse/product/productcontroller")
const {authenticate} = require("../../middleware/authenticate")
const {getProducts, getProduct} = require("../../controller/global/global")
const roleCheck = require("../../middleware/rolecheck")
const {multer, storage} = require("../../middleware/multerConfig")
const upload = multer({storage : storage})
const asyncCatch = require('../../services/asyncCatch')

const router = require("express").Router()

router.route("/")
    .post(authenticate,roleCheck("admin"),upload.single('productImage'),asyncCatch(createProduct))
    .get(getProducts)

router.route("/:id")
    .get(getProduct).delete(authenticate,roleCheck('admin'),asyncCatch(deleteProduct))
    .patch(authenticate, roleCheck("admin"),upload.single('productImage'),asyncCatch(updateProduct))

module.exports = router