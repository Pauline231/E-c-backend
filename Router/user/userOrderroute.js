const { getMyorder, createOrder } = require("../../controller/user/ordercontroller")
const {authenticate} = require("../../middleware/authenticate")
const asyncCatch = require("../../services/asyncCatch")

const router = require("express").Router()

router.route("/").get(authenticate, asyncCatch(getMyorder))
                 .post(authenticate, asyncCatch(createOrder))

module.exports = router