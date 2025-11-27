import React from 'react'

const PageTop = ({ title, left, right='' }) => {
  return (
    <div className='flex justify-between items-center mb-6 sticky top-0 py-2 bg-white lg:hidden'>
      <button className='w-6'>
        { left }
      </button>

      <span className='text-xl'>
        { title }
      </span>

      <span className='w-6'>
        { right }
      </span>
    </div>
  )
}

export default PageTop