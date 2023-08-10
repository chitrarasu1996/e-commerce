import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/Auth'
const AdminDashboard = () => {
  const [auth] = useAuth()

  return (
    <Layout  title={"Dashboard - Admin"}>
     
        <div className='admin-dashboard container-fluid row m-3 p-3'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>

          <div className='col-md-9'>
            <div  className='card w-75 p-3 etittle-wrap'>
             <h3>Admin Name:{auth&&auth.user&&auth.user.name}</h3> 
             <h3>Admin Email:{auth&&auth.user&&auth.user.email}</h3> 
             <h3>Admin Contact:{ auth&&auth.user&&auth.user.phone}</h3> 
            </div>
          </div>

        </div>



    </Layout>
  )
}

export default AdminDashboard