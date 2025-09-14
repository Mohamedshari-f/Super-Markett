const express = require ("express")
const router = express.Router()



const customermodel = require("../Controller/CustomerController")
// const { verifytoken, isAdmin } = require("../mallware/auth")

router.post("/create/customer", customermodel.createcustomer)
router.post("/login/customer", customermodel.customerlogin)
// router.get("/read/customer", verifytoken, isAdmin, customermodel.readcustomer)
// router.get("/total/customer", customermodel.totalCustomer)


module.exports = router