import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { createProduct, createProdut, createProduts, getAllCategory } from '../../service/API';
import { Select } from "antd"
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
const { Option } = Select
const CreateProduct = () => {
const navigate=useNavigate()
  const [name, setName] = useState("");
 
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const [quantity, setQuantity] = useState("");
  const [shipping, setShiping] = useState(false)

  const [categories, setCategories] = useState([]);


  //create product


  //get all categories

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
  // create Product

 

  const submitted=async(e)=>{
e.preventDefault();
try{

const productsData=new FormData();
productsData.append("name",name)
productsData.append("photo",photo)
productsData.append("category",category)
productsData.append("price",price)
productsData.append("description",description)
productsData.append("quantity",quantity)

const respone=await createProduct(productsData) 

if(respone.data.success){

navigate("/dashboard/admin/products")

setTimeout(()=>{
  toast.success(respone.data.message)
},2000)

}else{
toast.error(respone.data.message)
}
}catch(er){
console.log(er)
toast.error("Something Went Wrong")
}
  } 
   return (
    <Layout title={"Dashboard - Create Products"}>
      <div className=' container-fluid row m-3 p-3'>


        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>CreateProducts</h1>
            <form onSubmit={submitted}>

          
            <div className='m-2 w-75'>
              <Select className='form-select mb-3' bordered={false} size='large'
                placeholder={"Select a Category"} showSearch
                 onChange={(value) => setCategory(value)}>
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
                    hidden />

                </label>

              </div>
              <div className='text-center mb-2 mt-2'>
              {photo && (
                <img className='img img-responsive' 
                style={{ height: "200px" }} 
                src={URL.createObjectURL(photo)} alt='Product Photo' />
              )}
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
               type='number' placeholder='Type a Price' value={price} onChange={(e)=>setPrice(e.target.value)}/>
            </div>
            <div >
              <input className='form-control mb-3 mt-3'
               type='number' placeholder='Type a Quantity' value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
            </div>
         <Select placeholder="Select Shipping" className='col-md-12 mb-3 mt-3' onChange={(value)=>setShiping(value)}>
         <Option value="0">No</Option>
         <Option value="1">Yes</Option>
         </Select>
         <div>
          <button className='btn btn-primary' >
CREATE PRODUCT
          </button>
         </div>
            </div>
            </form>

     
          </div>
        </div>

      </div>

    </Layout>
  )
}

export default CreateProduct