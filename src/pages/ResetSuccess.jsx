import React from "react";

const ResetSuccess = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">

            <img
                src="/assets/success-illustration.png"
                alt="Success"
                className="w-52 h-52 object-contain mb-6"
            />

            <h1 className="text-2xl font-semibold text-center">Woohoo! You’re Back Home</h1>

            <p className="text-gray-600 text-center text-sm w-64 mt-2">
                Your food items in the fridge missed you.
                You're logged in and ready for fun!
            </p>

            <button className="w-full bg-green-600 text-white py-3 rounded-full font-semibold mt-10">
                Let’s Go
            </button>
        </div>
    );
};

export default ResetSuccess;
