import React, { useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { Select } from "antd"
import { useNavigate, useParams } from 'react-router-dom'
import { api, createProduct, getAllCategory, getSingleProduct, updateProduct, updateSingleProduct } from '../../service/API';
import axios from 'axios';
const { Option } = Select
const UpdateProducts = () => {
const params=useParams();

  const navigate=useNavigate();
  const [name, setName] = useState("");
 
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const [quantity, setQuantity] = useState("");
  const [shipping, setShiping] = useState(false)

  const [categories, setCategories] = useState([]);
const [pid,setId]=useState("");

  //get single product
useEffect(()=>{
 singleProduct()

},[])
  
const singleProduct=async()=>{
try{
  const respone=await getSingleProduct(params.slug)
   setId(respone.data.product._id)
  setName(respone.data.product.name)
setDescription(respone.data.product.description)
setPrice(respone.data.product.price)
setCategory(respone.data.product.category);
setQuantity(respone.data.product.quantity)
setShiping(respone.data.product.shipping)
}catch(er){
console.log(er)
}


    }



  //get single Product

  const hadleUpdate=async(e)=>{
    e.preventDefault();
    try{
      
      const productsData=new FormData();

    
productsData.append("name",name)
photo&&productsData.append("photo",photo)
productsData.append("category",category)
productsData.append("price",price)
productsData.append("description",description)
productsData.append("quantity",quantity)
 
    const response=await  axios.put(api+`product/update-product/${pid}`,productsData)


    if(response.data.success){
      toast.success(response.data.message)
 
    setTimeout(()=>{
      navigate("/dashboard/admin/products")
    },2000)
    }else{
    toast.error(response.data.message)
    }
    }catch(er){
    
    toast.error("Something Went Wrong")
    }
  }
//delete product
const deleteHandler=async()=>{
  try{
   
    const response=await axios.delete(api+`product/deleteProduct/${pid}`)
    if(response.data.success){
   
      navigate("/dashboard/admin/products")
     
      setTimeout(()=>{
       toast.success(response.data.message)
      },2000)
    }else{
      toast.error(response.data.message)
    }

  }catch(er){
console.log(er)
toast.error(er)
  }


}

  //get all category
  useEffect(() => {
    AllCategories()
  }, [])
  const AllCategories = async () => {
    try {
      const respone = await getAllCategory()

      if (respone.data.success) {
        setCategories(respone.data.Category)
      } else {
        toast.error(respone.data.message)
      }
    } catch (er) {
      console.log(er)
      toast.error("something went wrong while getting category")
    }
  }
  return (
    <Layout title={"Dashboard - Update Product"}>
    <div className=' container-fluid row m-3 p-3'>


      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <h1>Update Product</h1>
     

        <div className='m-2 w-75'>
            <Select className='form-select mb-3' bordered={false} size='large'
              placeholder={"Select a Category"} showSearch 
              onChange={(value) => setCategory(value)}
              value={category}>
              {categories.length && categories.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}

                </Option>
              ))}

            </Select>
            <div className='mb-2 mt-2 '>
              <label className='btn btn-outline-secondary col-md-12'>
                {photo ? photo.name : "upload images"}
                
                <input  type={"file"} name='images' accept='image/*'
                 onChange={(e) => setPhoto(e.target.files[0])}
                  hidden  />

              </label>

            </div>
            <div className='text-center mb-2 mt-2'>
            {photo ?(
              <img className='img img-responsive' 
              style={{ height: "200px" }}
               src={URL.createObjectURL(photo)}
                alt='Product Photo' />
            ):<div>
               <img className='img img-responsive' 
               
              style={{ height: "200px" }}
          src={api+`product/get-Photo/${pid}`}
                alt='Product Photo' 
                />
              </div>}
          </div>
          <div >
            <input className='form-control mb-3 mt-3'
             type='text' placeholder='Type a Name' value={name}
              onChange={(e)=>setName(e.target.value)}/>
          </div>

          <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="write a description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          
           <div >
            <input className='form-control mb-3 mt-3'
             type='number' placeholder='Type a Price'
              value={price} onChange={(e)=>setPrice(e.target.value)}/>
          </div>
          <div >
            <input className='form-control mb-3 mt-3'
             type='number' placeholder='Type a Quantity' 
             value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
          </div>
       <Select value={shipping?"yes":"No"} placeholder="Select Shipping" className='col-md-12 mb-3 mt-3' 
       onChange={(value)=>setShiping(value)}>
       <Option value="0">No</Option>
       <Option value="1">Yes</Option>
       </Select>
       <div>
        <button className='btn btn-primary' onClick={hadleUpdate} >
update Product
        </button>
       </div>
       <div className='mt-2'>
       <button className='btn btn-danger' onClick={deleteHandler} >
          Delete Product
        </button>
       </div>
          </div>
        
      
       
      

   
        </div>
      </div>

    </div>

  </Layout>
  )
}

export default UpdateProducts