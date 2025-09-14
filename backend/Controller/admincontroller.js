const Adminmodel = require("../Model/Adminmodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

// create customer
const createadmin= async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if email already exists
    const existedemail = await Adminmodel.findOne({ email });
    if (existedemail) {
      return res.status(400).json({ message: "Email has already existed!" });
    }

    // hash password
    const hashpassword = await bcrypt.hash(password, 10);

    // save customer
    const newData = new Adminmodel({
      name,
     email,
      password: hashpassword,
    });

    await newData.save();

    res.status(201).json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating Admin" });
  }
};


const adminlogin= async(req,res) =>{
  try{

      // check if email already exists
  const {email, password}= req.body
   const existedemail = await Adminmodel.findOne({ email });
    if (!existedemail) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    const checkpassword = await bcrypt.compare(password,existedemail.password)
    if(!checkpassword){
      return res.status(400).json({ message: "Invalid password" });
    }
   const token = jwt.sign(
    {id:existedemail._id, name: existedemail.name, email:existedemail.email, role: existedemail.role},
    "mysecret", {expiresIn: "30s"}
      )

    res.send({
      message:"Successfully Login",
      admin:{
        name: existedemail.name,
        email:existedemail.email,
        role:existedemail.role
      },
      token
    })
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating Admin" });
  }
}


module.exports = {createadmin, adminlogin}