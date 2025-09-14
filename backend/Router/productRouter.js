const express = require ("express")
const router = express.Router()

const uploadImage = require ("../Mallware/uploadImage")
const productmodel = require("../Controller/productControl")

router.post("/create/Product", uploadImage.single("img"), productmodel.createProduct);
router.get("/read/Products", productmodel.readProduct);
router.get("/single/Products/:id", productmodel.Readsingle);
router.delete("/delete/product/:id", productmodel.deleteProduct);
router.put("/update/Products/:id", uploadImage.single("img"), productmodel.updateProduct);
router.get("/search/Products/:key", productmodel.searchproduct);
router.get("/total/product", productmodel.totalproduct);


module.exports = router