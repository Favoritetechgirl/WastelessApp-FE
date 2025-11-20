import React, { useState } from 'react'


import image_assets from '../assets/images/images'
import { UserCircle, Check } from 'lucide-react'


import * as Switch from '@radix-ui/react-switch'
import * as Checkbox from '@radix-ui/react-checkbox'


const Onboarding = () => {

  const [onboardingSlide, setOnboardingSlide] = useState(1)

  const [locations, setLocations] = useState({
    fridge: true,
    pantry: true,
    freezer: false,
  });

  const [reminders, setReminders] = useState({
    oneDay: true,
    threeDays: true,
    onExpiry: false,
  });

  const toggleLocation = (key) => {
    setLocations((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleReminder = (key) => {
    setReminders((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className='h-screen w-screen border-4 border-red-600 lg:flex items-center justify-center bg-gray-200'>

      {
        onboardingSlide === 1 ? (
          <>
            <div className='slide-container flex flex-col justify-between items-center h-full lg:h-fit lg:w-9/12 mx-auto bg-white lg:rounded-3xl lg:p-8'>

              {/* INDICATOR */}
              <div className='flex justify-between w-full lg:w-9/12 gap-2 my-8'>
                <span className='flex-1 bg-green-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
              </div>

              {/* MAIN SCREEN */}
              <div className='p-4 md:flex md:items-center'>
                <div className='flex-1'>
                  <img className='flex-1 mb-10 lg:mb-3' src={image_assets.onboard_1} alt="" />
                </div>



                <div className='flex-1 lg:text-start'>
                  <p className='text-3xl font-semibold w-9/12 mx-auto lg:mx-0 mb-4'>DO YOU FORGET YOUR FOOD?</p>

                  <p className='text-gray-800 w-10/12 mx-auto lg:mx-0'>Out of sight, out of mind. We are here to save those lonely ingradients before they go bad and cost you cash.</p>
                </div>
              </div>

              {/* NAVIGATOR */}

              <div className='h-20 w-full mb-12 lg:mb-0 flex items-center justify-between p-3'>
                <button className='py-4 px-10 bg-gray-200 rounded-4xl'>
                  Skip
                </button>

                <button
                  onClick={() => setOnboardingSlide((prev) => prev + 1)}
                  className='bg-green-500 text-white py-4 px-10 rounded-4xl'>
                  Next
                </button>
              </div>
            </div>
          </>
        ) : onboardingSlide === 2 ? (
          <>
            <div className='slide-container flex flex-col justify-between items-center h-full lg:h-fit lg:w-9/12 mx-auto bg-white lg:rounded-3xl lg:p-8'>

              {/* INDICATOR */}
              <div className='flex justify-between w-full lg:w-9/12 gap-2 my-8'>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-green-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
              </div>

              {/* MAIN SCREEN */}
              <div className='p-4 md:flex md:items-center'>
                <div className='flex-1'>
                  <img className='flex-1 mb-10 lg:mb-3' src={image_assets.onboard_1} alt="" />
                </div>


                <div className='flex-1 lg:text-start'>
                  <p className='text-3xl font-semibold w-9/12 mx-auto lg:mx-0 mb-4'>
                    Never Waste Food Again
                  </p>

                  <p className='text-gray-800 w-10/12 mx-auto lg:mx-0'>
                    No more guesswork! We send smart alert that remind you when ites are running out of shelf life.
                  </p>
                </div>
              </div>

              {/* NAVIGATOR */}

              <div className='h-20 w-full mb-12 lg:mb-0 flex items-center justify-between p-3'>
                <button className='py-4 px-10 bg-gray-200 rounded-4xl'>
                  Skip
                </button>

                <button
                  onClick={() => setOnboardingSlide((prev) => prev + 1)}
                  className='bg-green-500 text-white py-4 px-10 rounded-4xl'>
                  Next
                </button>
              </div>

            </div>
          </>
        ) : onboardingSlide === 3 ? (
          <>
            <div className='slide-container flex flex-col justify-between items-center h-full lg:h-fit lg:w-9/12 mx-auto bg-white lg:rounded-3xl lg:p-8'>

              {/* INDICATOR */}
              <div className='flex justify-between w-full lg:w-9/12 gap-2 my-8'>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-green-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
              </div>

              {/* MAIN SCREEN */}
              <div className='p-4 md:flex md:items-center'>
                <div className='flex-1'>
                  <img className='flex-1 mb-10 lg:mb-3' src={image_assets.onboard_3} alt="" />
                </div>


                <div className='flex-1 lg:text-start'>
                  <p className='text-3xl font-semibold w-9/12 mx-auto lg:mx-0 mb-4'>
                    Find the Perfect Recipe
                  </p>

                  <p className='text-gray-800 w-10/12 mx-auto lg:mx-0'>
                    Track your inventory, and find recipe using exactly what you already have in the fridge.
                  </p>
                </div>
              </div>

              {/* NAVIGATOR */}

              <div className='h-20 w-full mb-12 lg:mb-0 flex items-center justify-between p-3'>
                <button className='py-4 px-10 bg-gray-200 rounded-4xl'>
                  Skip
                </button>

                <button
                  onClick={() => setOnboardingSlide((prev) => prev + 1)}
                  className='bg-green-500 text-white py-4 px-10 rounded-4xl'>
                  Next
                </button>
              </div>

            </div>
          </>
        ) : onboardingSlide === 4 ? (
          <>
            <div className='slide-container flex flex-col justify-between items-center h-full lg:h-fit lg:w-9/12 mx-auto bg-white lg:rounded-3xl lg:p-8'>

              {/* INDICATOR */}
              <div className='flex justify-between w-full lg:w-9/12 gap-2 my-8'>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-green-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
              </div>

              {/* MAIN SCREEN */}
              <div className='p-4 md:flex md:items-center'>
                <div className='flex-1'>
                  <img className='flex-1 mb-10 lg:mb-3' src={image_assets.onboard_1} alt="" />
                </div>


                <div className='flex-1 lg:text-start'>
                  <p className='text-3xl font-semibold w-9/12 mx-auto lg:mx-0 mb-4'>
                    Give WasteLess its Superpowers!
                  </p>

                  <p className='text-gray-800 w-10/12 mx-auto lg:mx-0'>
                    We need camera access fro smart Photo Entry (our AI identifies items!), plus Notifications fro those life-saving Expiration Alerts!
                  </p>
                </div>
              </div>

              {/* NAVIGATOR */}

              <div className='h-20 w-full mb-12 lg:mb-0 flex items-center justify-between p-3'>
                <button className='py-4 px-10 bg-gray-200 rounded-4xl'>
                  Skip
                </button>

                <button
                  onClick={() => setOnboardingSlide((prev) => prev + 1)}
                  className='bg-green-500 text-white py-4 px-10 rounded-4xl'>
                  Next
                </button>
              </div>

            </div>
          </>
        ) : onboardingSlide === 5 ? (
          <>
            <div className='slide-container flex flex-col justify-between items-center h-full lg:h-fit lg:w-9/12 mx-auto bg-white lg:rounded-3xl lg:p-8'>

              {/* INDICATOR */}
              <div className='flex justify-between w-full lg:w-9/12 gap-2 my-8'>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-green-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
              </div>

              {/* MAIN SCREEN */}
              <div className='p-4 lg:flex lg:items-center lg:gap-6'>

                <div className='lg:flex-1'>
                  <div className='bg-gray-100 h-35 w-35 mx-auto rounded-full'>

                  </div>
                  <p className='text-green-500 my-3'>Change Profile Picture</p>

                  <div className='text-start my-8'>
                    <label className='mb-3 block'>
                      Username
                    </label>
                    <div className='flex items-center gap-3 px-4 rounded-3xl h-12 border border-gray-300'>
                      <UserCircle className='text-gray-500' />
                      <input type="text" placeholder='Enter your hero tag' className='flex-1 outline-0' />
                    </div>

                  </div>
                </div>



                <div className='flex-1 lg:text-start'>
                  <p className='text-3xl font-semibold w-9/12 mx-auto lg:mx-0 mb-4'>
                    Who is the Kitchen Hero?
                  </p>

                  <p className='text-gray-800 w-10/12 mx-auto lg:mx-0'>
                    Every hero needs an awesome name! Give youself a cool kitchen nickname, it's how you'll be celebrated on your dashboard and earn those achievements. (Adding a profile picture is optional).
                  </p>
                </div>
              </div>

              {/* NAVIGATOR */}

              <div className='h-20 w-full mb-12 lg:mb-0 flex items-center justify-between lg:justify-end p-3'>

                <button
                  onClick={() => setOnboardingSlide((prev) => prev + 1)}
                  className='bg-green-500 text-white py-4 px-10 rounded-4xl flex-1 lg:flex-none'>
                  Save Profile
                </button>
              </div>

            </div>
          </>
        ) : onboardingSlide === 6 ? (
          <>
            <div className='slide-container flex flex-col justify-between items-center h-full lg:h-fit lg:w-9/12 mx-auto bg-white lg:rounded-3xl lg:p-8'>
              {/* INDICATOR */}
              <div className='flex justify-between w-full lg:w-9/12 gap-2 my-8'>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-green-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
              </div>

              {/* MAIN SCREEN */}
              <div className='w-full p-4 lg:flex lg:items-center lg:gap-12 text-start'>


                <div className='flex-1'>
                  {/* Default Location */}
                  <h2 className="text-lg font-semibold">Default Location</h2>
                  <p className="text-gray-500 text-sm mb-4">
                    Where Do You Keep Most Food?
                  </p>

                  <div className="space-y-4 mb-8">
                    {[
                      { key: "fridge", label: "Fridge" },
                      { key: "pantry", label: "Pantry" },
                      { key: "freezer", label: "Freezer" },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex justify-between items-center py-2 border-b border-gray-100"
                      >
                        <span className="text-gray-700">{item.label}</span>

                        <Checkbox.Root
                          checked={locations[item.key]}
                          onCheckedChange={() => toggleLocation(item.key)}
                          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors
                ${locations[item.key]
                              ? "bg-green-500 border-green-500"
                              : "border-gray-400"
                            }
              `}
                        >
                          <Checkbox.Indicator>
                            <Check className="text-white" />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                      </div>
                    ))}

                    {/* Let me name it */}
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">Let Me Name It</span>
                      <div className="w-7 h-7 border border-gray-400 rounded-full flex items-center justify-center">

                      </div>
                    </div>
                  </div>
                </div>


                <div className='flex-1'>
                  {/* Reminder Days */}
                  <h2 className="text-lg font-semibold">Reminder Days</h2>
                  <p className="text-gray-500 text-sm mb-4">
                    When Should We Sound the Alarm?
                  </p>

                  <div className="space-y-5 mb-10">
                    {/* 1 Day */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">1 Day Before Expiry</p>
                        <p className="text-gray-500 text-sm">Get a reminder for items expiring tomorrow</p>
                      </div>

                      <Switch.Root
                        checked={reminders.oneDay}
                        onCheckedChange={() => toggleReminder("oneDay")}
                        className="
              w-11 h-6 rounded-full relative transition-colors
              bg-gray-300 data-[state=checked]:bg-green-500
            "
                      >
                        <Switch.Thumb
                          className="
                block w-5 h-5 bg-white rounded-full shadow-sm transition-transform
                translate-x-0.5 data-[state=checked]:translate-x-[22px]
              "
                        />
                      </Switch.Root>
                    </div>

                    {/* 3 Days */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">3 Days Before Expiry</p>
                        <p className="text-gray-500 text-sm">Get a reminder for items expiring soon</p>
                      </div>

                      <Switch.Root
                        checked={reminders.threeDays}
                        onCheckedChange={() => toggleReminder("threeDays")}
                        className="
              w-11 h-6 rounded-full relative transition-colors
              bg-gray-300 data-[state=checked]:bg-green-500
            "
                      >
                        <Switch.Thumb
                          className="
                block w-5 h-5 bg-white rounded-full shadow-sm transition-transform
                translate-x-0.5 data-[state=checked]:translate-x-[22px]
              "
                        />
                      </Switch.Root>
                    </div>

                    {/* On Expiry */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">On Expiry Date</p>
                        <p className="text-gray-500 text-sm">Get a final reminder on the day of expiry</p>
                      </div>

                      <Switch.Root
                        checked={reminders.onExpiry}
                        onCheckedChange={() => toggleReminder("onExpiry")}
                        className="
              w-11 h-6 rounded-full relative transition-colors
              bg-gray-300 data-[state=checked]:bg-green-500
            "
                      >
                        <Switch.Thumb
                          className="
                block w-5 h-5 bg-white rounded-full shadow-sm transition-transform
                translate-x-0.5 data-[state=checked]:translate-x-[22px]
              "
                        />
                      </Switch.Root>
                    </div>
                  </div>
                </div>

              </div>

              {/* NAVIGATOR */}

              <div className='h-20 w-full mb-12 lg:mb-0 flex items-center justify-between lg:justify-end p-3'>
                <button
                  onClick={() => setOnboardingSlide((prev) => prev + 1)}
                  className='flex-1 lg:flex-none bg-green-500 text-white py-4 px-10 rounded-4xl'>
                  Continue
                </button>
              </div>

            </div>
          </>
        ) : onboardingSlide === 7 ? (
          <>
            <div className='slide-container flex flex-col justify-between items-center h-full lg:h-fit lg:w-9/12 mx-auto bg-white lg:rounded-3xl lg:p-8'>

              {/* INDICATOR */}
              <div className='flex justify-between w-full lg:w-9/12 gap-2 my-8'>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-gray-400 h-2 rounded-2xl'></span>
                <span className='flex-1 bg-green-400 h-2 rounded-2xl'></span>
              </div>

              {/* MAIN SCREEN */}
              <div className='p-4 md:flex md:items-center'>
                <div className='flex-1'>
                  <img className='flex-1 mb-10 lg:mb-3' src={image_assets.onboard_1} alt="" />
                </div>


                <div className='flex-1 lg:text-start'>
                  <p className='text-3xl font-semibold w-9/12 mx-auto lg:mx-0 mb-4'>
                    Add Your First Item
                  </p>

                  <p className='text-gray-800 w-10/12 mx-auto lg:mx-0'>
                    Ready for some kitchen magic? Snap a pic of your groceries with smart Photo Entry or type them in to instantly populate
                    your smart inventory.
                  </p>
                </div>
              </div>

              {/* NAVIGATOR */}

              <div className='h-20 w-full mb-12 lg:mb-0 flex items-center justify-between lg:justify-end p-3'>
                <button
                  onClick={() => setOnboardingSlide((prev) => prev + 1)}
                  className='bg-green-500 text-white py-4 px-10 rounded-4xl'>
                  Let's do this Thing
                </button>
              </div>

            </div>
          </>
        ) : ''
      }

    </div>
  )
}

export default Onboarding