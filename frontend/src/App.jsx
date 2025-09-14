import {Routes, Route } from "react-router-dom";
import Product from "./Product/ProductDisplay";
import Home from "./Pages/Home";
import Addproduct from "./Product/AddProduct";
import UpdateProduct from "./Product/UpdateProduct";

function App(){
  return <div>
    <Routes>
      <Route path="/display" element= {<Product /> } />
      <Route path="/newproduct" element= {<Addproduct /> } />
      <Route path="/updateproduct/:id" element= {<UpdateProduct /> } />
      <Route path="/" element= {<Home /> } />
   
    </Routes>
  </div>
}
export default App