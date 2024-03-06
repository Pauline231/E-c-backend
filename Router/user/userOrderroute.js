const { getMyorder, createOrder, updateMyorder, deleteMyorder, cancelMyorder } = require("../../controller/user/ordercontroller")
const {authenticate} = require("../../middleware/authenticate")
const asyncCatch = require("../../services/asyncCatch")

const router = require("express").Router()

router.route("/").get(authenticate, asyncCatch(getMyorder))
                 .post(authenticate, asyncCatch(createOrder))
router.route('/:id').patch(authenticate, asyncCatch(updateMyorder))
                    .delete(authenticate, asyncCatch(deleteMyorder))
router.route('/').patch(authenticate, asyncCatch(cancelMyorder))
module.exports = router