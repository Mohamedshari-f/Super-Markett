const express = require ("express")
const mongoose = require ("mongoose")
const cors = require("cors")
const ProductRouter=require("./Router/productRouter")
const CustomerRouter=require("./Router/CustomerRouter")
const adminRouter = require("./Router/adminrouter")


const app = express()
app.use(cors())
app.use(express.json())



mongoose.connect("mongodb://localhost:27017/RiseMarket").then(()=> console.log("sucesseful"))


app.use(ProductRouter)
app.use(CustomerRouter)
app.use(adminRouter)
app.use("/allimages", express.static("images"))



app.listen(2100,()=>console.log(`server is running`))