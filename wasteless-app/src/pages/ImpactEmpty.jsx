import React from "react";
import BottomNav from "../components/BottomNav";
import impactempty from "../assets/illustrations/Impact_Dashboard-Empty.png"

export default function ImpactEmpty() {
    return (
        <div className="min-h-screen bg-white pb-28">

            <header className="px-5 py-6 text-center font-semibold">Impact</header>

            {/* Tabs */}
            <div className="flex justify-center gap-6 text-sm text-gray-400">
                <span>This Week</span>
                <span className="font-semibold text-green-700">This Month</span>
                <span>Yearly</span>
                <span>All Time</span>
            </div>

            <div className="mt-14 flex flex-col items-center px-6">
                <img src={impactempty} className="w-72" />

                <h2 className="text-lg font-semibold mt-4">The Scorekeeper is Waiting!</h2>

                <p className="text-center text-gray-500 text-sm mt-2">
                    Our goal is to celebrate your wins, but we need data!
                    Add items to your inventory to give the Scorekeeper something to track.
                </p>

                <button className="mt-6 bg-green-600 text-white px-8 py-3 rounded-full">
                    Go to Inventory
                </button>
            </div>

            <BottomNav />
        </div>
    );
}
