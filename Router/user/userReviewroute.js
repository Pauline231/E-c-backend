const router = require("express").Router()
const { getmyReview, createReview, deleteReview } = require("../../controller/user/userReviewcontroller")
const { authenticate } = require("../../middleware/authenticate")
const roleCheck = require("../../middleware/rolecheck")
const asyncCatch = require("../../services/asyncCatch")

router.route("/:id").post(authenticate,roleCheck("admin","customer"), asyncCatch(createReview))
                            .delete(authenticate, roleCheck("admin","customer") ,asyncCatch(deleteReview))
router.route("/").get(authenticate,roleCheck("admin","customer"), asyncCatch(getmyReview))

module.exports = router 