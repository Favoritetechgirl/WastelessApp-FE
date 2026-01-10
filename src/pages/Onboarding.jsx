import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import image_assets from '../assets/images/images'
import { UserCircle, Check } from 'lucide-react'
import * as Switch from '@radix-ui/react-switch'
import * as Checkbox from '@radix-ui/react-checkbox'
import authService from '../services/authService'
import { toast } from 'react-toastify'

const Onboarding = () => {
  const navigate = useNavigate()
  const [onboardingSlide, setOnboardingSlide] = useState(1)
  const [username, setUsername] = useState('')
  const [, setProfilePicture] = useState(null)
  const [profilePicturePreview, setProfilePicturePreview] = useState(null)

  const [locations, setLocations] = useState({
    fridge: true,
    pantry: true,
    freezer: false,
  })

  const [reminders, setReminders] = useState({
    oneDay: true,
    threeDays: true,
    onExpiry: false,
  })

  const toggleLocation = (key) => {
    setLocations((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleReminder = (key) => {
    setReminders((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfilePicture(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const saveProfile = () => {
    // Save username and profile picture to localStorage for now
    if (username) {
      localStorage.setItem('username', username)
    }
    if (profilePicturePreview) {
      localStorage.setItem('profilePicture', profilePicturePreview)
    }
    setOnboardingSlide((prev) => prev + 1)
  }

  const completeOnboarding = async () => {
    try {
      // Call backend API to mark onboarding as completed
      await authService.completeOnboarding();

      // Navigate to inventory
      navigate('/inventory');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast.error('Failed to complete onboarding. Please try again.');
    }
  }

  const indicator = (activeIndex) => (
    <div className='flex justify-between w-full lg:w-9/12 gap-2 my-8 px-2'>
      {[...Array(7)].map((_, idx) => (
        <span
          key={idx}
          className={`flex-1 h-2 rounded-2xl ${idx === activeIndex ? 'bg-green-400' : 'bg-gray-400'}`}
        ></span>
      ))}
    </div>
  )

  return (
    <div className='h-screen w-screen lg:flex items-center justify-center bg-gray-200'>
      {onboardingSlide === 1 && (
        <div className='slide-container flex flex-col justify-between items-center h-full lg:h-fit lg:w-9/12 mx-auto bg-white lg:rounded-3xl lg:p-8'>
          {indicator(0)}

          <div className='p-4 md:flex md:items-center'>
            <div className='flex-1'>
              <img className='flex-1 mb-10 lg:mb-3' src={image_assets.onboard_1} alt='' />
            </div>

            <div className='flex-1 text-center lg:text-start'>
              <p className='text-3xl font-semibold w-9/12 mx-auto lg:mx-0 mb-4'>DO YOU FORGET YOUR FOOD?</p>
              <p className='text-gray-800 w-10/12 mx-auto lg:mx-0'>
                Out of sight, out of mind. We are here to save those lonely ingradients before they go bad and cost you
                cash.
              </p>
            </div>
          </div>

          <div className='h-20 w-full mb-12 lg:mb-0 flex items-center justify-between p-3'>
            <button onClick={completeOnboarding} className='py-4 px-10 bg-gray-200 rounded-full'>Skip</button>
            <button
              onClick={() => setOnboardingSlide((prev) => prev + 1)}
              className='bg-green-500 text-white py-4 px-10 rounded-full'>
              Next
            </button>
          </div>
        </div>
      )}

      {onboardingSlide === 2 && (
        <div className='slide-container flex flex-col justify-between items-center h-full lg:h-fit lg:w-9/12 mx-auto bg-white lg:rounded-3xl lg:p-8'>
          {indicator(1)}

          <div className='p-4 md:flex md:items-center'>
            <div className='flex-1'>
              <img className='flex-1 mb-10 lg:mb-3' src={image_assets.onboard_1} alt='' />
            </div>

            <div className='flex-1 text-center lg:text-start'>
              <p className='text-3xl font-semibold w-9/12 mx-auto lg:mx-0 mb-4'>Never Waste Food Again</p>
              <p className='text-gray-800 w-10/12 mx-auto lg:mx-0'>
                No more guesswork! We send smart alert that remind you when ites are running out of shelf life.
              </p>
            </div>
          </div>

          <div className='h-20 w-full mb-12 lg:mb-0 flex items-center justify-between p-3'>
            <div className='flex gap-2'>
              <button onClick={() => setOnboardingSlide((prev) => prev - 1)} className='py-4 px-10 bg-gray-200 rounded-full'>Back</button>
              <button onClick={completeOnboarding} className='py-4 px-10 bg-gray-200 rounded-full'>Skip</button>
            </div>
            <button
              onClick={() => setOnboardingSlide((prev) => prev + 1)}
              className='bg-green-500 text-white py-4 px-10 rounded-full'>
              Next
            </button>
          </div>
        </div>
      )}

      {onboardingSlide === 3 && (
        <div className='slide-container flex flex-col justify-between items-center h-full lg:h-fit lg:w-9/12 mx-auto bg-white lg:rounded-3xl lg:p-8'>
          {indicator(2)}

          <div className='p-4 md:flex md:items-center'>
            <div className='flex-1'>
              <img className='flex-1 mb-10 lg:mb-3' src={image_assets.onboard_3} alt='' />
            </div>

            <div className='flex-1 text-center lg:text-start'>
              <p className='text-3xl font-semibold w-9/12 mx-auto lg:mx-0 mb-4'>Find the Perfect Recipe</p>
              <p className='text-gray-800 w-10/12 mx-auto lg:mx-0'>
                Track your inventory, and find recipe using exactly what you already have in the fridge.
              </p>
            </div>
          </div>

          <div className='h-20 w-full mb-12 lg:mb-0 flex items-center justify-between p-3'>
            <div className='flex gap-2'>
              <button onClick={() => setOnboardingSlide((prev) => prev - 1)} className='py-4 px-10 bg-gray-200 rounded-full'>Back</button>
              <button onClick={completeOnboarding} className='py-4 px-10 bg-gray-200 rounded-full'>Skip</button>
            </div>
            <button
              onClick={() => setOnboardingSlide((prev) => prev + 1)}
              className='bg-green-500 text-white py-4 px-10 rounded-full'>
              Next
            </button>
          </div>
        </div>
      )}

      {onboardingSlide === 4 && (
        <div className='slide-container flex flex-col justify-between items-center h-full lg:h-fit lg:w-9/12 mx-auto bg-white lg:rounded-3xl lg:p-8'>
          {indicator(3)}

          <div className='p-4 md:flex md:items-center'>
            <div className='flex-1'>
              <img className='flex-1 mb-10 lg:mb-3' src={image_assets.onboard_1} alt='' />
            </div>

            <div className='flex-1 text-center lg:text-start'>
              <p className='text-3xl font-semibold w-9/12 mx-auto lg:mx-0 mb-4'>Give WasteLess its Superpowers!</p>
              <p className='text-gray-800 w-10/12 mx-auto lg:mx-0'>
                We need camera access for smart Photo Entry (our AI identifies items!), plus Notifications for those
                life-saving Expiration Alerts!
              </p>
            </div>
          </div>

          <div className='h-20 w-full mb-12 lg:mb-0 flex items-center justify-between p-3'>
            <div className='flex gap-2'>
              <button onClick={() => setOnboardingSlide((prev) => prev - 1)} className='py-4 px-10 bg-gray-200 rounded-full'>Back</button>
              <button onClick={completeOnboarding} className='py-4 px-10 bg-gray-200 rounded-full'>Skip</button>
            </div>
            <button
              onClick={() => setOnboardingSlide((prev) => prev + 1)}
              className='bg-green-500 text-white py-4 px-10 rounded-full'>
              Next
            </button>
          </div>
        </div>
      )}

      {onboardingSlide === 5 && (
        <div className='slide-container flex flex-col justify-between items-center h-full lg:h-fit lg:w-9/12 mx-auto bg-white lg:rounded-3xl lg:p-8'>
          {indicator(4)}

          <div className='p-4 lg:flex lg:items-center lg:gap-6'>
            <div className='lg:flex-1'>
              <div className='bg-gray-100 h-[140px] w-[140px] mx-auto rounded-full overflow-hidden flex items-center justify-center'>
                {profilePicturePreview ? (
                  <img src={profilePicturePreview} alt='Profile' className='w-full h-full object-cover' />
                ) : (
                  <UserCircle className='text-gray-400 w-20 h-20' />
                )}
              </div>
              <input
                type='file'
                id='profilePicUpload'
                accept='image/*'
                onChange={handleProfilePictureChange}
                className='hidden'
              />
              <label htmlFor='profilePicUpload' className='text-green-500 my-3 text-center block cursor-pointer'>
                Change Profile Picture
              </label>

              <div className='text-start my-8'>
                <label className='mb-3 block'>Username</label>
                <div className='flex items-center gap-3 px-4 rounded-3xl h-12 border border-gray-300'>
                  <UserCircle className='text-gray-500' />
                  <input
                    type='text'
                    placeholder='Enter your hero tag'
                    className='flex-1 outline-0'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className='flex-1 text-center lg:text-start'>
              <p className='text-3xl font-semibold w-9/12 mx-auto lg:mx-0 mb-4'>Who is the Kitchen Hero?</p>
              <p className='text-gray-800 w-10/12 mx-auto lg:mx-0'>
                Every hero needs an awesome name! Give yourself a cool kitchen nickname, it's how you'll be celebrated
                on your dashboard and earn those achievements. (Adding a profile picture is optional).
              </p>
            </div>
          </div>

          <div className='h-20 w-full mb-12 lg:mb-0 flex items-center justify-between p-3'>
            <button onClick={() => setOnboardingSlide((prev) => prev - 1)} className='py-4 px-10 bg-gray-200 rounded-full'>
              Back
            </button>
            <button
              onClick={saveProfile}
              className='bg-green-500 text-white py-4 px-10 rounded-full w-full lg:w-fit'>
              Save Profile
            </button>
          </div>
        </div>
      )}

      {onboardingSlide === 6 && (
        <div className='slide-container flex flex-col justify-between items-center h-full lg:h-fit lg:w-9/12 mx-auto bg-white lg:rounded-3xl lg:p-8'>
          {indicator(5)}

          <div className='w-full p-4 lg:flex lg:items-center lg:gap-12 text-start'>
            <div className='flex-1'>
              <h2 className='text-lg font-semibold'>Default Location</h2>
              <p className='text-gray-500 text-sm mb-4'>Where Do You Keep Most Food?</p>

              <div className='space-y-4 mb-8'>
                {[
                  { key: 'fridge', label: 'Fridge' },
                  { key: 'pantry', label: 'Pantry' },
                  { key: 'freezer', label: 'Freezer' },
                ].map((item) => (
                  <div key={item.key} className='flex justify-between items-center py-2 border-b border-gray-100'>
                    <span className='text-gray-700'>{item.label}</span>
                    <Checkbox.Root
                      checked={locations[item.key]}
                      onCheckedChange={() => toggleLocation(item.key)}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${locations[item.key] ? 'bg-green-500 border-green-500' : 'border-gray-400'
                        }`}
                    >
                      <Checkbox.Indicator>
                        <Check className='text-white' />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                  </div>
                ))}

                <div className='flex justify-between items-center py-2 border-b border-gray-100'>
                  <span className='text-gray-700'>Let Me Name It</span>
                  <div className='w-7 h-7 border border-gray-400 rounded-full flex items-center justify-center'></div>
                </div>
              </div>
            </div>

            <div className='flex-1'>
              <h2 className='text-lg font-semibold'>Reminder Days</h2>
              <p className='text-gray-500 text-sm mb-4'>When Should We Sound the Alarm?</p>

              <div className='space-y-5 mb-10'>
                {[
                  { key: 'oneDay', title: '1 Day Before Expiry', desc: 'Get a reminder for items expiring tomorrow' },
                  { key: 'threeDays', title: '3 Days Before Expiry', desc: 'Get a reminder for items expiring soon' },
                  { key: 'onExpiry', title: 'On Expiry Date', desc: 'Get a final reminder on the day of expiry' },
                ].map((item) => (
                  <div key={item.key} className='flex items-center justify-between'>
                    <div>
                      <p className='font-medium text-gray-700'>{item.title}</p>
                      <p className='text-gray-500 text-sm'>{item.desc}</p>
                    </div>

                    <Switch.Root
                      checked={reminders[item.key]}
                      onCheckedChange={() => toggleReminder(item.key)}
                      className='w-11 h-6 rounded-full relative transition-colors bg-gray-300 data-[state=checked]:bg-green-500'
                    >
                      <Switch.Thumb className='block w-5 h-5 bg-white rounded-full shadow-sm transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]' />
                    </Switch.Root>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='h-20 w-full mb-12 lg:mb-0 flex items-center justify-between p-3'>
            <button onClick={() => setOnboardingSlide((prev) => prev - 1)} className='py-4 px-10 bg-gray-200 rounded-full'>
              Back
            </button>
            <button
              onClick={() => setOnboardingSlide((prev) => prev + 1)}
              className='bg-green-500 text-white py-4 px-10 rounded-full'>
              Continue
            </button>
          </div>
        </div>
      )}

      {onboardingSlide === 7 && (
        <div className='slide-container flex flex-col justify-between items-center h-full lg:h-fit lg:w-9/12 mx-auto bg-white lg:rounded-3xl lg:p-8'>
          {indicator(6)}

          <div className='p-4 md:flex md:items-center'>
            <div className='flex-1'>
              <img className='flex-1 mb-10 lg:mb-3' src={image_assets.onboard_1} alt='' />
            </div>

            <div className='flex-1 text-center lg:text-start'>
              <p className='text-3xl font-semibold w-9/12 mx-auto lg:mx-0 mb-4'>Add Your First Item</p>
              <p className='text-gray-800 w-10/12 mx-auto lg:mx-0'>
                Ready for some kitchen magic? Snap a pic of your groceries with smart Photo Entry or type them in to
                instantly populate your smart inventory.
              </p>
            </div>
          </div>

          <div className='h-20 w-full mb-12 lg:mb-0 flex items-center justify-between p-3'>
            <button onClick={() => setOnboardingSlide((prev) => prev - 1)} className='py-4 px-10 bg-gray-200 rounded-full'>
              Back
            </button>
            <button
              onClick={completeOnboarding}
              className='bg-green-500 text-white py-4 px-10 rounded-full w-full lg:w-fit'>
              Let's do this Thing
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Onboarding
