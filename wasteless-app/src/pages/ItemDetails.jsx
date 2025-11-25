import { ArrowLeft, Pen, Trash } from 'lucide-react'
import React from 'react'
import image_assets from '../assets/images/images'
import * as RadioGroup from '@radix-ui/react-radio-group'

const ItemDetails = () => {
  return (
    // THE WHOLE PAGE
    <div>
      {/* Mobile Screen */}
      <div className='w-screen border-4 border-green-500'>
        
        <div className='flex items-center justify-between p-3 py-4 sticky top-0 bg-white'>
          <ArrowLeft />

          <span>Item Details</span>

          <Trash className='text-red-500' />
        </div>

        <div className='p-3 text-start'>

          <img className='border-2 border-red-400 rounded-2xl' src={image_assets.onboard_1} alt="" />

          <p className='text-3xl font-semibold my-3'>Ofada Rice</p>

          <div className='flex justify-between text-xs mb-8'>
            <span className='p-3 px-5 bg-red-100 text-red-400 rounded-3xl'>
              Expires in 10 days
            </span>

            <button className='flex items-center gap-2 p-3 px-5 border border-gray-300 rounded-3xl'>
              <Pen size={15} />
              Edit Item
            </button>
          </div>

          <div className='py-4 text-sm'>

            <div className='one-detail flex border-b border-gray-300 py-2 mb-2'>
              <span className='flex-1'>Quantity</span>
              <span className='flex-2 text-gray-700'>20 Cups</span>
            </div>
            <div className='one-detail flex border-b border-gray-300 py-2 mb-2'>
              <span className='flex-1'>Category</span>
              <span className='flex-2 text-gray-700'>Grains and Baking</span>
            </div>
            <div className='one-detail flex border-b border-gray-300 py-2 mb-2'>
              <span className='flex-1'>Location</span>
              <span className='flex-2 text-gray-700'>Pantry</span>
            </div>
            <div className='one-detail flex border-b border-gray-300 py-2 mb-2'>
              <span className='flex-1'>Package Size</span>
              <span className='flex-2 text-gray-700'>4kg</span>
            </div>
            <div className='one-detail flex border-b border-gray-300 py-2 mb-2'>
              <span className='flex-1'>Expiry Date</span>
              <span className='flex-2 text-gray-700'>20th November 2025</span>
            </div>

          </div>

          <button className='w-full p-3 border border-gray-300 rounded-3xl'>
            What can i make?
          </button>


          <div className='my-6'>
            <p className='text-lg'>How was the rescue Mission?</p>
            <p className='text-sm text-gray-700 mb-3'>Did you use it, waste it, or just begin the short term countdown? Select one outcome below to update the item's status.</p>


            <RadioGroup.Root
              className="flex flex-col gap-4"
              defaultValue="option1"
            >

              {/* OPTION 1 */}
              <label
                htmlFor="r1"
                className="flex items-center gap py-4 justify-between cursor-pointer border-b border-gray-300"
              >
                <span className="text-sm text-gray-700">Option 1</span>

                <RadioGroup.Item
                  value="option1"
                  id="r1"
                  className="w-5 h-5 rounded-full border border-gray-400
                     data-[state=checked]:border-green-400
                     data-[state=checked]:bg-green-100
                     flex items-center justify-center"
                >
                  <RadioGroup.Indicator className="w-3 h-3 rounded-full bg-green-400" />
                </RadioGroup.Item>
              </label>

              {/* OPTION 2 */}
              <label
                htmlFor="r2"
                className="flex items-center gap py-4 justify-between cursor-pointer border-b border-gray-300"
              >
                <span className="text-sm text-gray-700">Option 2</span>

                <RadioGroup.Item
                  value="option2"
                  id="r2"
                  className="w-5 h-5 rounded-full border border-gray-400
                     data-[state=checked]:border-green-400
                     data-[state=checked]:bg-green-100
                     flex items-center justify-center"
                >
                  <RadioGroup.Indicator className="w-3 h-3 rounded-full bg-green-400" />
                </RadioGroup.Item>
              </label>

              {/* OPTION 3 */}
              <label
                htmlFor="r3"
                className="flex items-center gap py-4 justify-between cursor-pointer border-b border-gray-300"
              >
                <span className="text-sm text-gray-700">Option 3</span>

                <RadioGroup.Item
                  value="option3"
                  id="r3"
                  className="w-5 h-5 rounded-full border border-gray-400
                     data-[state=checked]:border-green-400
                     data-[state=checked]:bg-green-100
                     flex items-center justify-center"
                >
                  <RadioGroup.Indicator className="w-3 h-3 rounded-full bg-green-400" />
                </RadioGroup.Item>
              </label>


            </RadioGroup.Root>

          </div>

          <button className='bg-green-500 text-white py-3 px-10 rounded-full w-full'>
            Update Status
          </button>

        </div>

      </div>

      {/* DESKTOP SCREEN */}
      <div>
        
      </div>
    </div>
  )
}

export default ItemDetails