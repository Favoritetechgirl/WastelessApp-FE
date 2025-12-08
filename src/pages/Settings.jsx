import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BottomNav from "../components/BottomNav";
import authService from "../services/authService";

export default function Settings() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = authService.getStoredUser();
        setUser(userData);
    }, []);

    const handleLogout = async () => {
        try {
            await authService.logout();
            toast.success("Logged out successfully!");
            navigate("/");
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    return (
        <div className="min-h-screen bg-white pb-28">

            <header className="px-5 pt-6 pb-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-green-100 flex items-center justify-center">
                    {user?.profilePicture ? (
                        <img src={user.profilePicture} alt="avatar"
                            className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-xl font-semibold text-green-600">
                            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                        </span>
                    )}
                </div>

                <div>
                    <p className="font-semibold">{user?.fullName || 'User'}</p>
                    <p className="text-xs text-gray-400">{user?.email || 'email@example.com'}</p>
                </div>
            </header>

            <div className="px-5">

                {/* Menu */}
                <div className="space-y-6 mt-4">
                    <div className="flex justify-between cursor-pointer" onClick={() => navigate('/edit-profile')}>
                        <span>Edit Profile</span> <span>›</span>
                    </div>
                    <div className="flex justify-between cursor-pointer" onClick={() => navigate('/change-password')}>
                        <span>Change Password</span> <span>›</span>
                    </div>
                    <div className="flex justify-between cursor-pointer" onClick={() => navigate('/notification-settings')}>
                        <span>Notification Settings</span> <span>›</span>
                    </div>
                    <div className="flex justify-between cursor-pointer" onClick={() => navigate('/donations')}>
                        <span>Donation Centers</span> <span>›</span>
                    </div>
                    <div className="flex justify-between cursor-pointer">
                        <span>About</span> <span>›</span>
                    </div>
                </div>

                {/* Danger zone */}
                <div className="mt-10 space-y-6 text-red-600">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogout}>
                        <span>🚪</span> <span>Logout</span>
                    </div>

                    <div className="flex items-center gap-2 cursor-pointer">
                        <span>🗑</span> <span>Delete Account</span>
                    </div>
                </div>

            </div>

            <BottomNav />
        </div>
    );
}
