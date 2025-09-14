import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Header from "./header";
import Dashboard from "./dashboard";

function Product(){

 
  const [page, setPage] = useState(0)

  const [data, setData] = useState([])
  const handlenext =()=>{
    setPage(page +1)
  }

  const handleprev=()=>{
    if(page > 0){
    setPage(page -1)
    }
}
  const handleDataRead=()=>{
    axios.get(`http://localhost:2100/read/Products?page=${page}`).then((res)=>{
      setData(res.data)
    })
  }
  useEffect(()=>{
    handleDataRead()
  },[page])

  const handledelete=(id)=>{

    if (window.confirm("Are You sure To delete This Product?")){
    axios.delete(`http://localhost:2100/delete/product/${id}`).then(()=>{

      toast("this product has been deleted!", {
           position: "top-right",
           autoClose:1000,
           hideProgressBar:false,
           
         });
          handleDataRead()

    }).catch((Error)=>console.log(Error));
   
            }}


            const handlesearchData= (id)=>{
              const key = id.target.value
              if (key){ 
              axios.get(`http://localhost:2100/search/Products/${key}`).then((res)=>{
                setData(res.data)
              }).catch((Error)=>{console.log(Error) })
            }
            else{
              handleDataRead()
            }
            }
           

  return <>
   <Header />
  <div className="flex gap-14 mt-4">
    <Dashboard/>
 <div className="p-6">
 <div className="flex justify-between px-6 ">
     <h1 className=" text-green-300 py-6 px-1 text-3xl font-semibold rounded-lg">Product-list</h1> 
     <div className="mt-6 gap-5">
      <input onChange={handlesearchData} type="text" placeholder="Search Product ..." className="px-3 py-2 h-8 border border-green-500 outline-none rounded-full"/>
    <Link to="/newproduct"> <button className="bg-green-300 px-3 py-2 rounded-lg ml-2 text-white">Add Product</button> </Link>
     </div>
     </div>
     
      <div className="">
        <table className="bg-white border border-gray-200 w-[80%] border-collapse table-auto">
  <thead className="bg-green-100">
    <tr>
      <th className="px-4 py-2 border text-left">ID</th>
      <th className="px-4 py-2 border text-left">Name</th>
      <th className="px-4 py-2 border text-left">price</th>
      <th className="px-4 py-2 border text-left">desc</th>
      <th className="px-4 py-2 border text-left">Quantity</th>
      <th className="px-4 py-2 border text-left">category</th>
      <th className="px-4 py-2 border text-left">primage</th>
      <th className="px-4 py-2 border text-left">status</th>
      <th className="px-4 py-2 border text-left">Options</th>
    </tr>
  </thead>
  {
   data.length > 0 ? data.map((item)=>{
      return <tbody>
    <tr className="text-center">
      <td className="px-4 py-2 border">{item.prid}</td>
      <td className="px-4 py-2 border">{item.name}</td>
      <td className="px-4 py-2 border">${item.price}</td>
      <td className="px-4 py-2 border">{item.desc}</td>
      <td className="px-4 py-2 border">{item.quantity}</td>
      <td className="px-4 py-2 border">{item.category}</td>
      <td className="px-4 py-2 border"><img className="w-28 h-20" src={`http://localhost:2100/allimages/${item.primage}`} alt="" /></td>
      <td className={`px-4 py-2 whitespace-nowrap ${item.status==="Available"? "text-green-600 text-3xl":"text-3xl text-red-600"} border`}>{item.status}</td>
      <td className="px-4 py-2 border border-b-0 flex justify-center gap-2">
    <Link to={`/updateproduct/${item._id}`}><i className="fa-solid fa-edit text-green-700  text-2xl"></i> </Link> 
        <i onClick={()=>handledelete(item._id)} className="fa-solid fa-trash text-red-700  text-2xl"></i>
      </td>
    </tr>
  </tbody> 
     })
     :
     <h1 className="mt-5 text-center text-2xl whitespace-nowrap text-red-700 font-semibold uppercase">there is no data</h1>
  }
    
</table>
     
     <div className="pt-8 pb-8 pl-[56%]">
      <button onClick={handleprev} className="bg-green-800 font-semibold px-6 py-1 rounded-full text-white ">Prev</button>
      <button onClick={handlenext} className="bg-green-800 font-semibold px-6 py-1 rounded-full text-white ml-2">Next</button>
     </div>

      </div>
    </div>
    </div>
    <ToastContainer />
  </>
};

export default Product