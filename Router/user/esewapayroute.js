const { initiateEsewa } = require("../../controller/user/esewapaycontroller")
const { authenticate } = require("../../middleware/authenticate")
const asyncCatch = require("../../services/asyncCatch")

const router = require("express").Router()

router.route("/esewa").post(authenticate, asyncCatch(initiateEsewa))

module.exports = router