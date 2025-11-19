import React from "react";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";

const ForgotPassword = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">

            {/* HEADER */}
            <div className="bg-green-900 text-white px-6 pt-12 pb-10 rounded-b-3xl">
                <button className="text-white text-2xl mb-6">←</button>

                <h1 className="text-3xl font-semibold leading-snug">
                    Password Forgotten, <br /> Not Wasted!
                </h1>

                <p className="text-white/80 text-sm mt-2 w-64">
                    Just pop in your email address below, and we’ll send you a rescue link
                    to get you back on track.
                </p>
            </div>

            {/* FORM */}
            <div className="px-6 mt-8">

                {/* Email */}
                <label className="text-sm font-medium">Email</label>
                <div className="flex items-center bg-white border rounded-full mt-1 px-4 py-3 mb-5">
                    <MdEmail className="text-gray-500 text-xl" />
                    <input
                        type="email"
                        placeholder="e.g., hero@email.com"
                        className="flex-1 ml-3 outline-none text-sm"
                    />
                </div>

                {/* Button */}
                <button className="w-full bg-green-600 text-white py-3 rounded-full font-semibold">
                    Send Rescue Link
                </button>

                <p className="text-center text-xs mt-4">
                    <Link to="/" className="text-green-700 font-medium">Back to login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
