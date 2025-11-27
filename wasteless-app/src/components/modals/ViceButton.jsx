import React from 'react'

const ViceButton = ({ text="text", action }) => {
  return (
    <button className='py-4 px-10 bg-gray-200 rounded-full hidden lg:flex'>
      { text }
    </button>
  )
}

export default ViceButton