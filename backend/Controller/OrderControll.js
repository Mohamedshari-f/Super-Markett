const ordermodel = require("../Model/ordermodel")
const productmodel =require("../Model/productModel")

const createOrder=  async(req, res)=>{
    const {customer, products}=req.body

    if(!products || products.length ===0){
    
        return res.status(400).json({message:"product is required"})
    }
    let TotalAmount= 0
    let order=[]
    for(let items of products){
        const productData= await productmodel.findById(items.productid)

        if(!productData){
            return res.status(400).json({message:"this product is not found"})
        }
        let price = productData.price
        let Total = price*items.quantity
        TotalAmount += Total

        if(items.quantity > productData.quantity){
            return res.status(400).json({message:"this product is Out Of Stock"})
    
        }

        productData.quantity -= items.quantity
        await  productData.save()

        order.push({
            productid: productData._id,
            quantity: items.quantity,
            price,
            Total
        })
    }

    if(!customer){
        return res.status(400).json({message:"customer is Required"})
    }

    const newData = new ordermodel({
        customer,
        products: order,
        TotalAmount
    })

    await newData.save()
    res.send(newData)
}

const readOrder= async (req,res)=>{
    const getorderData= await ordermodel.find().populate("products.productid","name price");
    if(getorderData){
        res.send(getorderData)
    }
}

    const totalorder=async(req, res)=>{
        try{
    const total = await ordermodel.find().countDocuments()
    if(total){
        res.send({total})
    }
        }catch(error){
            console.log(error)
        }
}

//total income

const gettotalincome = async(req, res)=>{
    const TotalAmount=  await ordermodel.aggregate([
        {
            $group:{_id:null, totalincome:{$sum:"$TotalAmount"}}
        }
    ])
    if(TotalAmount){
        res.send(TotalAmount)
    }
}

const gettopcustomers= async(req, res)=>{
const topcustomer = await ordermodel.aggregate([
    {
        $group: {
            _id:"$customer",
            totalspent:{$Sum:"$TotalAmount"},
            ordercount: {$sum:1}
        }
    },

    {$sort:{totalspent: -1}},
    {$limit:1}
])
if(topcustomer.length === 0 ){
    return res.status(404).json({message:"no top Customers is there"})
}
res.json(
    topcustomer.map(item=>({
        customer:item._id,
        totalspent: item.totalspent,
        ordercount:item.ordercount
    }))
)
}


module.exports= {createOrder, readOrder, totalorder, gettotalincome, gettopcustomers}