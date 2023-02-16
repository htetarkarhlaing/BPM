import React from 'react'
import Sidebar from './Sidebar'
import ProfileBar from './ProfileBar'

interface ILayout {
  children: React.ReactNode
}

const Layout = ({ children }: ILayout) => {
  return (
    <div className='w-screen h-screen grid grid-cols-12'>
      <div className='col-span-2'>
        <Sidebar />
      </div>
      <div className='col-span-7'>
        {children}
      </div>
      <div className='col-span-3'>
        <ProfileBar />
      </div>
    </div>
  )
}

export default Layout