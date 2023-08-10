import React, { useEffect } from 'react'
import UserMenu from '../../components/layout/UserMenu'
import Layout from '../../components/layout/Layout'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { registerDetails, updateUserProfile } from '../../service/API'
import "../../styles/auth.style.css"
import { useAuth } from '../../context/Auth'
const Profile = () => {
    const [auth,setAuth]=useAuth();
 
    const navigate=useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [Address, setAddress] = useState("");

    useEffect(()=>{
        const {name,email,phone,address}=auth?.user; 
      setName(name)
      
        setEmail(email);
       setAddress(address);
       setPhone(phone)
   
       },[auth?.user])
    const submitHandle=(e)=>{
        e.preventDefault()
        }
         const submitted=async()=>{
            
                try{
                    const response=await updateUserProfile(name,password,phone,Address) 
             console.log(response);
                    if  ( response.data.success){
             
              setAuth({...auth,user:response.data&&response.data.upadtedProfile})
              let ls=localStorage.getItem("auth");
              ls=JSON.parse(ls);
              ls.user=response.data.upadtedProfile;
              localStorage.setItem("auth",JSON.stringify(ls))
               toast.success(response.data.message)
             }else{
                toast.error(response.data.message)
             }
        }catch(er){
        toast.error("Something went Wrong")
                }
            }
  return (
<Layout title={"Your Profile"}>
    <div className='container-fluid row m-3 p-3'>
<div className='row '>
    <div className='col-md-3'>
<UserMenu/>
    </div>
    <div className='col-md-9'>
        <h1>Update Profile</h1>
        <div>
        <div className='register' >
               
               <form style={{width:"30%"}} onSubmit={submitHandle} className=' form-container' >
               <p className='form-container-title mb-2 mt-1 '>UPDATE PROFILE </p>
                
                   <div className="mb-2">

                   <input type="text"
                         className="form-control" 
                         id="exampleInputname" placeholder='enter Your Name'
                          onChange={(e)=>setName(e.target.value)} 
                          value={name}
                        
                       
                     />

                   </div>
                   <div className="mb-2">

                       <input type="text" className="form-control" 
                       id="exampleInputemail" 
                       placeholder='enter Your Email' 
                       onChange={(e)=>setEmail(e.target.value)}  value={email}
                   disabled
                       />

                   </div>
                   <div className="mb-2">

                       <input type="password" className="form-control" 
                       id="exampleInputPassword1"
                        placeholder='enter your password' 
                        onChange={(e)=>setPassword(e.target.value)} 
                         value={password}
                     
                        />
                   </div>
                   <div className="mb-2">

                       <input type="text" className="form-control" id="exampleInputPhone" 
                       placeholder='enter Your phone' 
                       onChange={(e)=>setPhone(e.target.value)} 
                        value={phone}
                     
                       />

                   </div>
                   <div className="mb-2">
                        <input type="text" className="form-control" 
                       id="exampleInputAddress"
                        placeholder='enter Your Address'
                        onChange={(e)=>setAddress(e.target.value)}  value={Address}
                  
                        />
                        </div>
                        <div className="mb-2">
                     
                        </div>
                   <button type="submit" className="submit-button btn btn-dark mb-3" 
                   style={{fontSize:"14px"}} onClick={submitted}>UPDATE</button>
               </form>
           </div>
        </div>
    </div>
</div>
    </div>
  </Layout>
  )
}

export default Profile