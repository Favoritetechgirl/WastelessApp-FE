import React, { useState } from 'react'
import { X } from 'lucide-react'
import * as RadioGroup from '@radix-ui/react-radio-group'

const SortAndFilter = () => {

  // STATES
  const [urgency, setUrgency] = useState("expiring");
  const [location, setLocation] = useState("all");
  const [category, setCategory] = useState("all");

  const urgencyOptions = [
    { value: "all", label: "All Items" },
    { value: "expired", label: "Expired Items" },
    { value: "expiring", label: "Expiring Soon" },
    { value: "opened", label: "Freshly Opened" },
  ];

  const locationOptions = [
    { value: "all", label: "All Locations" },
    { value: "fridge", label: "Fridge" },
    { value: "pantry", label: "Pantry" },
    { value: "freezer", label: "Freezer" },
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "produce", label: "Produce" },
    { value: "meat", label: "Meat, Poultry & Seafood" },
    { value: "dairy", label: "Dairy & Eggs" },
    { value: "grains", label: "Grains & Baking" },
    { value: "canned", label: "Canned & Jarred" },
    { value: "frozen", label: "Frozen Goods" },
    { value: "condiments", label: "Condiments & Sauces" },
    { value: "beverages", label: "Beverages" },
  ];

  const pillBase = "px-4 py-2 rounded-full text-sm cursor-pointer transition";



  return (
    <div className='w-screen lg:h-screen border-4 border-green-500 lg:flex items-center bg-gray-200'>

      <div className='flex items-center justify-between p-3 py-4 sticky top-0 bg-white lg:hidden'>
        <span></span>

        <span>Sort and Filter</span>

        <X />
      </div>


      <div className='p-5 lg:w-9/12 mx-auto bg-white rounded-2xl'>

        <div className='lg:flex gap-8'>
          {/* left */}
          <div className='text-start mb-8 flex-1'>
            <p className='mb-5 font-semibold'>Sort BY</p>

            <RadioGroup.Root
              className="flex flex-col gap-4"
              defaultValue="option1"
            >

              {/* OPTION 1 */}
              <label
                htmlFor="r1"
                className="flex items-center gap-3 bg-gray-100 p-3 justify-between rounded-2xl cursor-pointer"
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
                className="flex items-center gap-3 bg-gray-100 p-3 justify-between rounded-2xl cursor-pointer"
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
                className="flex items-center gap-3 bg-gray-100 p-3 justify-between rounded-2xl cursor-pointer"
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

              {/* OPTION 4 */}
              <label
                htmlFor="r4"
                className="flex items-center gap-3 bg-gray-100 p-3 justify-between rounded-2xl cursor-pointer"
              >
                <span className="text-sm text-gray-700">Option 4</span>

                <RadioGroup.Item
                  value="option4"
                  id="r4"
                  className="w-5 h-5 rounded-full border border-gray-400
                     data-[state=checked]:border-green-400
                     data-[state=checked]:bg-green-100
                     flex items-center justify-center"
                >
                  <RadioGroup.Indicator className="w-3 h-3 rounded-full bg-green-400" />
                </RadioGroup.Item>
              </label>

              {/* OPTION 5 */}
              <label
                htmlFor="r5"
                className="flex items-center gap-3 bg-gray-100 p-3 justify-between rounded-2xl cursor-pointer"
              >
                <span className="text-sm text-gray-700">Option 5</span>

                <RadioGroup.Item
                  value="option5"
                  id="r5"
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

          {/* right */}
          <div className='flex-1 text-start'>
            <p className='font-semibold mb-5'>Filter By</p>


            <div className="space-y-6 max-w-sm text-start">

              {/* URGENCY */}
              <div>
                <h3 className="text-gray-800 font-medium mb-2">Urgency</h3>

                <div className="flex flex-wrap gap-3">
                  {urgencyOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setUrgency(opt.value)}
                      className={
                        pillBase +
                        (urgency === opt.value
                          ? " bg-green-400 text-white"
                          : " bg-gray-100 text-gray-700")
                      }
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>


              {/* LOCATION */}
              <div>
                <h3 className="text-gray-800 font-medium mb-2">Location</h3>

                <div className="flex flex-wrap gap-3">
                  {locationOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setLocation(opt.value)}
                      className={
                        pillBase +
                        (location === opt.value
                          ? " bg-green-400 text-white"
                          : " bg-gray-100 text-gray-700")
                      }
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>


              {/* CATEGORY */}
              <div>
                <h3 className="text-gray-800 font-medium mb-2">Category</h3>

                <div className="flex flex-wrap gap-3">
                  {categoryOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setCategory(opt.value)}
                      className={
                        pillBase +
                        (category === opt.value
                          ? " bg-green-400 text-white"
                          : " bg-gray-100 text-gray-700")
                      }
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className='h-20 w-full mb-12 mt-5 lg:mb-0 flex items-center justify-between p-3'>
          <button className='py-4 px-10 bg-gray-200 rounded-4xl hidden lg:flex'>
            Cancel
          </button>

          <button className='bg-green-500 text-white py-3 px-10 rounded-4xl flex-1 lg:flex-0'>
            Apply
          </button>
        </div>
      </div>




    </div>
  )
}

export default SortAndFilter