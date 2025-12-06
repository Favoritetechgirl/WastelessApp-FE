import React from 'react'

const MainButton = ({ text="Action", action, className }) => {
  return (
    <button className={`bg-green-500 text-white py-3 px-10 w-full lg:w-fit rounded-full lg:flex-0 ${className}`}>
      { text }
    </button>
  )
}

export default MainButton