import { useEffect, useState } from "react";
import axios from "axios"

function Carts() {
     
  const[productsData, setProducts] = useState([])
   

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("products")) || []
    const update = getData.map(item => ({
      ...item, quantity:1, maxQuantity: item.quantity
    }))
    setProducts(update)
  },[])



  const handledelete = (id) => {
    const removeItem = productsData.filter((item) => item._id !== id)
    localStorage.setItem("products", JSON.stringify(removeItem))
    setProducts(removeItem)
  }

    // total quantity
     const TotalQuantity = productsData.reduce((sum, item) => sum + Number(item.quantity), 0)

    //  discount part
const discount = TotalQuantity >= 20
  ? 0.15
  : (TotalQuantity >= 15 && TotalQuantity < 20)
  ? 0.1
  : (TotalQuantity >= 10 && TotalQuantity < 15)
  ? 0.05
  : 0;


//   discountAmount



      // total price
const subtotal = productsData.reduce(
  (sum, item) => sum + (Number(item.price) * Number(item.quantity)), 
  0
);

const DiscountAmount = subtotal * discount;

const TotalPrice = subtotal - DiscountAmount;

        //  
      const handleIncreament = (id) => {
  setProducts(prd => {
    const updated = prd.map(
      item => item._id === id 
        ? {...item, quantity: item.quantity < item.maxQuantity ? item.quantity + 1 : item.quantity} 
        : item
    )
    localStorage.setItem("products", JSON.stringify(updated))  // ✅ update storage
    return updated
  })
}
        // dec
        const handleDec = (id) => {
          setProducts(prd => prd.map(
            item => item._id === id ? {...item, quantity: item.quantity > 1 ? item.quantity -1 : item.quantity} : item
          ))
        } 
        
  const getCustomer = localStorage.getItem("customer")

  let customerOrder = ""

  if(getCustomer){
    customerOrder = JSON.parse(getCustomer).data.customer.name

  console.log(customerOrder)}

  

  const handleOrder = () => {
    if(!customerOrder){
      alert("please login customer or enter customer name")
    }
    axios.post("http://localhost:2100/create/order", {
      "customer": customerOrder,
      "products": productsData.map((item) => ({
        "productid": item._id,
        "quantity": item.quantity
      }))
    }).then((res) => {
      if(res.data.error){
        alert(res.data.error)
      }
      else{
        alert("success order")
        localStorage.removeItem("products")
        setProducts([])
      }
    }).catch(error => console.log(error))
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-2">
        
        {/* Left: Shopping Cart */}
        <div className="lg:col-span-2   s rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

          <table className="w-full  text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-3">PRODUCT DETAILS</th>
                <th className="pb-3">QUANTITY</th>
                <th className="pb-3">PRICE</th>
                <th className="pb-3">TOTAL</th>
              </tr>
            </thead>
            
              {/* Item Row 1 */}

                   {
                    productsData.map((item) => {
                      return   <tbody>
                          <tr className="border-b">
                <td className="py-4 flex items-center gap-4">
                  <img
                    src= {`http://localhost:2100/allimages/${item.primage}`}
                    alt="Iphone 16"
                    className="w-20 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-bold">{item.name}</h2>
                    <p className="text-sm text-purple-600">categaroy </p>
                    {/* <p className="text-sm text-purple-600">phone </p> */}
                    <button onClick={() => handledelete(item._id)} className="text-red-500 text-sm hover:underline">
                      Remove
                    </button>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleDec(item._id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncreament(item._id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                  </div>
                </td>
                <td className="font-medium">${item.price}</td>
                <td className="font-medium">${item.price * item.quantity}</td>
              </tr>
               </tbody>
                    })
                   }


             

          </table>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-gray-200 mt-16 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-3">
            <span>items</span>
            <span>{productsData.length}</span>
          </div>
          
         {/* total quantity display waaye */}

          <div className="flex justify-between mb-3">
          <span>Total Quantity</span>
          <span>{TotalQuantity}</span>
          </div>

          <div className="flex justify-between mb-3">
  <span>Subtotal</span>
  <span>${subtotal.toFixed(2)}</span>
</div>

         <div className="flex justify-between mb-3 text-green-600">
  <span>Discount</span>
  <span>- ${DiscountAmount.toFixed(2)}</span>
</div>



          <div className="mb-4">
            <label className="block mb-1">SHIPPING</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Choose delivery option</option>
              <option>Standard - $10</option>
              <option>Express - $20</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1">PROMO CODE</label>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter your code"
                className="flex-1 border rounded-l px-3 py-2"
              />
              <button className="bg-red-500 text-white px-4 rounded-r">APPLY</button>
            </div>
          </div>

          <div className="flex justify-between font-bold text-lg mb-4">
            <span>TOTAL COST</span>
            <span>${TotalPrice}</span>
          </div>

          <button onClick={handleOrder} className="w-full py-3 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carts;