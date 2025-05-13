import React from 'react'
import Navbar from '../Common/Navbar'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div>

      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default UserLayout