import React from "react";
import BottomNav from "../components/BottomNav";
// import Recipe from "./Recipe";

export default function RecipeSearch() {
    return (
        <div className="min-h-screen bg-white pb-28 px-5">
            <div className="pt-6 pb-4">
                <div className="relative">
                    <input className="w-full border rounded-full px-4 py-3" placeholder="Search recipes e.g., Ofada Rice" />
                    <button className="absolute right-3 top-3 text-gray-400">🔍</button>
                </div>
            </div>

            <div className="mt-4 space-y-3">
                {/* reuse Recipe list cards */}
                <div className="bg-white rounded-xl p-3 shadow-sm">
                    <h3 className="font-semibold">Ofada Rice (with Ayamase Stew)</h3>
                    <p className="text-xs text-gray-500">A tasty local favorite</p>
                </div>

                <div className="bg-white rounded-xl p-3 shadow-sm">
                    <h3 className="font-semibold">Ofada Rice and Coconut Milk Jollof</h3>
                    <p className="text-xs text-gray-500">A creamy twist</p>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
