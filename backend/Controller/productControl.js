const productModel = require ("../Model/productModel")

const createProduct = async (req,res)=>{
 try{
        const {name,price,desc,quantity,category} = req.body
        const newData = productModel({
            name:name,
            price:price,
            desc:desc,
            quantity:quantity,
            category:category,
            primage: req.file ? req.file.filename : undefined,
        })
       await newData.save()
        res.send(newData)
    }
    catch(error){
        console.error(error)
        res.status(400).json({message:"server error"})
    }
    
}
// read
const readProduct = async (req,res)=>{
    try{

        const{category} =req.body ||{}
        let filterData ={}
        if(category){
            filterData ={category}
        }

const perpage= req.query.page || 0
const numberofproducts= 3

        const readData = await productModel.find(filterData).skip(numberofproducts*perpage).limit(numberofproducts)
        if(readData)
        {
            res.send(readData)
        }
    } 
    catch(error){
       
        res.status(400).json({message:"server is not read product"})
    }
    
}

// update

const updateProduct = async (req,res) =>{
    try{
        const updateData = await productModel.updateOne(
            {_id:req.params.id},
            {
                $set:{
                    name:req.body.name,
                    price:req.body.price,
                    desc:req.body.desc,
                    quantity:req.body.quantity,
                    category:req.body.category,
                    prImage:req.file ? req.file.filename : undefined  
                }
            }
        )
        if(updateData){
            res.send("success update")
        }
    }
    catch(error){
        res.status(400).json({message:"server is not update product"})
    }
}

// read single
const Readsingle = async(req,res) =>{
    try{
        const readsingle = await productModel.findById(req.params.id)
        if(readsingle)
        {
            res.send(readsingle)
        }
    }
    catch(error){
        res.status(400).json({message:"server is not read single product"})
    }
   
}


// delete
const deleteProduct = async (req, res) => {
  try {
    const deleted = await productModel.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.send({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "server is not delete product" });
  }
};


//search
const searchproduct = async(req, res)=>{
    try{
        const key = req.params.key
   const searchData = await productModel.find({
    $or:[
        {name:{$regex: key, $options: "i"}},
        {desc:{$regex: key, $options: "i"}}
    ]
   }) 
   if(searchData){
    res.send(searchData)
   }
    }catch(error){
        console.log(error)
    }
}

//diplay total product

const totalproduct=async(req, res)=>{
    try{
const total = await productModel.find().countDocuments()
if(total){
    res.send({total})
}
    }catch(error){
        console.log(error)
    }
}
module.exports = {createProduct, readProduct, updateProduct, Readsingle, deleteProduct, searchproduct, totalproduct}