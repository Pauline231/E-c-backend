const {registerUser, loginUser, forgotPassword, verifyOtp, resetPassword} = require("../../controller/auth/authcontroller")
const asyncCatch = require("../../services/asyncCatch")

const router = require("express").Router()

router.route("/register").post(asyncCatch(registerUser))
router.route("/login").post(loginUser)
router.route('/forgotpassword').post(asyncCatch(forgotPassword))
router.route('/verifyotp').post(asyncCatch(verifyOtp))
router.route('/resetpassword').post(asyncCatch(resetPassword))

module.exports = router