import React from 'react'
import { useSearch } from '../../context/Search'

import { getProductBySearch } from '../../service/API';

import { useNavigate } from 'react-router-dom';

import { FormControl,InputLabel,Input,FormHelperText } from '@mui/material';
const SearchInput = () => {
const [values,setValues]=useSearch();
const navigate=useNavigate();


const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
        const respone = await  getProductBySearch(values.keywords)
       
        setValues({...values,results:respone.data.result})
    
        navigate("/search")
      
     
    }catch(er){
console.log(er)
    }

}


  return (
    <div className='me-2'>
    <form onSubmit={handleSubmit} className="d-flex" role="search">
    <input style={{width:"25vw"}} value={values.keywords} className="form-control me-2  px-5" type="search"
    onChange={(e)=>setValues({...values,keywords:e.target.value})} placeholder="Search Product" aria-label="Search"/>
    <button  className="btn btn-outline-dark" type="submit">Search</button>
  </form>

  </div>
  )
}

export default SearchInput