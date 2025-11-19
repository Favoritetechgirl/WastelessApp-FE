import React from "react";
import BottomNav from "../components/BottomNav";

export default function Notifications() {
    return (
        <div className="min-h-screen bg-white pb-28 px-5">
            <header className="pt-6 pb-4">
                <h1 className="text-lg font-semibold">Notifications</h1>
            </header>

            <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="font-semibold">Expiration Alert</p>
                    <p className="text-xs text-gray-500 mt-1">Item expiring soon: Eggs in 1 day</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="font-semibold">Recipe Idea: Time!</p>
                    <p className="text-xs text-gray-500 mt-1">Try this recipe using your open items</p>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
