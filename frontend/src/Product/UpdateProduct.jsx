
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Dashboard from "./Dashboard"
import { ToastContainer, toast } from 'react-toastify';
import Header from "./header";

function UpdateProduct() {
   <Header />
   const [Name, setName] = useState("")
    const [price, setprice]= useState("")
    const[desc, setdesc] = useState("")
    const[quantity, setquantity] = useState("")
    const [primage, setprimage] = useState("")
    const [category, setcategory]= useState("")

    const Navigate = useNavigate()

    const paramis= useParams()

//   console.log(paramis)

   const HundeleSingleData= ()=>{
    axios.get(`http://localhost:2100/single/Products/${paramis.id}`).then((res)=>{
        setName(res.data.name),
        setprice(res.data.price),
        setdesc(res.data.desc),
        setquantity(res.data.quantity)
        setcategory(res.data.category)
        setprimage(res.data.setprimage)
    }).catch((Error)=>console.log(Error))
   }
 useEffect(()=>{
    HundeleSingleData()
 },[])


  const formData = new FormData();
  formData.append("name", Name);
  formData.append("price", price);
  formData.append("desc", desc);
  formData.append("quantity", quantity);
   formData.append("category", category); 
  formData.append("img", primage); 

 const handleupdate =(e)=>{
    e.preventDefault()
    axios.put(`http://localhost:2100/update/Products/${paramis.id}`,formData,
        {
          headers:{
            "Content-Type":"multipart/form-data"
          }
    }).then(()=>{
         toast("this product has been Updated!", {
           position: "top-right",
           autoClose:2000,
           hideProgressBar:false,
           onClose: (()=>Navigate("/product"))
         }).catch((Error)=>console.log(Error))
    })
 }
  return (
    <div className="flex gap-10">
   <Dashboard />
     <div className="bg-green-400  w-[600px] h-[70%] p-8 rounded-xl  mt-10">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">update Product</h2>

      <form className="flex flex-col gap-6">
        <input value={Name} onChange={(e)=>setName(e.target.value)} type="text" className="w-full p-2 rounded-lg border" placeholder="Enter name" />

        <input value={price} onChange={(e)=>setprice(e.target.value)}  type="Number" className="w-full p-2 rounded-lg border"  placeholder="Enter price"  />

        <input value={desc} onChange={(e)=>setdesc(e.target.value)}  type="text"  className="w-full p-2 rounded-lg border" placeholder="Enter desc" />

        <input value={quantity} onChange={(e)=>setquantity(e.target.value)}  type="number" className="w-full p-2 rounded-lg border" placeholder="Enter quantity" />
        <input value={category} onChange={(e)=>setcategory(e.target.value)}  type="text" className="w-full p-2 rounded-lg border" placeholder="Enter category" />

        <input type="file" onChange={(e) =>setprimage(e.target.files[0])} className="w-full p-2 rounded-lg border" />
      </form>

      <div className="flex justify-center mt-8">
        <button onClick={handleupdate} className="bg-white  text-blue-600 px-6 py-2 rounded-lg">Update</button>
      </div>
    </div>
    <ToastContainer />
    </div>
  );
}

export default UpdateProduct