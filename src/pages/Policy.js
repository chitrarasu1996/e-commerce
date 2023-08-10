import React from 'react'
import Layout from '../components/layout/Layout'

function Policy() {
  return (
    <Layout title={"Contact-Us"}>
    <div className='row contactus ' >
      <div className='col-sm-6'>
    <img className='contactus-img' src="https://cdn.pixabay.com/photo/2016/06/16/02/33/telephone-1460517_1280.png">
   </img>
    </div>

<div className='col-md-4   mt-2 '>

<h1 className=' text-center text-white bg-dark  contact-title'>Privacy Policy</h1>

</div>
    </div>
    </Layout>
  )
}

export default Policy;