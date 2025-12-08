import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function NotificationSettings() {
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        expirationAlerts: true,
        recipeReminders: true,
        impactUpdates: false,
        pushNotifications: true,
        emailNotifications: false,
    });

    const handleToggle = (setting) => {
        setSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
        toast.success("Notification preferences updated");
    };

    return (
        <div className="min-h-screen bg-white pb-8">
            {/* Header */}
            <header className="px-5 pt-6 pb-4 flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="text-2xl">←</button>
                <h1 className="text-xl font-semibold">Notification Settings</h1>
            </header>

            <div className="px-5 mt-6">
                <p className="text-sm text-gray-600 mb-6">
                    Manage how you receive notifications from WasteLess
                </p>

                {/* Notification Types */}
                <div className="space-y-5">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <p className="font-medium">Expiration Alerts</p>
                            <p className="text-xs text-gray-500 mt-1">Get notified about items nearing expiry</p>
                        </div>
                        <label className="relative inline-block w-12 h-6">
                            <input
                                type="checkbox"
                                checked={settings.expirationAlerts}
                                onChange={() => handleToggle('expirationAlerts')}
                                className="sr-only peer"
                            />
                            <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-green-600 transition-colors cursor-pointer"></div>
                            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <p className="font-medium">Recipe Reminders</p>
                            <p className="text-xs text-gray-500 mt-1">Suggestions based on your inventory</p>
                        </div>
                        <label className="relative inline-block w-12 h-6">
                            <input
                                type="checkbox"
                                checked={settings.recipeReminders}
                                onChange={() => handleToggle('recipeReminders')}
                                className="sr-only peer"
                            />
                            <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-green-600 transition-colors cursor-pointer"></div>
                            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <p className="font-medium">Impact Updates</p>
                            <p className="text-xs text-gray-500 mt-1">Weekly summary of your food waste impact</p>
                        </div>
                        <label className="relative inline-block w-12 h-6">
                            <input
                                type="checkbox"
                                checked={settings.impactUpdates}
                                onChange={() => handleToggle('impactUpdates')}
                                className="sr-only peer"
                            />
                            <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-green-600 transition-colors cursor-pointer"></div>
                            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                        </label>
                    </div>

                    <div className="mt-8">
                        <h2 className="font-semibold mb-4">Notification Channels</h2>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-xs text-gray-500 mt-1">Receive notifications on this device</p>
                        </div>
                        <label className="relative inline-block w-12 h-6">
                            <input
                                type="checkbox"
                                checked={settings.pushNotifications}
                                onChange={() => handleToggle('pushNotifications')}
                                className="sr-only peer"
                            />
                            <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-green-600 transition-colors cursor-pointer"></div>
                            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-xs text-gray-500 mt-1">Receive updates via email</p>
                        </div>
                        <label className="relative inline-block w-12 h-6">
                            <input
                                type="checkbox"
                                checked={settings.emailNotifications}
                                onChange={() => handleToggle('emailNotifications')}
                                className="sr-only peer"
                            />
                            <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-green-600 transition-colors cursor-pointer"></div>
                            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
