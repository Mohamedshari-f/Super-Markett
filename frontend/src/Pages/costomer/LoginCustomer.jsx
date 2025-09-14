import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
// import Header from "./header";

function CustomerLogin(){
const [Email, setEmail] = useState("")
const [password, Setpassword] = useState("")
const [active, setactive] = useState("customer")



const navigate = useNavigate()

function handleinsert(e){
e.preventDefault()

const url = active==="customer" ? "http://localhost:2100/login/customer":"http://localhost:2100/login/admin"
const payload= active==="customer" ? {email:Email, password:password}: {email:Email, password:password}

axios.post(url,payload).then((res)=>{
 toast(`${active} Login Successefully`,
  {       position: "top-right",
           autoClose:2000,
           hideProgressBar:false,
          //  onClose: (()=>navigate("/"))
         })
         setTimeout(()=>navigate(active==="customer"?"/":"/cards"),1500)
         localStorage.setItem(active==="customer"? "customer":"admin",JSON.stringify(res))

}).catch((Error)=>{if(Error){
  toast.error("Email or Password Is Incorrect!")
}else{
  toast.error("server Error")
}})
}

  return (
    <div>
      {/* <Header /> */}
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-4"> {active==="Customer"?"Customer Login":"Admin Login"} </h2>

        <div className="flex justify-center gap-8">
        <button onClick={()=>setactive("customer")} className={`px-8 py-3 rounded-lg ${active==="customer" ? "bg-green-500 text-white":"border-2 border-black text-black"}`}>customer</button>
        <button onClick={()=>setactive("admin")} className={`px-8 py-3 rounded-lg ${active==="admin" ? "bg-green-500 text-white":"border-2 border-black text-black"}`}>Admin</button>
      </div>
      
        <label className="block mb-2">Email</label>
        <input value={Email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email"  className="w-full p-2 mb-4 border border-green-400 outline-none rounded-full" required/>

        <label className="block mb-2">Password</label>
        <input  value={password} onChange={(e)=>Setpassword(e.target.value)}  type="password"  name="password"  className="w-full p-2 mb-4 border outline-none border-green-400  rounded-full" required />

 <button type="submit" onClick={(e)=>handleinsert(e)} className="w-full bg-green-400 text-white py-2 rounded-full hover:bg-green-700 ">{active==="customer"?" Login Customer ":"Login Admin"}</button>
      </form>
    </div>
    <ToastContainer />
    </div>
  );
}

export default CustomerLogin