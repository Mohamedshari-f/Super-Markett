import axios from "axios"
import { useEffect, useState } from "react"
import Dashboard from "./dashboard"

function Report(){


    const [totalincome, settotalincome] = useState([0])
    const [topcustomer, settopcustomer]= useState([])


    const handletopcustomer=()=>{
      axios.get("http://localhost:2100/gettopcustomer/order").then((res)=>{
        settopcustomer(res.data)
      })
    }

    const handlegetincome= ()=>{
        axios.get("http://localhost:2100/getincome/order").then((res)=>{
            settotalincome(res.data[0].totalincome)
        })
    }

  useEffect(()=>{
    handlegetincome()
    handletopcustomer()
  })
    return <div className="flex gap-7">
        <Dashboard />
    <div className="bg-green-600 w-80 h-20 rounded-lg px-5 mt-4">
      <div>
   <h1 className="text-3xl font-semibold text-center text-white">Total Income</h1>
   <h1 className="text-3xl font-semibold text-center text-white">${totalincome}</h1>
   </div>
   <div>
    <table className=" mt-20">
   
      <thead>
        <tr>
          <th className="px-10 py-4">Customer</th>
          <th className="px-10 py-4">Total Spend</th>
          <th className="px-10 py-4">Total order</th>
        </tr>
      </thead>
   
    {
      topcustomer.map((item)=>{
        return<tbody>
          <tr>
            <td className="px-10 py-4 text-center">{item.customer}</td>
            <td className="px-10 py-4 text-center">{item.totalspent}</td>
            <td className="px-10 py-4 text-center">{item.ordercount}</td>
          </tr>
        </tbody>
      })
    }
    </table>
   </div>
   </div>
    </div>
}

export default Report