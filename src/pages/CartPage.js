import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/Auth'
import { useCart } from '../context/Cart';
import { api } from '../service/API';
import { json, useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
const[clientToken,setClientToken]=useState("");
const [instance,setInstance]=useState("");
const [loading,setLoading]=useState(false);
const [quantity,setQuantity]=useState(1);


const navigate=useNavigate();

//increase quantity
const increseQauntity=(p)=>{


if(quantity<10){

  setQuantity(quantity+1)
} 
}

//decrese quantity
const decreaseQuantity=(p)=>{
  
  if(quantity>1){
    setQuantity(quantity-1)
  } 
  
 
  }

  
//remove oitem from cart
const removeItemFromCart=(pid)=>{
  try {
    let myCart=[...cart];
let index=myCart.findIndex((p)=>p._id===pid)

    myCart.splice(index,1)
    setCart(myCart)
localStorage.setItem("cart",JSON.stringify(myCart))
  } catch (error) {
   console.log(error)
  }
 

};

//total price
const totalPrice=()=>{
let total=0;

cart?.map((p)=>{
total+=p.price
});
return total.toLocaleString("en-US",{
  style:"currency",
  currency:"USD"
})

}

//getClientToken
const getClientToken=async()=>{
  try {
    const res=await axios.get(api+"product/brain-tree/token")
    setClientToken(res.data.clientToken)
 
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  getClientToken()
},[auth?.token])

//quantity




//get quantity

//handle payment 
const handlePayment=async()=>{
try {
  setLoading(true)
  const { nonce } = await instance.requestPaymentMethod();

  const res= await axios.post(api+"product/braintree/payment",{cart,nonce}).then((result) => {
    setLoading(false)
   
    setTimeout(() => {
      toast.success("payment Successfully completed")
    }, 2000);
   
    localStorage.removeItem("cart")
    setCart([])
navigate("/dashboard/user/orders")
     
    
  }).catch((err) => {
    setLoading(false)
    toast.error("error while Paying payment")
  })
  


  

} catch (error) {
  console.log(error)

    toast.error("kindly select any payment method")
  
setTimeout(()=>{
  window.location.reload()
},2000)
 
}
}


  return (
    <Layout>
      <>
      <div className='container'>
        <div className='text-center mt-2 '>
          <h3 >Hello {auth?.token && auth.user.name}</h3>
          <div ><h6>
            {cart?.length > 0 ?

              `You Have ${cart.length} Products in Your Cart  
                ${auth?.token ? "" : "Please login to checkout"}`
              

              : <div>Your Cart is Empty</div>}
                </h6>
          </div>

        </div>
        <div className='row mt-2'>
        <div className='col-md-8'>
          
{cart.length>0&&cart.map((item,i)=>(
 <div key={i}  className='row card flex-row mb-2' >
  <div   className='mt-2 ms-2 col-md-4  mb-2'>
  <img  style={{width:"100px",height:"120px"}} 
  src={api+`product/get-Photo/${item._id}`}
    className="pt-2 card-img-top" alt={item.name} />
  </div>
  <div className='col-md-7'>
    <p>{item.name}</p>
    <p>{ item.description.substring(0,30)}...</p>
    <p>Price:{ item.price}</p>
    <div className='d-flex  align-itmes-center gap-2'>
    <button className='btn btn-danger mb-2' 
    onClick={()=>removeItemFromCart(item._id)} >Remove</button>

</div>
  </div>
  <div>


  </div>
 </div>
))}

           
        </div>

              <div className='col-md-4 text-center'>
                <h4>Cart Summery</h4>
         <div>Toatl | Checkout | Payment</div> 
         <hr/>
         <h4>Total : {totalPrice()} </h4>
  {auth?.user?.address?(
<>
<h4 className='mt-2'>Current Address</h4>
<div className='mt-2'>{auth.user.address}</div>
<button className='btn btn-outline-warning mt-2 ' 
onClick={()=>navigate("/dashboard/user/profile")}>Update Address</button>
</>
  ):(
<>
{auth?.token?(
<>
<div className='mt-2'>{auth.user.address}</div>
<button className='btn btn-outline-warning mt-2 ' 
onClick={()=>navigate("/dashboard/user/profile")}>Update Address</button>
</>
):(
  <>
  <button className='btn btn-outline-warning mt-2 ' 
onClick={()=>navigate("/login",{
  state:"/cart"
})}>Please Login To Checkout</button>
  </>
)}
</>
  )}
  <div>
    <>
    {!clientToken||!cart.length?(""):
    <>
    
    <DropIn 
    options={{
      authorization:clientToken,
      paypal:{
        flow:'vault'
      }
    }}
    onInstance={(instance)=>setInstance(instance)}
    />
    <button disabled={loading||!instance||!auth?.user?.address} className='btn mb-2 btn-primary'
     onClick={handlePayment}>{loading?"Loading...":"Make Payment"}</button>
    </>}
    </>
   
  </div>

        </div>
        </div>
        </div>
      </>
    </Layout>

  )
}

export default CartPage