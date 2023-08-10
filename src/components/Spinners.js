import React, { useEffect, useState } from 'react'

import { useNavigate,useLocation } from 'react-router-dom'

const Spinners = ({path="/login"}) => {
    const location=useLocation()
    const navigate=useNavigate()
let [count,setCount]=useState(5)
    useEffect(()=>{
        const interval=setInterval(()=>{
            setCount(value=>--value)
        },1000)

        count===0&&navigate(`${path}`,{
          state:location.pathname
          
        })
       

        return ()=>clearInterval(interval)
    },[count,navigate, location,path])

  return (
    
    <>
    <div style={{height:"100vh"}} class="d-flex flex-column justify-content-center align-items-center">
 <h1>You will be redirect within {count}</h1>
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
</>
  )
}

export default Spinners