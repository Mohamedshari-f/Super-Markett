import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function Addproduct(){

const [name, setName]= useState("")
const [price, setprice]= useState("")
const [desc, setdesc]= useState("")
const [quantity, setquantity]= useState("")
const [primage, setprimage]= useState("")
const [category, setcategory]= useState("")

const navigate= useNavigate();

const handleAdd=(e)=>{
e.preventDefault()

 const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("desc", desc);
  formData.append("quantity", quantity);
  formData.append("img", primage); 
  formData.append("category", category); 

axios.post("http://localhost:9000/create/Product", formData, {
   headers: {
          "Content-Type": "multipart/form-data",
        },
})

.then(()=>{
  toast("Added New Product!", {
    position: "top-right",
    autoClose:2000,
    hideProgressBar:false,
    onClose: (()=>navigate("/product"))
  })
  })
}

  return (
    <div className="bg-green-400 w-full max-w-3xl p-8 rounded-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Products</h2>

      <form className="flex flex-col gap-6">
        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="w-full p-2 rounded-lg border" placeholder="Enter name" />

        <input value={price} onChange={(e)=>setprice(e.target.value)}  type="number" className="w-full p-2 rounded-lg border"  placeholder="Enter price"  />

        <input value={desc} onChange={(e)=>setdesc(e.target.value)}   type="text"  className="w-full p-2 rounded-lg border" placeholder="Enter Description" />

        <input value={quantity} onChange={(e)=>setquantity(e.target.value)} type="number" className="w-full p-2 rounded-lg border" placeholder="quantity" />
        <input value={category} onChange={(e)=>setcategory(e.target.value)} type="text" className="w-full p-2 rounded-lg border" placeholder="category" />

        <input type="file" onChange={(e) => setprimage(e.target.files[0])} className="w-full p-2 rounded-lg border" />
      </form>

      <div className="flex justify-center mt-8">
        <button onClick={handleAdd} className="bg-white  text-green-900 px-6 py-2 rounded-lg">Add</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Addproduct