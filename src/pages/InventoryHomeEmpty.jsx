import React, { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import authService from "../services/authService";

// TODO: Add inventory empty illustration
// import emptyinventory from "../assets/illustrations/Inventory_Home-Empty.png"
const emptyinventory = null; // Using emoji placeholder until assets are added

export default function InventoryHomeEmpty() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = authService.getStoredUser();
        setUser(userData);
    }, []);

    return (
        <div className="min-h-screen bg-white pb-28 flex flex-col">

            {/* Header */}
            <header className="px-5 pt-6 pb-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-green-100 flex items-center justify-center">
                    {user?.profilePicture ? (
                        <img src={user.profilePicture} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-xl font-semibold text-green-600">
                            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                        </span>
                    )}
                </div>

                <div>
                    <p className="font-semibold">{user?.fullName || 'User'}</p>
                    <p className="text-xs text-gray-400">Ready to save the day,</p>
                </div>

                <div className="ml-auto text-gray-400">🔔</div>
            </header>

            {/* Illustration */}
            <div className="flex flex-col items-center mt-6 px-6">
                {emptyinventory ? (
                    <img src={emptyinventory} alt="Empty inventory" className="w-60" />
                ) : (
                    <div className="w-60 h-60 bg-gray-100 rounded-xl flex items-center justify-center">
                        <span className="text-6xl">📦</span>
                    </div>
                )}
                <h2 className="text-xl font-semibold mt-4 text-center">So… Much… Echo!</h2>
                <p className="text-center text-gray-500 text-sm mt-1">
                    It’s a little empty in here. Tap the + to fill your new inventory with groceries and kick waste to the curb!
                </p>
            </div>

            {/* Add Button */}
            <button
                className="fixed bottom-24 right-6 bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
                +
            </button>

            <BottomNav />
        </div>
    );
}
