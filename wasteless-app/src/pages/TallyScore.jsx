import React from 'react'
import { Minus, Plus } from 'lucide-react'

const TallyScore = () => {
  return (
    <div className='h-screen w-screen border-4 border-green-600'>

      <div className='p-4'>
        <p className='text-2xl mb-3 font-semibold'>Let's Tally the Score</p>

        <p className='text-sm text-gray-600 mb-4'>Tell us exactly which heroes joined the feast and the quantity you used!</p>

        <div className='scores mb-10'>

          <div className='flex border-b-2 mb-3 items-center py-3 gap-3 text-sm'>
            <span>Green ball peppers</span>

            <div className='flex justify-between text-gray-500 items-center'>
              <button className='rounded-full bg-gray-100 p-1'>
                <Minus className='text-gray-500' />
              </button>

              <input className='w-12 text-lg text-center appearance-none outline-none' type="number" defaultValue={1} />

              <button className='rounded-full bg-gray-100 p-1'>
                <Plus className='text-gray-500' />
              </button>
            </div>

            <span className='text-gray-600'>Piece(s)</span>
          </div>
          <div className='flex border-b-2 mb-3 items-center py-3 gap-3 text-sm'>
            <span>Green ball peppers</span>

            <div className='flex justify-between text-gray-500 items-center'>
              <button className='rounded-full bg-gray-100 p-1'>
                <Minus className='text-gray-500' />
              </button>

              <input className='w-12 text-lg text-center appearance-none outline-none' type="number" defaultValue={1} />

              <button className='rounded-full bg-gray-100 p-1'>
                <Plus className='text-gray-500' />
              </button>
            </div>

            <span className='text-gray-600'>Piece(s)</span>
          </div>
          <div className='flex border-b-2 mb-3 items-center py-3 gap-3 text-sm'>
            <span>Green ball peppers</span>

            <div className='flex justify-between text-gray-500 items-center'>
              <button className='rounded-full bg-gray-100 p-1'>
                <Minus className='text-gray-500' />
              </button>

              <input className='w-12 text-lg text-center appearance-none outline-none' type="number" defaultValue={1} />

              <button className='rounded-full bg-gray-100 p-1'>
                <Plus className='text-gray-500' />
              </button>
            </div>

            <span className='text-gray-600'>Piece(s)</span>
          </div>
          <div className='flex border-b-2 mb-3 items-center py-3 gap-3 text-sm'>
            <span>Green ball peppers</span>

            <div className='flex justify-between text-gray-500 items-center'>
              <button className='rounded-full bg-gray-100 p-1'>
                <Minus className='text-gray-500' />
              </button>

              <input className='w-12 text-lg text-center appearance-none outline-none' type="number" defaultValue={1} />

              <button className='rounded-full bg-gray-100 p-1'>
                <Plus className='text-gray-500' />
              </button>
            </div>

            <span className='text-gray-600'>Piece(s)</span>
          </div>
          <div className='flex border-b-2 mb-3 items-center py-3 gap-3 text-sm'>
            <span>Green ball peppers</span>

            <div className='flex justify-between text-gray-500 items-center'>
              <button className='rounded-full bg-gray-100 p-1'>
                <Minus className='text-gray-500' />
              </button>

              <input className='w-12 text-lg text-center appearance-none outline-none' type="number" defaultValue={1} />

              <button className='rounded-full bg-gray-100 p-1'>
                <Plus className='text-gray-500' />
              </button>
            </div>

            <span className='text-gray-600'>Piece(s)</span>
          </div>

          <div className='flex border-b-2 mb-3 items-center py-3 gap-3 text-sm'>
            <span>Green ball peppers</span>

            <div className='flex justify-between text-gray-500 items-center'>
              <button className='rounded-full bg-gray-100 p-1'>
                <Minus className='text-gray-500' />
              </button>

              <input className='w-12 text-lg text-center appearance-none outline-none' type="number" defaultValue={1} />

              <button className='rounded-full bg-gray-100 p-1'>
                <Plus className='text-gray-500' />
              </button>
            </div>

            <span className='text-gray-600'>Piece(s)</span>
          </div>
          
          <div className='flex border-b-2 mb-3 items-center py-3 gap-3 text-sm'>
            <span>Green ball peppers</span>

            <div className='flex justify-between text-gray-500 items-center'>
              <button className='rounded-full bg-gray-100 p-1'>
                <Minus className='text-gray-500' />
              </button>

              <input className='w-12 text-lg text-center appearance-none outline-none' type="number" defaultValue={1} />

              <button className='rounded-full bg-gray-100 p-1'>
                <Plus className='text-gray-500' />
              </button>
            </div>

            <span className='text-gray-600'>Piece(s)</span>
          </div>

        </div>

        <div>
          <button className='bg-green-500 text-white py-3 px-10 rounded-full w-full mb-3'>
            File Hero's Report
          </button>

          <button className='bg-gray-200 w-full py-3 rounded-full'>Wait, Go Back</button>
        </div>


      </div>

    </div>
  )
}

export default TallyScore