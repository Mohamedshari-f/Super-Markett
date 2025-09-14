import { Link } from "react-router-dom"

import { useEffect, useState } from "react"
import axios from "axios"
import Header from "../Product/header"

function Home(){
     const [data, setData] = useState([])
     

       const handleDataRead=()=>{
    axios.get("http://localhost:9000/read/Products").then((res)=>{
      setData(res.data)
    })
  }
  useEffect(()=>{
    handleDataRead()
  },[])

  const handleStoreData = (data) => {
  // get all data from localStorage
  const newData = JSON.parse(localStorage.getItem("products")) || [];
const existid=newData.some((item)=>item._id===data._id)
if(!existid){
  newData.push(data);
  localStorage.setItem("products", JSON.stringify(newData));
}

};

    return <div>
       <Header />
        <div className="flex justify-around px-10 mt-10">
            <div className="">
                <h1 className="font-semibold text-4xl text-slate-600 w-60">Discover Your Next Favorite Product</h1>
                <p className="text-1xl text-gray-400 py-5">Lorem ipsum dolor sit amet, consectetur <br /> adipisicing elit. Iste, consequatur?</p>
             <Link to="/display"><button className="bg-green-400 px-4 text-2xl text-white rounded-lg">shop now</button> </Link>
                <button className="bg-green-400 px-4 text-2xl text-white rounded-lg ml-5">our Dashboard</button>
            </div>
            <img className="w-[250px] rounded-full " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF8Mj47Rzqrf5O_fNNmtv6SG7oYvFbxvQJrQ&s" alt="" />
        </div>

        <div className="ml-1 mt-7 mb-5">
          <h1 className="text-4xl font-semibold text-center">Categories</h1>
          <form action="" className="flex text-center justify-center items-center pb-10 pt-2">
            <input className="w-4 h-6 font-semibold" type="radio" /><span className="text-2xl ml-1 mr-2">Mobile</span><br /> <br />
            <input className="w-4 h-6 font-semibold" type="radio" /><span className="text-2xl ml-1 mr-2">Smartwatch</span> <br /> <br />
            <input className="w-4 h-6 font-semibold" type="radio" /><span className="text-2xl ml-1 mr-2">Tv</span> <br /> <br />
            <input className="w-4 h-6 font-semibold" type="radio" /><span className="text-2xl ml-1 mr-2">Iphone</span>
          </form>
        </div>

        <div className="flex flex-wrap w-full gap-6 justify-around h-[500px] mb-10">
         {
            data.map((item)=>{
                return <div className="w-[240px] h-[350px] border border-gray-200 pb-5 mb-6">
            <img className="w-[210px] h-[200px] mt-2 mb-6 rounded-lg ml-2" src={`http://localhost:9000/allimages/${item.primage}`} alt="" />
            <div className="flex justify-between gap-5">
                <h1 className="text-2xl">{item.name}</h1>
                <h1 className={`${item.status==="Available"? "text-green-600 text-2xl":"text-red-600 text-2xl whitespace-nowrap"} `}>{item.status}</h1>
            </div>
             <div className="flex justify-between gap-5 px-2">
                <h1 className="text-3xl font-semibold">${item.price}</h1>
                <button onClick={() => handleStoreData(item)} disabled={item.status !== "Available"}   className={`${item.status === "Available"  ? "bg-yellow-500 text-white px-6 py-1 mt-2 p-2 rounded "  : "bg-gray-400 text-black font-semibold px-6 mt-2 rounded line-through"}`}> <i class="fa-solid fa-cart-shopping "></i><span>Add</span></button>
            </div>
        </div>
            })
         }
        </div>
    </div>

}
export default Home