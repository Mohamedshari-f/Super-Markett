const mongoose = require("mongoose")

const orderschema = mongoose.Schema({
    customer:{
        type: String,
        required: true
    },
    products:[
        {
            productid: {type:mongoose.Schema.Types.ObjectId, ref:"Product", required : true },
            quantity:{ type:Number, required:true}
        }
    ],
    TotalAmount:{type:Number,required:true}
})

module.exports = mongoose.model("Order",orderschema)