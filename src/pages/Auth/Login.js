import React from 'react'
import { useState, } from 'react';
import Layout from '../../components/layout/Layout'
import { loginDetails } from '../../service/API';
import toast from 'react-hot-toast';
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
const Login = () => {
  
    const navigate=useNavigate()
    const [auth,setAuth]=useAuth()
const location=useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
 
    const submitHandle=(e)=>{
e.preventDefault()

    }
    const submitted=async()=>{
         try{
            const response=await loginDetails(email,password) 
         
      if  ( response.data.success){

      
       setAuth({
        ...auth,
        user:response.data.user,
        token:response.data.token
       })
       localStorage.setItem("auth",JSON.stringify(response.data))
       
       navigate(location.state || "/")
      
       
        
       setTimeout(()=>{
        toast.success(response.data.message)
      

      },2000)
      
      

     }else{
        toast.error(response.data.message)
     }
}catch(er){

toast.error("Something went Wrong")

        }

    }
  return (
    <Layout title={"Login-page"}>
     

    <div className='register' >
       
        <form onSubmit={submitHandle} className='form-container'>
        <p className='form-container-title'>LOGIN FORM</p>
     
            <div className="mb-3">

                <input type="text" className="form-control" id="exampleInputname" 
                placeholder='enter Your Email' 
                onChange={(e)=>setEmail(e.target.value)}  value={email}
                required
                />

            </div>
            <div className="mb-3">

                <input type="password" className="form-control" id="exampleInputPassword1"
                 placeholder='enter your password' 
                 onChange={(e)=>setPassword(e.target.value)}  value={password}
                 required
                 />
            </div>
            <button type="button" className="submit-button btn btn-dark mb-3" style={{fontSize:"14px"}} onClick={()=>navigate("/forgot-password")}>FORGOT PASSWORD</button>
            <button type="submit" className="submit-button btn btn-dark mb-3" style={{fontSize:"14px"}} onClick={submitted}>LOGIN</button>
        </form>
    </div>
  


</Layout>
  )
}

export default Login