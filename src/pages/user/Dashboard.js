import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/Auth'
import UserMenu from '../../components/layout/UserMenu'

const Dashboard = () => {
  const [auth]=useAuth()
  return (
    <Layout  title={"Dashboard - ECommerce App"}>
     
        <div className=' container-fluid row m-3 p-3'>
          <div className='col-md-3'>
            <UserMenu/>
          </div>

          <div className='col-md-9'>
            <div className='card w-75 p-3'>
             <h3>User Name:{auth&&auth.user&&auth.user.name}</h3> 
             <h3>User email:{auth&&auth.user&&auth.user.email}</h3> 
              <h3>User Name:{auth&&auth.user&&auth.user.address}</h3> 
            </div>
          </div>

        </div>



    </Layout>
  )
}

export default Dashboard