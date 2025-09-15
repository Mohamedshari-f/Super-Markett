import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Dashboard from "./dashboard";


function DashboardCards() {

    const [total, settotal]= useState([])
    const [totalcustomer, settotalcustomer]= useState([])
    const [totalorder, settotalorder]= useState([])
     

    const handletoatalCustomer=()=>{
      axios.get("http://localhost:2100/total/customer").then((res)=>{
      settotalcustomer(res.data.total)
      }).catch((error)=>console.log(error))
    }

    const handletoatalorder=()=>{
      axios.get("http://localhost:2100/total/order").then((res)=>{
      settotalorder(res.data.total)
      }).catch((error)=>console.log(error))
    }

    const handletotalproduct= ()=>{
        axios.get("http://localhost:2100/total/product").then((res)=>{
            settotal(res.data.total)
        }).catch((error)=>console.log(error))
    }

    useEffect(()=>{
      handletoatalCustomer()
      handletotalproduct()
      handletoatalorder()  
    },[])
  return (
    <div className="flex gap-10">

     <Dashboard />

    <div className="flex justify-center items-center gap-6 mt-10">
      <div className="bg-red-400 text-white w-48 h-32 flex flex-col justify-center items-center rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">All Products</h2>
        <p className="text-2xl font-bold">{total}</p>
      </div>

      <div className="bg-green-400 text-white w-48 h-32 flex flex-col justify-center items-center rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">All Customers</h2>
        <p className="text-2xl font-bold">{totalcustomer}</p>
      </div>

      <div className="bg-blue-400 text-white w-48 h-32 flex flex-col justify-center items-center rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Orders</h2>
        <p className="text-2xl font-bold">{totalorder}</p>
      </div>
    </div>
      </div>
  );
}

export default DashboardCards;