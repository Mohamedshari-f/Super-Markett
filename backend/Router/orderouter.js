const express = require ("express")
const router = express.Router()

const ordermodel = require("../Controller/OrderControll")

router.post("/create/order", ordermodel.createOrder)
router.get("/read/order", ordermodel.readOrder)
router.get("/total/order", ordermodel.totalorder)
module.exports = router