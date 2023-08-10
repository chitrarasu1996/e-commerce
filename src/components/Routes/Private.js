import { useEffect,useState } from "react";

import { useAuth } from "../../context/Auth";
 import { Outlet } from "react-router-dom";
import React from 'react'
import { AuthChecking } from "../../service/API";
import Spinners from "../Spinners";

const Private = () => {

    const [auth,setAuth]=useAuth();

const [ok,setOk]=useState(false)

  useEffect(()=>{
    
const authCheck=async()=>{
   const response=await  AuthChecking()

   if(response.data.ok){
    setOk(true)
   }else{
    setOk(false)
   }
}
if(auth?.token) authCheck()
  },[auth?.token])
  return ok ?<Outlet/>:<><Spinners/></>
}

export default Private