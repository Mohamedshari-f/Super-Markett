const customerModel = require ("../Model/Customer")
const bcrypt = require("bcryptjs");

// create customer
const createcustomer= async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    // check if email already exists
    const existedemail = await customerModel.findOne({ email });
    if (existedemail) {
      return res.status(400).json({ message: "Email has already existed!" });
    }

    // hash password
    const hashpassword = await bcrypt.hash(password, 10);

    // save customer
    const newData = new customerModel({
      name,
      phone,
      email,
      password: hashpassword,
    });

    await newData.save();

    res.status(201).json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating customer" });
  }
};


const customerlogin = async(req,res) =>{
  try{

      // check if email already exists
  const {email, password}= req.body
   const existedemail = await customerModel.findOne({ email });
    if (!existedemail) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    const checkpassword = await bcrypt.compare(password,existedemail.password)
    if(!checkpassword){
      return res.status(400).json({ message: "Invalid password" });
    }
    res.send({
      message:"Successfully Login",
      customer:{
        name: existedemail.name,
        email: existedemail.email,
        phone: existedemail.phone
      }
    })
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating customer" });
  }
}

const readcustomer= async(req,res)=>{
  const getcustomer = await customerModel.find()
  if (getcustomer){
    res.send(getcustomer)
  }
}

const totalCustomer=async(req, res)=>{
    try{
const total = await customerModel.find().countDocuments()
if(total){
    res.send({total})
}
    }catch(error){
        console.log(error)
    }
  }

module.exports = {createcustomer, customerlogin, readcustomer, totalCustomer}