import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { toast } from 'react-hot-toast';
import { createCategory, deleteCategory, getAllCategory, updatedCategory } from '../../service/API';
import CreateCategoryForm from '../../components/form/CreateCategoryForm';
import {Button, Modal} from "antd"

const CreateCategory = () => {

const [categories,setCategories]=useState([]);


const [visible,setVisible]=useState(false)
//cretae Category 

const [categoryName,setCategoryName]=useState("")

//updated name
const [updatedName,setUpdatedName]=useState("")

const [updatedId,setUpdatedId]=useState("")



//create category
const hadleSubmit=async(e)=>{
e.preventDefault()
try{

    const respone=await createCategory(categoryName);
    if(respone.data.success){
        toast.success(`${categoryName} was created`)
        AllCategories()
    }else{
        toast.error(respone.data.message)
    }


}
catch(error){
console.log(error)
toast.error("Something Went Wrong")
}
}



useEffect(()=>{
    AllCategories()
},[])
const AllCategories=async()=>{
    try{
const respone=await getAllCategory()

if(respone.data.success){
setCategories(respone.data.Category)
}else{
    toast.error(respone.data.message)
}
    }catch(er){
console.log(er)
toast.error("something went wrong while getting category")
    }
}
///delete category

const deleteHandler=async(id,name)=>{

try{
    const response=await deleteCategory(id)
 
    if(response.data.success){
        toast.success(`${name} category is Deleted`)
        AllCategories()
    }else{
        toast.error(response.data.message)
    }
}catch(er){
console.log(er)
toast.error("Something went Wrong")
}
}

///upadted category
const hadleUpdated=async(e)=>{
  
e.preventDefault();
try {
 const respone=await   updatedCategory(updatedId,updatedName)

if(respone.data.success){
    toast.success(`${updatedName} is Updated`)
    setVisible(false)
    AllCategories()
}else{
    toast.error(respone.data.message)
    setVisible(false)
}
} catch (error) {


    console.log(error)

    toast.error("SOmething Went Wrong")
}

}


    return (

        <Layout title={"Dashboard - Create Category"}>
              <div className='container-fluid row m-3 p-3'>

     
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h1>Manage Category</h1>
                <CreateCategoryForm hadleSubmit={hadleSubmit} name={categoryName} setName={setCategoryName} />
                    <div>
                    <table className="table w-75" >
  <thead>
    <tr >
     
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>

  <tbody>
  {  categories.length&&categories.map((c,i)=>(
     <>
    <tr >
    <td key={i}>{c.name}</td>
    <td >
        <button className='btn btn-primary ms-2' onClick={()=>{setVisible(true);setUpdatedName(c.name);setUpdatedId(c._id)}}>edit</button>
    <button className='btn btn-danger ms-2 ' onClick={()=>deleteHandler(c._id,c.name)}>Delete</button>
    </td>
  
    </tr>

 
    </>
   ))}
   
  </tbody>
</table>
    </div>

     <Modal  style={{background:"transperant"}} onCancel={()=>setVisible(false)} footer={null}  visible={visible}  >

      <CreateCategoryForm name={updatedName} setName={setUpdatedName} hadleSubmit={hadleUpdated}/>
    </Modal>

       </div>
                </div>

            </div>


        </Layout>
    )
}

export default CreateCategory