const express = require ("express")
const router = express.Router()


const adminmodel = require("../Controller/admincontroller")

router.post("/create/admin", adminmodel.createadmin)
router.post("/login/admin", adminmodel.adminlogin)


module.exports = router