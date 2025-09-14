import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
// import Header from "./header";

function Customer(){
const [CustomerName, SetCustomername] = useState("")
const [Email, setEmail] = useState("")
const [Customerphone, SetCustomerphone] = useState("")
const [password, Setpassword] = useState("")

const [active, setactive] = useState("customer")


const navigate = useNavigate()

function handleinsert(e){
e.preventDefault()

const url = active==="customer" ? "http://localhost:2100/create/customer":"http://localhost:2100/create/admin"
const payload= active==="customer" ? {name:CustomerName, phone:Customerphone, email:Email, password:password}: {name:CustomerName, email:Email, password:password}

axios.post(url, payload).then((res)=>{
 toast(`this ${active} has been Registred!`, {
           position: "top-right",
           autoClose:2000,
           hideProgressBar:false,
           onClose: (()=>navigate("/CustomerLogin"))
         })

}).catch((Error)=>{if(Error){
  toast.error("this Email has Already Existed!")
}else{
  toast.error("server Error")
}})
}

  return (
    <div>
      {/* <Header /> */}
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
     
      <form className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-4"> {active==="customer"?"Customer Registration":"Admin Registration"} </h2>
         <div className="flex justify-center gap-8">
        <button onClick={()=>setactive("customer")} className={`px-8 py-3 rounded-lg ${active==="customer" ? "bg-green-500 text-white":"border-2 border-black text-black"}`}>customer</button>
        <button onClick={()=>setactive("admin")} className={`px-8 py-3 rounded-lg ${active==="admin" ? "bg-green-500 text-white":"border-2 border-black text-black"}`}>Admin</button>
      </div>
       <label className="block mb-2">{active ==="customer" ? "Customer Name":"Admin Name"}</label>
        <input value={CustomerName} onChange={(e)=>SetCustomername(e.target.value)} type="text" name="name" className="w-full p-2 mb-4 outline-none border-green-400 border rounded-full" required />

        <label className="block mb-2">Email</label>
        <input value={Email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email"  className="w-full p-2 mb-4 border border-green-400 outline-none rounded-full" required/>
        <div style={{display:active !=="customer" ? "none":""}}>
        <label className="block mb-2">Phone</label>
        <input value={Customerphone} onChange={(e)=>SetCustomerphone(e.target.value)} type="text" name="phone"  
          className="w-full p-2 mb-4 border border-green-400 outline-none  rounded-full"
          required/>
          </div>

        <label className="block mb-2">Password</label>
        <input  value={password} onChange={(e)=>Setpassword(e.target.value)}  type="password"  name="password"  className="w-full p-2 mb-4 border outline-none border-green-400  rounded-full" required />

 <button type="submit" onClick={(e)=>handleinsert(e)} className="w-full bg-green-400 text-white py-2 rounded-full hover:bg-green-700 ">{active==="customer"?"Register Customer":"Register Admin"}</button>
      </form>
    </div>
    <ToastContainer />
    </div>
  );
}

export default Customer