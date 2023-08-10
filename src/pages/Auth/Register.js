import React from 'react'
import Layout from '../../components/layout/Layout'
import { useState } from "react"
import toast from 'react-hot-toast';
import { registerDetails } from '../../service/API';
import { useNavigate } from 'react-router-dom';
import "../../styles/auth.style.css"
const Register = () => {
const navigate=useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [Address, setAddress] = useState("");
    const [answer, setanswer] = useState("");

    const submitHandle=(e)=>{
e.preventDefault()

    }
    const submitted=async()=>{
        try{
            const postRegisterData=await registerDetails(name,email,password,phone,Address,answer) 
      if  ( postRegisterData.data.success){
     
        toast.success(postRegisterData.data.message)
      setTimeout(()=>{
        navigate("/login")
      },3000)


     }else{
        toast.error(postRegisterData.data.message)
     }
}catch(er){
toast.error("Something went Wrong")
        }
    }
    return (
        <Layout title={"Register-page"}>
            <div className='register' >
               
                <form onSubmit={submitHandle} className='form-container' >
                <p className='form-container-title mb-2 mt-1 '>REGISTER FORM</p>
                 
                    <div className="mb-2">

                        <input type="text"
                         className="form-control" id="exampleInputname" placeholder='enter Your Name'
                          onChange={(e)=>setName(e.target.value)} value={name}
                          required
                        />

                    </div>
                    <div className="mb-2">

                        <input type="text" className="form-control" id="exampleInputname" 
                        placeholder='enter Your Email' 
                        onChange={(e)=>setEmail(e.target.value)}  value={email}
                        required
                        />

                    </div>
                    <div className="mb-2">

                        <input type="password" className="form-control" id="exampleInputPassword1"
                         placeholder='enter your password' 
                         onChange={(e)=>setPassword(e.target.value)}  value={password}
                         required
                         />
                    </div>
                    <div className="mb-2">

                        <input type="text" className="form-control" id="exampleInputname" 
                        placeholder='enter Your phone' 
                        onChange={(e)=>setPhone(e.target.value)}  value={phone}
                        required
                        />

                    </div>
                    <div className="mb-2">
                         <input type="text" className="form-control" 
                        id="exampleInputname"
                         placeholder='enter Your Address'
                         onChange={(e)=>setAddress(e.target.value)}  value={Address}
                        required
                         />
                         </div>
                         <div className="mb-2">
                         <input type="text" className="form-control" 
                        id="exampleInputname"
                         placeholder='enter Your favourite sports'
                         onChange={(e)=>setanswer(e.target.value)}  value={answer}
                        required
                         />
                         </div>
                    <button type="submit" className="submit-button btn btn-dark mb-3" style={{fontSize:"14px"}} onClick={submitted}>REGISTER</button>
                </form>
            </div>
        </Layout>

    )
}

export default Register