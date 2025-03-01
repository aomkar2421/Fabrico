import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from '../Admin/Admin'

const AdminRouters = () => {
  return (
    <div className='admin-container'>
        <Routes>
            <Route path='/*' element={<Admin/>} ></Route>
        </Routes>
    </div>
  )
}

export default AdminRouters