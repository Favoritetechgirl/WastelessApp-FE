import React from "react";

const CheckEmail = () => {
    return (
        <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center px-6">

            <h1 className="text-xl font-semibold text-center">Check Your Email</h1>

            <p className="text-gray-600 text-sm text-center mt-3 w-64">
                We’ve emailed you a fresh password reset link.
                Check your inbox to continue.
            </p>

            <button className="w-full bg-green-600 text-white py-3 rounded-full font-semibold mt-10">
                Back to Login
            </button>
        </div>
    );
};

export default CheckEmail;
