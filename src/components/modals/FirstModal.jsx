import React from 'react'
import image_assets from '../../assets/images/images'

const FirstModal = ({ message="Message Text Goes Here", message_sub="Message dub goes here. It is usually longer and give a good description of what the message is about!", action, actionText="The Action" }) => {
  return (
    <div className='h-screen w-screen flex items-center bg-white lg:bg-gray-300'>

      <div className='lg:w-9/12 mx-auto lg:flex items-center bg-white p-5 gap-10'>
        <div className='flex-1'>
          <img src={image_assets.onboard_1} alt="" />
        </div>

        <div className='text-center lg:text-start flex-1'>
          <p className='text-3xl font-semibold w-9/12 mx-auto lg:mx-0 mb-4'>{message}</p>

          <p className='text-gray-800 w-10/12 mx-auto lg:mx-0 mb-8'>
            { message_sub }
          </p>

          <button className='bg-green-500 text-white py-3 w-9/12 px-10 rounded-full'>{ actionText }</button>
        </div>

      </div>

    </div>
  )
}

export default FirstModal