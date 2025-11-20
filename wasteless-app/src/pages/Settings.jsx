import React from "react";
import BottomNav from "../components/BottomNav";

export default function Settings() {
    return (
        <div className="min-h-screen bg-white pb-28">

            <header className="px-5 pt-6 pb-4 flex items-center gap-3">
                <img src="/assets/avatar.jpg" alt="avatar"
                    className="w-12 h-12 rounded-full object-cover" />

                <div>
                    <p className="font-semibold">Nkechi Okafor</p>
                    <p className="text-xs text-gray-400">nkechiokafor@email.com</p>
                </div>
            </header>

            <div className="px-5">

                {/* Menu */}
                <div className="space-y-6 mt-4">
                    <div className="flex justify-between">
                        <span>Edit Profile</span> <span>›</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Change Password</span> <span>›</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Notification Settings</span> <span>›</span>
                    </div>
                    <div className="flex justify-between">
                        <span>About</span> <span>›</span>
                    </div>
                </div>

                {/* Danger zone */}
                <div className="mt-10 space-y-6 text-red-600">
                    <div className="flex items-center gap-2">
                        <span>🚪</span> <span>Logout</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span>🗑</span> <span>Delete Account</span>
                    </div>
                </div>

            </div>

            <BottomNav />
        </div>
    );
}
