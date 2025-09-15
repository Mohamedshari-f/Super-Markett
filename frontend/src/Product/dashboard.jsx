import { Link } from "react-router-dom"

function Dashboard() {

  const handleLogout = ()=>{
    localStorage.removeItem("admin")
  }
        
  return <div className="flex gap-10 ">
      <div className="w-64 bg-blue-900  text-white p-5 flex flex-col min-h-screen">
        <ul className="space-y-4">
           <Link to="/cards">   <li className="flex items-center gap-2  hover:bg-blue-700 p-2 rounded"> 
         
            dashboard
          </li> </Link> 
         <Link to="/display"> <li className="flex items-center gap-2  hover:bg-blue-700  rounded"> 
         
            <i class="fa-solid fa-cart-plus"></i>Products
          </li> </Link>
          <li className="flex items-center gap-2  hover:bg-blue-700 p-2 rounded">
           <Link to="/newproduct">  <i class="fa-solid fa-cart-plus"></i>Add Products </Link>
          </li>
          <Link to="/Customer"><li className="flex items-center gap-2  hover:bg-blue-700 p-2 rounded">
         <h1> <i class="fa-solid fa-user-check"></i> Customers  </h1>
          </li> </Link>
          <Link to="/order"> <li className="flex items-center gap-2  hover:bg-blue-700 p-2 rounded">
            <i class="fa-solid fa-cart-shopping"></i> Orders
          </li> </Link> 
          <Link to="/addorder"> <li className="flex items-center gap-2  hover:bg-blue-700 p-2 rounded"> 
          <h1><i class="fa-solid fa-cart-shopping"></i>Add Orders </h1> 
          </li></Link> 
          <li className="flex items-center gap-2  hover:bg-blue-700 p-2 rounded">
           <i className="fa fa-file"></i> Reports 
          </li>
          <li className="flex items-center gap-2  hover:bg-blue-700 p-2 rounded mt-auto">
            <i class="fa-solid fa-gear"></i>settings
          </li>
        <Link to="/customerlogin">  <li onClick={handleLogout} className="flex items-center gap-2  hover:bg-blue-700 p-2 rounded mt-auto">
            <i class="fa-solid fa-gear"></i>Logout
          </li> </Link> 
        </ul>
      </div>
      <div>
      </div>
      
    </div>
  
}
export default Dashboard