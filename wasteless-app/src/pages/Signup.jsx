import React from "react";
import { Link } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import { FaGoogle, FaApple, FaFacebook, FaUser } from "react-icons/fa";


const Signup = () => {
    return (
        <div className="min-h-screen w-full flex flex-col bg-white">

            {/* HEADER */}
            <div className="bg-green-900 text-white px-6 pt-12 pb-10 rounded-b-3xl">
                <button className="text-white text-2xl mb-6">←</button>

                <h1 className="text-3xl font-semibold leading-snug">
                    Be a Climate Hero, <br /> from Your Kitchen.
                </h1>

                <p className="text-white/80 text-sm mt-2 w-64">
                    We’ll be the annoying friend who reminds you… in a nice way!
                </p>
            </div>

            {/* FORM */}
            <div className="px-6 mt-6">

                {/* Email */}
                <label className="text-sm font-medium">Email</label>
                <div className="flex items-center bg-white border rounded-full mt-1 mb-3 px-4 py-3">
                    <MdEmail className="text-gray-500 text-xl" />
                    <input
                        type="email"
                        placeholder="e.g., hero@email.com"
                        className="flex-1 ml-3 outline-none text-sm"
                    />
                </div>

                {/* First Name */}
                <label className="text-sm font-medium">First Name</label>
                <div className="flex items-center border rounded-full mt-1 mb-3 px-4 py-3">
                    <FaUser className="text-gray-500 text-xl" />
                    <input
                        type="text"
                        placeholder="e.g., Nkechi, John, etc."
                        className="flex-1 ml-3 outline-none text-sm"
                    />
                </div>

                {/* Last Name */}
                <label className="text-sm font-medium">Last Name</label>
                <div className="flex items-center border rounded-full mt-1 mb-3 px-4 py-3">
                    <FaUser className="text-gray-500 text-xl" />
                    <input
                        type="text"
                        placeholder="e.g., Nkechi, John, etc."
                        className="flex-1 ml-3 outline-none text-sm"
                    />
                </div>

                {/* Password */}
                <label className="text-sm font-medium">Password</label>
                <div className="flex items-center border rounded-full mt-1 px-4 py-3 relative">
                    <MdLock className="text-gray-500 text-xl" />
                    <input
                        type="password"
                        placeholder="Enter password"
                        className="flex-1 ml-3 outline-none text-sm"
                    />
                    <span className="text-xs absolute right-4 top-3">👁</span>
                </div>

                {/* Re-enter Password */}
                <label className="text-sm font-medium mt-3">Re-enter Password</label>
                <div className="flex items-center border rounded-full mt-1 px-4 py-3 relative">
                    <MdLock className="text-gray-500 text-xl" />
                    <input
                        type="password"
                        placeholder="Re-Enter password"
                        className="flex-1 ml-3 outline-none text-sm"
                    />
                    <span className="text-xs absolute right-4 top-3">👁</span>
                </div>

                {/* Password Rules */}
                <ul className="text-xs mt-3 space-y-1">
                    <li className="text-green-600">✔ At least one number</li>
                    <li className="text-green-600">✔ At least eight characters</li>
                    <li className="text-green-600">✔ At least one uppercase letter</li>
                    <li className="text-green-600">✔ At least one special character</li>
                </ul>

                {/* Create Account */}
                <button className="w-full bg-green-600 text-white rounded-full py-3 font-semibold mt-5">
                    Create account
                </button>

                <p className="text-center text-xs mt-3">
                    Already have an account?{" "}
                    <Link to="/" className="text-green-700 font-medium">
                        Log in
                    </Link>
                </p>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <span className="flex-1 h-px bg-gray-300"></span>
                    <span className="px-3 text-xs text-gray-500">Or signup using</span>
                    <span className="flex-1 h-px bg-gray-300"></span>
                </div>

                {/* Icons */}
                <div className="flex justify-center gap-6 mb-8">
                    <FaGoogle className="text-red-500 text-xl" />
                    <FaApple className="text-black text-xl" />
                    <FaFacebook className="text-blue-600 text-xl" />
                </div>
            </div>
        </div>
    );
};

export default Signup;
