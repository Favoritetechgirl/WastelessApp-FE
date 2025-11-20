import React from 'react'
import { ArrowLeft, Camera, ChevronDown, ChevronRightIcon, DollarSign, Minus, Plus } from 'lucide-react'

const ItemEntry = () => {
  return (
    <div className='h-screen w-screen border-4 border-red-600 lg:flex items-center justify-center bg-gray-200'>




      <div className='main h-full w-full border border-green-500 bg-white p-3'>
        <div className='flex justify-between items-center my-2 mb-6 sticky top-1'>
          <button className='w-6'>
            <ArrowLeft />
          </button>

          <span className='text-xl'>
            Add Item
          </span>

          <span className='w-6'></span>
        </div>
        {/* part 1 */}

        <div>
          <div className='w-full'>

            <div className='one-input text-start mb-5'>
              <label className='block mb-2 text-gray-900' htmlFor="">Item name</label>
              <input type="text" className='px-4 text-sm border border-gray-500 outline-0 w-full h-10 rounded-2xl' placeholder='What are you saving?' />
            </div>

            <div className='one-input h-10 rounded-2xl flex items-center px-4 text-sm bg-gray-100 mb-5'>
              <Camera size={20} className='mr-3 text-gray-500' />
              <span className='flex-1 text-start text-gray-500'>Snap a pic (Optional)</span>
              <ChevronRightIcon className='text-gray-500' />
            </div>

            <div className='one-input text-start mb-5'>
              <label className='block mb-2 text-gray-900' htmlFor="">Quantity</label>

              <div className='flex justify-between gap-3 p-2'>

                <div className='flex flex-1 justify-between text-gray-500 items-center'>
                  <button className='rounded-full bg-gray-100 p-2'>
                    <Minus className='text-gray-500' />
                  </button>

                  <input className='w-20 text-xl text-center' type="number" defaultValue={1} />

                  <button className='rounded-full bg-gray-100 p-2'>
                    <Plus className='text-gray-500' />
                  </button>
                </div>

                <div className='flex-1 flex rounded-3xl items-center text-gray-500 bg-gray-100 px-4'>
                  <select className='appearance-none outline-0 flex-1' name="" id="">
                    <option value="">Unit</option>
                    <option value="">KG</option>
                    <option value="">Pieces</option>
                    <option value="">Gram</option>
                  </select>
                  <ChevronDown />
                </div>
              </div>

            </div>

            <div className='one-input text-start mb-5'>
              <label className='block mb-2 text-gray-500' htmlFor="">Category</label>

              <div className='flex-1 flex rounded-3xl items-center text-gray-500 bg-gray-100 px-6 h-12'>
                <select className='appearance-none outline-0 flex-1' name="" id="">
                  <option value="">Produce</option>
                  <option value="">KG</option>
                  <option value="">Pieces</option>
                  <option value="">Gram</option>
                </select>
                <ChevronDown />
              </div>
            </div>


            <div className='one-input text-start mb-5'>
              <label className='block mb-2 text-gray-500' htmlFor="">Storage Location</label>

              <div className='flex-1 flex rounded-3xl items-center text-gray-500 bg-gray-100 px-6 h-12'>
                <select className='appearance-none outline-0 flex-1' name="" id="">
                  <option value="">Fridge</option>
                  <option value="">KG</option>
                  <option value="">Pieces</option>
                  <option value="">Gram</option>
                </select>
                <ChevronDown />
              </div>
            </div>


            <div className='one-input text-start mb-5'>
              <label className='block mb-2 text-gray-900' htmlFor="">Package Size</label>

              <div className='flex justify-between gap-3 p-2'>

                <div className='flex flex-1 justify-between text-gray-500 items-center'>
                  <button className='rounded-full bg-gray-100 p-2'>
                    <Minus className='text-gray-500' />
                  </button>

                  <input className='w-20 text-xl text-center' type="number" defaultValue={1} />

                  <button className='rounded-full bg-gray-100 p-2'>
                    <Plus className='text-gray-500' />
                  </button>
                </div>

                <div className='flex-1 flex rounded-3xl items-center text-gray-500 bg-gray-100 px-4'>
                  <select className='appearance-none outline-0 flex-1' name="" id="">
                    <option value="">Unit</option>
                    <option value="">KG</option>
                    <option value="">Pieces</option>
                    <option value="">Gram</option>
                  </select>
                  <ChevronDown />
                </div>
              </div>

            </div>


            <div className='one-input text-start mb-5'>
              <label className='block mb-2 text-gray-900' htmlFor=""> Price</label>
              <div className='flex items-center px-4 text-sm border border-gray-500 outline-0 w-full h-10 rounded-2xl gap-2'>
                <DollarSign className='text-gray-500' size={20} />
                <input type="text" className='' placeholder='How much did this cost?' />
              </div>

            </div>


             <div className='one-input text-start mb-5'>
              <label className='block mb-2 text-gray-500' htmlFor="">Does this spoil after opening?</label>

              <div className='flex-1 flex rounded-3xl items-center text-gray-500 bg-gray-100 px-6 h-12'>
                <select className='appearance-none outline-0 flex-1' name="" id="">
                  <option value="">No, it doesn't</option>
                  <option value="">KG</option>
                  <option value="">Pieces</option>
                  <option value="">Gram</option>
                </select>
                <ChevronDown />
              </div>
            </div>




          </div>
        </div>


      </div>

    </div>
  )
}

export default ItemEntry