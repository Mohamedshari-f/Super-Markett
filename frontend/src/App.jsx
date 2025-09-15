import {Routes, Route } from "react-router-dom";
import Product from "./Product/ProductDisplay";
import Home from "./Pages/Home";
import Addproduct from "./Product/AddProduct";
import UpdateProduct from "./Product/UpdateProduct";
import Customer from "./Pages/costomer/CustomerReg";
import CustomerLogin from "./Pages/costomer/LoginCustomer";
import Carts from "./Product/orderCarts";
import DashboardCards from "./Product/Cards";
import Report from "./Product/Reports";

function App(){
  return <div>
    <Routes>
      <Route path="/display" element= {<Product /> } />
      <Route path="/newproduct" element= {<Addproduct /> } />
      <Route path="/updateproduct/:id" element= {<UpdateProduct /> } />
      <Route path="/" element= {<Home /> } />
      <Route path="/CustomerReg" element= {<Customer/> } />
      <Route path="/CustomerLogin" element= {<CustomerLogin /> } />
      <Route path="/carts" element= {<Carts /> } />
      <Route path="/cards" element= {<DashboardCards /> } />
      <Route path="/reports" element= {<Report /> } />
   
    </Routes>
  </div>
}
export default App