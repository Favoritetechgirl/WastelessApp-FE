import React from 'react'

const Reserve = () => {
  return (
    <div>
      <div className='p-4 border-4 flex-1'>
        Where is food
        <div className='border border-red-400 text-start'>
          <p className='text-lg font-semibold'>Default Location</p>
          <p className='text-gray-600 mb-6'>Where do you keep most food?</p>

          <form>

            <div className="flex items-center space-x-3">
              <Checkbox.Root
                className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-centerdata-[state=checked]:bg-green-500 data-[state=checked]:border-green-500transition-colors"
              >
                <Checkbox.Indicator>
                  <Check className="text-white" />
                </Checkbox.Indicator>
              </Checkbox.Root>

              <span className="text-sm">Pantry</span>
            </div>



            <div className="flex items-center space-x-3">
              <label htmlFor="reminder" className="text-sm">1 Day Before Expiry</label>

              <Switch.Root
                id="reminder"
                className="w-11 h-6 rounded-full bg-gray-300 data-[state=checked]:bg-green-500 relative transition-colors"
              >
                <Switch.Thumb
                  className="block w-5 h-5 bg-white rounded-full shadow-sm translate-x-0.5 data-[state=checked :translate-x-[22px] transition-transform"
                />
              </Switch.Root>
            </div>

          </form>


        </div>



      </div>
    </div>
  )
}

export default Reserve