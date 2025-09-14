const jwt= require("jsonwebtoken")


const verifytoken =(req,res,next)=>{
    const token= req.headers["authorization"];
     console.log("Authorization Header:", token);
    if(!token){
        return res.status(401).json({message: "no token provided"})
    }
    try{
     const decoded= jwt.verify(token.split(" ")[1],"mysecret")
     req.user= decoded
     next()
    } catch(error){
        res.status(401).json({message: "invalid token"})
    }
}

    const isAdmin= (req, res, next)=>{
        if(req.user.role !=="admin"){
            return res.status(403).json({message:"admin Only"})
        }
        next()
    }


module.exports = {verifytoken, isAdmin}