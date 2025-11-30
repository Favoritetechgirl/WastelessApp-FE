import React from 'react'
import image_assets from '../assets/images/images'

const LandingPage = () => {
  return (
    <div>
      <div className='nav h-24 border-2 border-green-700 flex justify-between items-center'>
        <div>
          <img src={image_assets.Logo} alt="" />
        </div>

        <div className='flex items-center gap-5'>
          <a href="">Features</a>
          <a href="">How It Works</a>
          <a href="">Impact</a>
        </div>

        <div>
          <button className='bg-green-500 text-white p-3 px-6'>Sign Up</button>
          <button className='p-3 px-6'>Login</button>
        </div>
      </div>
      
    </div>
  )
}

export default LandingPage