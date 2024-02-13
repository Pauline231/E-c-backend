const router = require("express").Router()
const { getUsers, deleteUser } = require("../../controller/adminuse/user/userADcontroller")
const { authenticate } = require("../../middleware/authenticate")
const roleCheck = require("../../middleware/rolecheck")
const asyncCatch = require("../../services/asyncCatch")

router.route("/").get(authenticate,roleCheck("admin"),asyncCatch(getUsers))
router.route("/:id").delete(authenticate,roleCheck("admin"),asyncCatch(deleteUser))

module.exports = router
