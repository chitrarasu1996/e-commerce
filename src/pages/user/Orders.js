import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import axios from 'axios'
import { api } from '../../service/API'
import { useAuth } from '../../context/Auth'
import moment from "moment"
const Orders = () => {
const [auth,setAuth]=useAuth();
const [order,setOrder]=useState([]);


  useEffect(()=>{
getOrderDetails()
  },[auth?.token])

  const getOrderDetails=async()=>{
    try {
      const res=await axios.get(api+"auth/orders/details")
console.log(res.data.result)

      setOrder(res.data.result)
    } catch (error) {
      console.log(error)
    }
   


  }
  return (
  <Layout title={"Your Orders"}>
    <div className='container-fluid row m-3 p-3'>
<div className='row '>
    <div className='col-md-3'>
<UserMenu/>
    </div>
    <div className='col-md-9 conatiner'>
        <h1>orders</h1>
     
       {order?.map((o,i)=>(
        <>
      <div  key={i}  >

<table className='table box shadow text-center'>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">status</th>
      <th scope="col">buyer</th>
      <th scope="col">Date</th>
      <th scope="col">payment</th>
      
      <th scope="col">Quantity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td >{i+1}</td>
      <td>{o.status}</td>
      <td>{o.buyer.name}</td>
      <td>{moment(o?.createdAt).fromNow()}</td>
      <td>{o?.payment?.success?"Success":" Failed"}</td>
      <td>{o.products.length}</td>
    </tr>
  
  </tbody>
</table>
<div>

</div>

      </div>
      <div className='container'>
      {o.products.map((p,i)=>(
  <div>
<div key={i} className=' row card flex-row mb-2' >
  <div   className='mt-2 ms-2 col-md-4  mb-2'>
  <img  style={{width:"100px",height:"120px"}} 
  src={api+`product/get-Photo/${p._id}`}
    className="pt-2 card-img-top" alt={p.name} />
  </div>
  <div className='col-md-7'>
    <p>{p.name}</p>
    <p>{ p.description.substring(0,30)}...</p>
    <p>Price:{p.price}</p>
  
  </div>
 </div>
  </div>
))}
      </div>

</>
       ))}


    </div>
</div>
    </div>
  </Layout>
  )
}

export default Orders