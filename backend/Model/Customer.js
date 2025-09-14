const mongoose = require("mongoose")


const customerSchema= mongoose.Schema({
    name:{type:String, reuired:true},
    phone:{type:Number, reuired:true},
    email:{type:String, reuired:true, unique:true},
    password:{type:String, reuired:true}
})
module.exports= mongoose.model("customer",customerSchema)