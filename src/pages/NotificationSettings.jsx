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
        <div className="min-h-screen bg-surface-bg pb-28">

            <header className="px-5 pt-6 pb-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-brand-100 flex items-center justify-center">
                    {user?.profilePicture ? (
                        <img src={user.profilePicture} alt="avatar"
                            className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-xl font-poppins font-semibold text-brand-600">
                            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                        </span>
                    )}
                </div>

                <div>
                    <p className="font-poppins font-medium text-slate-500">{user?.fullName || 'User'}</p>
                    <p className="text-mobile-caption font-inter text-utility-text">{user?.email || 'email@example.com'}</p>
                </div>
            </header>

            <div className="px-5">

                {/* Menu */}
                <div className="space-y-6 mt-4">
                    <div className="flex justify-between cursor-pointer hover:text-brand-600 transition-colors" onClick={() => navigate('/edit-profile')}>
                        <span className="font-inter text-mobile-body text-slate-500">Edit Profile</span>
                        <span className="text-utility-text">›</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:text-brand-600 transition-colors" onClick={() => navigate('/change-password')}>
                        <span className="font-inter text-mobile-body text-slate-500">Change Password</span>
                        <span className="text-utility-text">›</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:text-brand-600 transition-colors" onClick={() => navigate('/notification-settings')}>
                        <span className="font-inter text-mobile-body text-slate-500">Notification Settings</span>
                        <span className="text-utility-text">›</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:text-brand-600 transition-colors" onClick={() => navigate('/donations')}>
                        <span className="font-inter text-mobile-body text-slate-500">Donation Centers</span>
                        <span className="text-utility-text">›</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:text-brand-600 transition-colors">
                        <span className="font-inter text-mobile-body text-slate-500">About</span>
                        <span className="text-utility-text">›</span>
                    </div>
                </div>

                {/* Danger zone */}
                <div className="mt-10 space-y-6">
                    <div className="flex items-center gap-2 cursor-pointer text-danger-600 hover:text-danger-700 transition-colors" onClick={handleLogout}>
                        <span>🚪</span> <span className="font-inter text-mobile-body">Logout</span>
                    </div>

                    <div className="flex items-center gap-2 cursor-pointer text-danger-600 hover:text-danger-700 transition-colors">
                        <span>🗑</span> <span className="font-inter text-mobile-body">Delete Account</span>
                    </div>
                </div>

            </div>

            <BottomNav />
        </div>
    );
}
