import React from "react";
import { useNavigate } from "react-router-dom";
import { MdLock } from "react-icons/md";

const ResetPassword = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-white flex flex-col">

            {/* HEADER */}
            <div className="bg-green-900 text-white px-6 pt-12 pb-10 rounded-b-3xl">
                <button onClick={() => navigate(-1)} className="text-white text-2xl mb-6">←</button>

                <h1 className="text-3xl font-semibold">New Password Time.</h1>

                <p className="text-white/80 text-sm mt-2 w-64">
                    Help us protect your account.
                    Use the rules below to create a secure password!
                </p>
            </div>

            {/* FORM */}
            <div className="px-6 mt-8">

                {/* New Password */}
                <label className="text-sm font-medium">New Password</label>
                <div className="flex items-center border rounded-full mt-1 px-4 py-3 relative">
                    <MdLock className="text-gray-500 text-xl" />
                    <input
                        type="password"
                        placeholder="Enter password"
                        className="flex-1 ml-3 outline-none text-sm"
                    />
                    <span className="text-xs absolute right-4 top-3">👁</span>
                </div>

                {/* Confirm */}
                <label className="text-sm font-medium mt-3">Confirm New Password</label>
                <div className="flex items-center border rounded-full mt-1 px-4 py-3 relative">
                    <MdLock className="text-gray-500 text-xl" />
                    <input
                        type="password"
                        placeholder="Re-Enter password"
                        className="flex-1 ml-3 outline-none text-sm"
                    />
                    <span className="text-xs absolute right-4 top-3">👁</span>
                </div>

                {/* Rules */}
                <ul className="text-xs mt-4 space-y-1">
                    <li className="text-green-600">✔ At least one number</li>
                    <li className="text-green-600">✔ At least eight characters</li>
                    <li className="text-green-600">✔ At least one uppercase letter</li>
                    <li className="text-green-600">✔ At least one special character</li>
                </ul>

                <button className="w-full bg-green-600 text-white py-3 rounded-full font-semibold mt-6">
                    Set New Password
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
