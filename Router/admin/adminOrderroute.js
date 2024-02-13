const { getAllorders, getSingleOrder, updateOrderstatus, deleteOrder, updatePaymentStatus } = require("../../controller/adminuse/order/ordercontroller")
const { authenticate } = require("../../middleware/authenticate")
const roleCheck = require("../../middleware/rolecheck")
const asyncCatch = require("../../services/asyncCatch")

const router = require("express").Router()

router.route("/").get(authenticate, roleCheck("admin"),asyncCatch(getAllorders))
router.route("/:id").get(authenticate, roleCheck("admim"),asyncCatch(getSingleOrder))
                    .patch(authenticate, roleCheck("admin"), asyncCatch(updateOrderstatus))
                    .delete(authenticate, roleCheck('admin'), asyncCatch(deleteOrder))
router.route("/payment/:id").patch(authenticate, roleCheck('admin'), asyncCatch(updatePaymentStatus))

module.exports = router