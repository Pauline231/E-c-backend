const {DataService} = require('../../controller/adminuse/misc/data')
const { authenticate } = require('../../middleware/authenticate')
const roleCheck = require('../../middleware/rolecheck')
const asyncCatch = require('../../services/asyncCatch')

const router = require("express").Router()

router.route('/misc/datas').get(authenticate,roleCheck("admin"),asyncCatch(DataService))

module.exports = router