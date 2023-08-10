
import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import {  getAllProducts } from '../../service/API';
import { toast } from 'react-hot-toast';
import  {Link} from "react-router-dom"


const Products = () => {
const [allProducts,setAllProducts]=useState([]);
const [photo,setPhoto]=useState([])

const gettingProduts=async()=>{
    const response=await getAllProducts();
try{ 
  if(response.data.success){
  setAllProducts(response.data.products)
}

}catch(er){
console.log(er)
}
   
   
}
useEffect(()=>{
gettingProduts()
},[])



  return (
    <Layout title='Admin-Produts'> 
        <div className='row '>
            <div className='col-md-3'>

            <AdminMenu/>
            </div>
    
            <div className='col-md-9 text-center'>

                <h2>All Products</h2>
              
                <div className='d-flex flex-wrap'>
                  {allProducts&&allProducts.map((item,i)=>(

                    <Link className='products-Link' key={item._id} 
                 
                    to={`/dashboard/admin/product/${item.slug}`} 

                    >
                  <div  className="card m-2" style={{width:"16rem"}}>
                   <img style={{height:"200px"}} src={`http://localhost:4000/product/get-Photo/${item._id}`} 
                   className="card-img-top" alt="..."/>
                   <div style={{height:"150px"}} className="card-body  ">
                     <h5 className="card-title">{item.name}</h5>
                     <p className="card-text" >  {item.description.substring(0,30)}...</p>
                     <p className="card-text">{item.price}</p>
                   </div>
                 </div>
                 </Link>
                ))}
               
                </div>
               
            </div>
        </div>
    </Layout>
  )

}
export default Products