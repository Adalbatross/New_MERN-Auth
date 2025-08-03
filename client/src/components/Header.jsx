import React, { useContext } from 'react'
import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
import AppContext from '../context/AppContext'
const Header = () => {
  const {userData} =useContext(AppContext)
  // const navigate = useNavigate()
  
  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
      <img src={assets.header_img} className='w-36 h-36 rounded-full mb-6'/>
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData ? userData.name : 'Developer'}!<img src={assets.hand_wave} className='w-8 aspect-square'/></h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our Website !</h2>
      <p className='mb-4 max-w-md'>We’re passionate about building simple, effective solutions that make your digital experience better. Whether you're here to explore our projects, use our tools, or learn something new, we're glad to have you with us.</p>
      <button className='cursor-pointer border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'>Get Started</button>
    </div>
  )
}

export default Header
