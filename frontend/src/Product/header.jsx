
import { Link } from "react-router-dom"

function Header(){

    const getCustomer= localStorage.getItem("customer")
    const handleLogout = ()=>{
        localStorage.clear()
    }
   
    return <div>
        <div className="flex justify-between px-10 mt-3">
            <h1 className="text-3xl font-semibold">Logo</h1>
            <ul className="font-semibold text-2xl flex gap-10">
              <Link to="/"> <li>Home</li> </Link> 
                <li>About</li>
                <li>Services</li>
                <li>Contact</li>
            </ul>
            <div className="flex gap-4">
            {
                getCustomer ?
           
            
                <div className="flex items-center gap-2">
                    <div className="bg-green-500 rounded-full w-10 h-10 ">
                        <h1 className="text-3xl font-semibold text-center text-white">{JSON.parse(getCustomer).data?.customer.name[0]}</h1>
                    </div>
                   <div onClick={handleLogout} className="font-semibold text-2xl bg-green-400 px-5 rounded-lg text-white"> <h1> <i class="fa-solid fa-user"></i>Logout</h1> </div> 
                </div> :
                <div className="flex gap-4 items-center">
                 <Link to="/CustomerLogin" > <div className="font-semibold text-2xl bg-green-400 px-5 rounded-lg text-white"> <button> <i class="fa-solid fa-user"></i>Login</button> </div>  </Link> 
          <Link to="/CustomerReg">  <div className="font-semibold text-2xl px-4 border border-black"> <button>Register</button> </div>  </Link> 
               
                </div>
                 }
               <Link to="/carts"> <i class="fa-solid fa-cart-shopping font-semibold text-2xl"></i> </Link>
            </div>
        </div>
    </div>
}

export default Header