import React from "react";
import BottomNav from "../components/BottomNav";
import emptyinventory from "../assets/illustrations/Inventory_Home-Empty.png"

export default function InventoryHomeEmpty() {
    return (
        <div className="min-h-screen bg-white pb-28 flex flex-col">

            {/* Header */}
            <header className="px-5 pt-6 pb-4 flex items-center gap-3">
                <img src="/assets/avatar.jpg" alt="avatar"
                    className="w-12 h-12 rounded-full object-cover" />

                <div>
                    <p className="font-semibold">Nkechi Okafor</p>
                    <p className="text-xs text-gray-400">Ready to save the day,</p>
                </div>

                <div className="ml-auto text-gray-400">🔔</div>
            </header>

            {/* Illustration */}
            <div className="flex flex-col items-center mt-6 px-6">
                <img src={emptyinventory} className="w-60" />
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
