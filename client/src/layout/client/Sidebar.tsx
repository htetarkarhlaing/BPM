import React from 'react'
import Image from 'next/image'

const Sidebar = () => {
  return (
    <div className='w-full h-full bg-gradient-to-b from-primary-bg via-transparent to-primary-bg'>
      <div className='w-[100px] mx-auto py-4 select-none'>
        <Image src="/logo-svg.svg" alt="logo" width={231} height={108} />
      </div>
    </div>
  )
}

export default Sidebar