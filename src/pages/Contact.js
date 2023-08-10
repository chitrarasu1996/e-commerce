
import React from 'react'
import Layout from '../components/layout/Layout';
import {AiOutlineMail} from "react-icons/ai"
import {BiPhoneCall,BiSupport} from "react-icons/bi"
const Contact = () => {
  return (
    <Layout title={"Contact-Us"}>
      <div className='row contactus' >
        <div className='col-sm-6'>
      <img className='contactus-img' src="https://cdn.pixabay.com/photo/2016/06/16/02/33/telephone-1460517_1280.png">
     </img>
      </div>

<div className='col-md-4   mt-2 '>

<h1 className=' text-center text-white bg-dark  contact-title'>Contact</h1>
<p className=' mt-1'>  Any query and info about product feel free to call anytime we are 24X7
            vaialible</p>
          
            <p className='mt-3'><AiOutlineMail/> : www.help@ecommerceapp.com</p>
            <p className='mt-3'><BiPhoneCall/>: 012-3456789</p>
            <p className='mt-3'><BiSupport/>: 1800-0000-0000 (toll free)</p>
</div>
      </div>
      </Layout>
  )
}

export default Contact;