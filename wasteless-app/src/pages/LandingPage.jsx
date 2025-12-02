import React, { useState } from 'react'
import image_assets from '../assets/images/images'
import { Bookmark, Menu, X } from 'lucide-react'
import { Boxes, Utensils, AlarmClock, BarChart3 } from "lucide-react";
import { Camera, Soup, AlertTriangle, ChefHat } from "lucide-react";


import '../css/landing-page.css'

const LandingPage = () => {

  const [activeNav, setActiveNav] = useState(false)


  const featuresData = [
    {
      icon: Boxes,
      title: "Smart Inventory Management",
      desc: "Track items that are in your kitchen with ease."
    },
    {
      icon: Utensils,
      title: "Recipe Suggestions",
      desc: "Cook with what you already have."
    },
    {
      icon: AlarmClock,
      title: "Expiry Reminders",
      desc: "Get alerts before food goes bad."
    },
    {
      icon: BarChart3,
      title: "Insights Dashboard",
      desc: "See your impact on food waste."
    }
  ];


  const howItWorksData = [
    {
      icon: Camera,
      title: "Snap Item"
    },
    {
      icon: Soup,
      title: "Get Recipe Suggestion"
    },
    {
      icon: AlertTriangle,
      title: "Get expiry alerts"
    },
    {
      icon: ChefHat,
      title: "Cook & Save"
    }
  ];



  return (
    <div className='max-w-[1400px] mx-auto bg-green-100'>
      {/* NAVBAR */}
      <div className='font-semibold bg-white'>
        <div className='nav h-24 border-2 border-green-700 flex justify-between items-center p-3'>
          <div>
            <img src={image_assets.Logo} alt="" />
          </div>

          <div className='hidden lg:flex items-center gap-5'>
            <a href="">Features</a>
            <a href="">How It Works</a>
            <a href="">Impact</a>
          </div>

          <div className='hidden lg:flex gap-4'>
            <button className='bg-green-500 text-white p-3 px-8 border-2 border-green-500 rounded-md hover:bg-transparent hover:text-green-500 transition'>Sign Up</button>

            <button className='p-3 px-10 border-2 border-green-500 rounded-md transition hover:bg-green-500 hover:text-white'>Login</button>
          </div>

          <div className='lg:hidden'>
            <button onClick={() => setActiveNav((prev) => !prev)}>
              {
                activeNav ? <X /> : <Menu />
              }
            </button>
          </div>
        </div>

        {/* SIDEBAR */}
        {
          activeNav ? (
            <>
              <div className='bg-white p-4 border-4 w-fit min-w-72 text-right fixed z-10 top-24 right-0'>
                <a href="" className='border-b-4 border-b-gray-300 block mb-4 py-2'>Features</a>
                <a href="" className='border-b-4 border-b-gray-300 block mb-4 py-2'>How it works</a>
                <a href="" className='border-b-4 border-b-gray-300 block py-2'>Impact</a>
              </div>
            </>
          ) : ''
        }

      </div>



      {/* HERO SECTION */}

      <div className='hero h-[450px] border-4 text-white flex items-center justify-center'>
        <div>
          <p className='text-center text-3xl font-bold mb-4'>Save Food, Save Money. <br />Save the Planet.</p>

          <p className='text-center w-9/12 mx-auto mb-5'>Wasteless helps you track whats is in your inventory, prepare recipes, reminds you beofre food expires, and reduces waste effortlessly.</p>

          <div className='flex gap-4 text-white justify-center'>
            <button className='bg-green-500 text-white p-3 px-8 border-2 border-green-500 rounded-md hover:bg-transparent transition'>Get Started</button>

            <button className='p-3 px-10 border-2 border-green-500 rounded-md f'>Login</button>
          </div>
        </div>
      </div>



      {/* EVERYTHING YOU NEED */}
      <div className='p-8 mb-10'>
        <p className='text-3xl font-semibold w-9/12 mx-auto mb-2 text-center'>Everything you need to stop food waste</p>
        <p className='block text-center mx-auto mb-12 w-9/12'>Everything you need to stop food waste</p>


        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-cols-[repeat(auto-fit, minmax(200px, 1fr))] gap-5 text-center mx-auto'>

          {
            featuresData.map((feature, id) => (
              <>
                <div key={id} className='text-center bg-gray-50 p-5 rounded-lg max-w-64 mx-auto'>
                  <feature.icon size={35} className='mb-3 mx-auto text-green-500' />
                  <p className='text-center mb-3 text-xl font-semibold'>{feature.title}</p>
                  <p className='text-gray-500'>Track items that are in your kitchen with ease.</p>
                </div>
              </>
            ))
          }

        </div>

      </div>

      {/* How it works */}
      <div className='mb-8'>

        <div className='mb-8'>
          <p className='text-3xl font-semibold w-9/12 mx-auto mb-2 text-center'>How It Works</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-cols-[repeat(auto-fit, minmax(200px, 1fr))] gap-5 text-center mx-auto'>
          {
            howItWorksData.map((how, index) => (
              <>
                <div className='mb-8'>
                  <how.icon size={55} className='mb-3 mx-auto text-white bg-green-500 rounded-full p-2' />
                  <p className='text-lg font-semibold'>{how.title}</p>
                </div>
              </>
            ))
          }
        </div>
      </div>


      {/* NUMBERS */}

      <div className='grid grid-cols-1 lg:grid-cols-3 grid-cols-[repeat(auto-fit, minmax(250px, 1fr))] gap-5 text-center mx-auto w-10/12 mb-16'>

        <div className='text-center'>
          <p className='text-green-500 text-3xl font-bold mb-2'>1.2M+</p>
          <p className='font-bold'>Tons of Food Saved</p>
          <span className='text-sm text-gray-700'>by the Wasteless community globally</span>
        </div>
        <div className='text-center'>
          <p className='text-green-500 text-3xl font-bold mb-2'>$540</p>
          <p className='font-bold'>Average User Savings</p>
          <span className='text-sm text-gray-700'>per household per year</span>
        </div>
        <div className='text-center'>
          <p className='text-green-500 text-3xl font-bold mb-2'>500k+</p>
          <p className='font-bold'>Happy Users</p>
          <span className='text-sm text-gray-700'>making a difference everyday</span>
        </div>

      </div>

      {/* Reviews */}

      <div className=' mb-24'>
        <p className='text-3xl font-semibold w-9/12 mx-auto mb-2 text-center'>Loved by our Users</p>
        <p className='block text-center mx-auto mb-12 w-9/12'>Everything you need to stop food waste</p>


        <div className='grid grid-cols-1 lg:grid-cols-3 grid-cols-[repeat(auto-fit, minmax(30px, 1fr))] gap-5 text-center mx-auto px-5'>

          <div className='one-review border-2 border-gray-400 bg-white text-left p-3 rounded-md'>
            <p className='mb-4 text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ullam sunt perferendis maxime minima dolorem impedit.</p>

            <div className='flex gap-3 items-center'>
              <img className='w-14 h-14 rounded-full object-cover' src={image_assets.dp} alt="" />
              <div>
                <p className='font-bold'>Edun Philips</p>
                <span className='text-gray-700 text-sm'>Parent</span>
              </div>
            </div>
          </div>


          <div className='one-review border-2 border-gray-400 bg-white text-left p-3 rounded-md'>
            <p className='mb-4 text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ullam sunt perferendis maxime minima dolorem impedit.</p>

            <div className='flex gap-3 items-center'>
              <img className='w-14 h-14 rounded-full object-cover' src={image_assets.dp} alt="" />
              <div>
                <p className='font-bold'>Edun Philips</p>
                <span className='text-gray-700 text-sm'>Parent</span>
              </div>
            </div>
          </div>


          <div className='one-review border-2 border-gray-400 bg-white text-left p-3 rounded-md'>
            <p className='mb-4 text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ullam sunt perferendis maxime minima dolorem impedit.</p>

            <div className='flex gap-3 items-center'>
              <img className='w-14 h-14 rounded-full object-cover' src={image_assets.dp} alt="" />
              <div>
                <p className='font-bold'>Edun Philips</p>
                <span className='text-gray-700 text-sm'>Parent</span>
              </div>
            </div>
          </div>



        </div>
      </div>


      {/* CALL TO ACTION */}

      <div className='bg-white p-14 text-center w-11/12 mx-auto rounded-lg'>

        <p className='text-3xl font-semibold mb-4'>Join the Movement. Start Saving Today</p>

        <p className='text-gray-600 mx-auto lg:w-6/12 mb-4'>No more guesswork! We send smart alerts that remind you when items are running out of shelf life.</p>

        <button className='p-5 text-white rounded-lg bg-green-500'>Begin Rescue Mission</button>
      </div>



      {/* FOOTER */}

      <div className="bg-gradient-to-r from-[#0b5a20] via-[#0fa74d] to-[#11c65f] h-96">

      </div>

    </div>
  )
}

export default LandingPage