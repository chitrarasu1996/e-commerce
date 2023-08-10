import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import { api } from '../../service/API';
import { useAuth } from '../../context/Auth';
import axios from 'axios';
import moment from "moment"
import { Select } from 'antd';
import { toast } from 'react-hot-toast';

const Option=Select
const AdminOrders = () => {

const[status,setStatus]=useState(["Not Processing","Processing","shipped","deliverd","Cancelled"])
const [changeStatus,setChangeStatus]=useState("")   
const [auth,setAuth]=useAuth();
const [order,setOrder]=useState([]);


  useEffect(()=>{
getOrderDetails()
  },[auth?.token])

  const getOrderDetails=async()=>{
    try {
      const res=await axios.get(api+"auth/all-orders/details")


      setOrder(res.data.result)
    } catch (error) {
      console.log(error)
    }
   


  }
  //handle Change
  const handleChange=async(value,orderId)=>{
    try {
    
const res=await axios.put(api+`auth/order-status/update/${orderId}`,{status:value})
if(res.data.success){
    toast.success(res.data.message)
    getOrderDetails()
}

    } catch (error) {
        console.log(error)
    }

  }
  return (
   <Layout title={"All Order Data"}>
        <div className='row'>
        <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9 '>
            <h1 className='text-center'>All Orders</h1>
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
      <td>
        {<Select 
      onChange={(value)=>handleChange(value,o._id)} 

      defaultValue={o?.status}
      bordered={false}>
  {status.map((s,i)=>
  (
    <Option key={i} value={s} >
   {s}
    </Option>
  )
)}
     
        </Select>}</td>
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
        </Layout>
   
  )
}

export default AdminOrders