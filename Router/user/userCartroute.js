const { addtoCart, getMyCartItems, deleteItemsFromCart, updateCartItems } = require("../../controller/user/cartcontroller")
const { authenticate } = require("../../middleware/authenticate")
const asyncCatch = require("../../services/asyncCatch")

const router = require("express").Router()

router.route("/:id")
                .post(authenticate,asyncCatch(addtoCart))
                .delete(authenticate, asyncCatch(deleteItemsFromCart))
                .patch(authenticate,asyncCatch(updateCartItems))
               

router.route("/").get(authenticate,asyncCatch(getMyCartItems))
                
module.exports = router