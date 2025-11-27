import React from 'react'
import image_assets from '../../assets/images/images'


const DeleteModal = () => {
  return (
    <div className='h-screen w-screen flex items-center bg-gray-300'>

      <div className='w-90 mx-auto items-center bg-white p-5 gap-10 rounded-2xl'>
        <div className='flex-1 flex justify-center mb-6'>
          <img src={image_assets.bin} alt="" />
        </div>

        <div className='flex-1'>
          <p className='text-3xl font-semibold w-9/12 mx-auto mb-4 text-red-500'>Stop! Are you sure?</p>

          <p className='text-gray-800 w-10/12 mx-auto mb-8'>
            Deleting this item is permanent, so this action is irreversible! Say bye-bye to all its saved tracking history, including usage logs and alerts.
          </p>

          <button className='bg-red-500 text-white py-3 w-9/12 px-10 rounded-4xl mb-4'>Yes, Delete It</button>

          <button className='text-black bg-gray-200 w-9/12 py-3 rounded-4xl'>Wait, Go Back</button>
          
        </div>

      </div>

    </div>
  )
}

export default DeleteModal
