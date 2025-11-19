import React from "react";
import BottomNav from "../components/BottomNav";
import StatCard from "../components/StatCard";

export default function ImpactDashboard() {
    return (
        <div className="min-h-screen bg-white pb-28 p-4">
            <h1 className="font-semibold text-xl mb-4">Impact</h1>

            <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <StatCard number="80" label="Items Logged" />
                    <StatCard number="16" label="Rescued" />
                    <StatCard number="12" label="Wasted" />
                </div>

                {/* Green Card */}
                <div className="bg-green-800 text-white p-5 rounded-xl">
                    <p className="text-2xl font-bold">₦70,000</p>
                    <p className="text-sm mt-1">Saved from wastage</p>
                </div>

                {/* Blue Card */}
                <div className="bg-blue-800 text-white p-5 rounded-xl">
                    <p className="text-2xl font-bold">85 lbs</p>
                    <p className="text-sm mt-1">Environmental Impact</p>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
