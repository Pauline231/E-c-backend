const { getMyprofile, updateMyProfile, deleteMyprofile, changePassword } = require("../../controller/user/userProfilecontroller")
const { authenticate } = require("../../middleware/authenticate")
const asyncCatch = require("../../services/asyncCatch")

const router = require("express").Router()

router.route("/").get(authenticate, asyncCatch(getMyprofile))
                             .post(authenticate,asyncCatch(updateMyProfile))
                             .delete(authenticate, asyncCatch(deleteMyprofile))

router.route("/changepassword").post(authenticate, asyncCatch(changePassword))                    

module.exports = router