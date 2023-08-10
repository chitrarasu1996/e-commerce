import React from 'react'
import { useAuth } from "../../context/Auth";
 import { Outlet } from "react-router-dom";
 import { useEffect,useState } from "react";
import {  adminChencking } from "../../service/API";
import Spinners from "../Spinners";

const AdminRoute = () => {

    const [auth,setAuth]=useAuth();

const [ok,setOk]=useState(false)

  useEffect(()=>{
    const authCheck=async()=>{
      const response=await adminChencking()
   
      if(response.data.ok){
       setOk(true)
      }else{
       setOk(false)
      }
   }
if(auth?.token) authCheck()
  },[auth?.token])

 
  return ok ?<Outlet/>:<><Spinners path='/login'/></>
}

export default AdminRoute