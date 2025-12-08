import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

// TODO: Add impact empty illustration
// import impactempty from "../assets/illustrations/Impact_Dashboard-Empty.png"
const impactempty = null; // Using emoji placeholder until assets are added

export default function ImpactEmpty() {
    const navigate = useNavigate();
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    return (
        <div className="min-h-screen bg-white pb-28">

            <header className="px-5 py-6 text-center font-semibold">Impact</header>

            {/* Tabs */}
            <div className="flex justify-center gap-2 px-4 mb-4">
                <button
                    onClick={() => setSelectedPeriod('week')}
                    className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                        selectedPeriod === 'week'
                            ? 'bg-green-600 text-white font-medium'
                            : 'text-gray-400'
                    }`}
                >
                    This Week
                </button>
                <button
                    onClick={() => setSelectedPeriod('month')}
                    className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                        selectedPeriod === 'month'
                            ? 'bg-green-600 text-white font-medium'
                            : 'text-gray-400'
                    }`}
                >
                    This Month
                </button>
                <button
                    onClick={() => setSelectedPeriod('year')}
                    className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                        selectedPeriod === 'year'
                            ? 'bg-green-600 text-white font-medium'
                            : 'text-gray-400'
                    }`}
                >
                    Yearly
                </button>
                <button
                    onClick={() => setSelectedPeriod('all')}
                    className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                        selectedPeriod === 'all'
                            ? 'bg-green-600 text-white font-medium'
                            : 'text-gray-400'
                    }`}
                >
                    All Time
                </button>
            </div>

            <div className="mt-14 flex flex-col items-center px-6">
                {impactempty ? (
                    <img src={impactempty} alt="Empty impact dashboard" className="w-72" />
                ) : (
                    <div className="w-72 h-72 bg-gray-100 rounded-xl flex items-center justify-center">
                        <span className="text-6xl">📊</span>
                    </div>
                )}

                <h2 className="text-lg font-semibold mt-4">The Scorekeeper is Waiting!</h2>

                <p className="text-center text-gray-500 text-sm mt-2">
                    Our goal is to celebrate your wins, but we need data!
                    Add items to your inventory to give the Scorekeeper something to track.
                </p>

                <button
                    onClick={() => navigate('/inventory')}
                    className="mt-6 bg-green-600 text-white px-8 py-3 rounded-full"
                >
                    Go to Inventory
                </button>
            </div>

            <BottomNav />
        </div>
    );
}
