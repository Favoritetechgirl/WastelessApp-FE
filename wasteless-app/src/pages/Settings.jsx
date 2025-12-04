import React, { useState } from "react";
import BottomNav from "../components/BottomNav";
import image_assets from "../assets/images/images";
import { ArrowLeft, Delete, Eye, Key, Lock, LogOut, Mail, Trash, UserCircle, Check } from "lucide-react";
import PageTop from "../components/PageTop";
import MainButton from "../components/MainButton";

import * as Checkbox from '@radix-ui/react-checkbox'


export default function Settings() {


  const [crit, setCrit] = useState({
    one_num: false,
    eight_char: false,
    one_upper: false,
    one_speacial: false
  })

  const toggleCrit = (key) => {
    setCrit((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const checkPassword = (password) => {
    if (password.includes(Number)) {
      setCrit((prev) => ({ ...prev, one_num: true }))
    }

    if (password.includes('Caps')) {
      setCrit((prev) => ({ ...prev, one_upper: true }))
    }

    if (password.includes('specials')) {
      setCrit((prev) => ({ ...prev, one_speacial: true }))
    }

    if (password.length >= 8) {
      setCrit((prev) => ({ ...prev, eight_char: true }))
    }
  }

  const [view, setView] = useState('change-password')

  return (
    <div className="min-h-screen bg-white pb-28 p-2">
      {
        view == 'settings' ? (
          <>
            <header className="px-5 pt-6 pb-4 flex items-center gap-3">
              <img src={image_assets.dp} alt="avatar"
                className="w-12 h-12 rounded-full object-cover" />

              <div>
                <p className="font-semibold">Nkechi Okafor</p>
                <p className="text-xs text-gray-400">nkechiokafor@email.com</p>
              </div>
            </header>

            <div className="px-5">

              {/* Menu */}
              <div className="space-y-6 mt-4">
                <div className="flex justify-between">
                  <span>Edit Profile</span> <span>›</span>
                </div>
                <div className="flex justify-between">
                  <span>Change Password</span> <span>›</span>
                </div>
                <div className="flex justify-between">
                  <span>Notification Settings</span> <span>›</span>
                </div>
                <div className="flex justify-between">
                  <span>About</span> <span>›</span>
                </div>
              </div>

              {/* Danger zone */}
              <div className="mt-10 space-y-6 text-red-600">
                <div className="flex items-center gap-2">
                  <LogOut size={20} /> <span>Logout</span>
                </div>

                <div className="flex items-center gap-2">
                  <Trash size={20} /> <span>Delete Account</span>
                </div>
              </div>

            </div>
          </>
        ) : view == 'edit-profile' ? (
          <>
            <PageTop left={<ArrowLeft />} title={'Edit Profile'} right="" />

            <div className="p-3">

              <img src={image_assets.dp} className="w-36 h-36 rounded-full object-cover mx-auto" alt="" />
              <input type="file" hidden />
              <p className="text-green-500 text-sm my-3 text-center">Change Profile Picture</p>


              <div>

                <div className='text-start my-8'>
                  <label className='mb-3 block'>Email</label>
                  <div className='flex items-center gap-3 px-4 rounded-3xl h-12 border border-gray-300'>
                    <Mail className='text-gray-500' />
                    <input type='text' placeholder='existingemail@gmail.com' className='flex-1 outline-0' />
                  </div>
                </div>

                <div className='text-start my-8'>
                  <label className='mb-3 block'>First Name</label>
                  <div className='flex items-center gap-3 px-4 rounded-3xl h-12 border border-gray-300'>
                    <UserCircle className='text-gray-500' />
                    <input type='text' placeholder='Philips' className='flex-1 outline-0' />
                  </div>
                </div>

                <div className='text-start my-8'>
                  <label className='mb-3 block'>Last Name</label>
                  <div className='flex items-center gap-3 px-4 rounded-3xl h-12 border border-gray-300'>
                    <UserCircle className='text-gray-500' />
                    <input type='text' placeholder='Edun' className='flex-1 outline-0' />
                  </div>
                </div>

                <div className='text-start my-8'>
                  <label className='mb-3 block'>Username</label>
                  <div className='flex items-center gap-3 px-4 rounded-3xl h-12 border border-gray-300'>
                    <UserCircle className='text-gray-500' />
                    <input type='text' placeholder='existingemail@gmail.com' className='flex-1 outline-0' />
                  </div>
                </div>

                <div className='text-start my-8'>
                  <label className='mb-3 block'>Enter current password to save changes</label>
                  <div className='flex items-center gap-3 px-4 rounded-3xl h-12 border border-gray-300'>
                    <UserCircle className='text-gray-500' />
                    <input type='text' placeholder='existingemail@gmail.com' className='flex-1 outline-0' />
                  </div>
                </div>


                <MainButton text="Update Profile" />


              </div>
            </div>
          </>
        ) : view == 'change-password' ? (
          <>
            <PageTop left={<ArrowLeft />} title={'Change Password'} />

            <div className="p-3">
              <p className="text-3xl font-semibold mb-4">Update Your Defense Credentials</p>

              <p className="text-gray-600">The best heroes always update their access.Use a strong key to keep the inventory safe.</p>


              <div>

                <div className='text-start my-8'>
                  <label className='mb-3 block'>Enter Your current password</label>
                  <div className='flex items-center gap-3 px-4 rounded-3xl h-12 border border-gray-300'>
                    <Lock className='text-gray-500' />
                    <input type='text' placeholder='Enter password' className='flex-1 outline-0' />
                    <Eye />
                  </div>
                </div>

                <div className='text-start my-8'>
                  <label className='mb-3 block'>Enter New password</label>
                  <div className='flex items-center gap-3 px-4 rounded-3xl h-12 border border-gray-300'>
                    <Lock className='text-gray-500' />
                    <input type='text' placeholder='Enter password' className='flex-1 outline-0' />
                    <Eye />
                  </div>
                </div>

                <div className='text-start my-8'>
                  <label className='mb-3 block'>Re-Eeter New password</label>
                  <div className='flex items-center gap-3 px-4 rounded-3xl h-12 border border-gray-300'>
                    <Lock className='text-gray-500' />
                    <input type='text' placeholder='Enter password' className='flex-1 outline-0' />
                    <Eye />
                  </div>
                </div>

                <div className="text-gray-500 text-sm">
                  <p>Password Recipe</p>

                  <div>
                    {
                      [
                        { key: 'one_num', label: 'At least one number' },
                        { key: 'eight_char', label: ' At least eight characters' },
                        { key: 'one_upper', label: 'At least one uppercase letter' },
                        { key: 'one_special', label: 'At least one special character' }
                      ].map((item) => (
                        <>
                          <div key={item.key} className='flex gap-2 justify-start items-center py-2 border-b border-gray-100'>

                            <Checkbox.Root
                              checked={crit[item.key]}
                              onCheckedChange={() => toggleCrit(item.key)}
                              className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${crit[item.key] ? 'bg-green-500 border-green-500' : 'border-gray-400'
                                }`}
                            >
                              <Checkbox.Indicator>
                                <Check className='text-white' />
                              </Checkbox.Indicator>
                            </Checkbox.Root>
                            <span className='text-gray-700'>{item.label}</span>
                          </div>
                        </>
                      ))
                    }

                  </div>

                  <MainButton className={'my-8'} text="Change Password" />


                </div>


              </div>
            </div>
          </>
        ) : ''

      }


      <BottomNav />
    </div>
  );
}
