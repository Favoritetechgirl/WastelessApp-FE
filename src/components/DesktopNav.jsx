import React from 'react'
import { useNavigate } from 'react-router-dom'
import image_assets from '../assets/images/images'

import { Store, CookingPot, Trophy, Settings, Bell } from 'lucide-react'


const DesktopNav = ({ location='inv' }) => {
  const navigate = useNavigate();
  return (
    <div className='h-screen w-screen flex items-start'>
      {/* SIDEBAR */}
      <div className='w-3/12 h-screen border-r-2 border-gray-300'>
        <img src={image_assets.Logo} alt="" />

        <div className='p-5'>
          <ul>
            <li className='mb-5'>
              <button
                onClick={() => navigate('/inventory')}
                className={`${location === 'inv' ? 'text-green-600' : ''} text-gray-500 text-lg flex gap-3 items-center font-semibold hover:text-green-600 transition-colors`}
              >
                <Store />
                Inventory
              </button>
            </li>

            <li className='mb-5'>
              <button
                onClick={() => navigate('/recipes')}
                className={`${location === 'rec' ? 'text-green-600' : ''} text-gray-500 text-lg flex gap-3 items-center font-semibold hover:text-green-600 transition-colors`}
              >
                <CookingPot />
                Recipe
              </button>
            </li>

            <li className='mb-5'>
              <button
                onClick={() => navigate('/impact')}
                className={`${location === 'imp' ? 'text-green-600' : ''} text-gray-500 text-lg flex gap-3 items-center font-semibold hover:text-green-600 transition-colors`}
              >
                <Trophy />
                Impact
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate('/settings')}
                className={`${location === 'set' ? 'text-green-600' : ''} text-gray-500 text-lg flex gap-3 items-center font-semibold hover:text-green-600 transition-colors`}
              >
                <Settings />
                Settings
              </button>
            </li>

          </ul>
        </div>
      </div>

      {/* MAIN SHII */}
      <div className='flex-1 border-b-2 border-gray-300'>

        {/* NAVBAR */}
        <div className='h-24 flex items-center justify-end p-5'>

          <div className='flex justify-end items-center gap-5'>
            <button onClick={() => navigate('/notifications')} className="hover:text-green-600 transition-colors">
              <Bell />
            </button>

            <div className='flex items-center gap-3'>
              <img src={image_assets.dp} className='w-16 h-16 object-cover rounded-full' alt="" />

              <div >
                <span className='block text-lg font-semibold'>Philips Olorunwa</span>
                <span className='text-sm text-gray-500'>philipsedun@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div>

        </div>
      </div>

    </div>
  )
}

export default DesktopNav
