import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import * as Switch from "@radix-ui/react-switch";
import BottomNav from "../components/BottomNav";
import authService from "../services/authService";

export default function NotificationSettings() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [settings, setSettings] = useState({
        oneDayBefore: true,
        threeDaysBefore: true,
        onExpiry: false,
        emailNotifications: true,
        pushNotifications: true,
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const data = await authService.getSettings();
            if (data?.notificationSettings) {
                setSettings({
                    oneDayBefore: data.notificationSettings.oneDayBefore ?? true,
                    threeDaysBefore: data.notificationSettings.threeDaysBefore ?? true,
                    onExpiry: data.notificationSettings.onExpiry ?? false,
                    emailNotifications: data.notificationSettings.emailNotifications ?? true,
                    pushNotifications: data.notificationSettings.pushNotifications ?? true,
                });
            }
        } catch (error) {
            console.error("Failed to fetch settings:", error);
            // Use defaults from state
        } finally {
            setLoading(false);
        }
    };

    const toggleSetting = (key) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await authService.updateNotificationSettings(settings);
            toast.success("Notification settings saved!");
            navigate(-1);
        } catch (error) {
            console.error("Failed to save settings:", error);
            toast.error("Failed to save settings. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-bg flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-bg pb-28">
            <header className="px-5 pt-6 pb-4 flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2">
                    <ArrowLeft className="w-6 h-6 text-slate-600" />
                </button>
                <h1 className="text-xl font-poppins font-semibold text-slate-700">
                    Notification Settings
                </h1>
            </header>

            <div className="px-5">
                {/* Expiry Reminders Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-slate-700 mb-2">Expiry Reminders</h2>
                    <p className="text-sm text-gray-500 mb-4">When should we remind you about expiring items?</p>

                    <div className="space-y-4 bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-700">1 Day Before</p>
                                <p className="text-sm text-gray-500">Remind about items expiring tomorrow</p>
                            </div>
                            <Switch.Root
                                checked={settings.oneDayBefore}
                                onCheckedChange={() => toggleSetting('oneDayBefore')}
                                className="w-11 h-6 rounded-full relative transition-colors bg-gray-300 data-[state=checked]:bg-green-500"
                            >
                                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-sm transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                            </Switch.Root>
                        </div>

                        <div className="border-t border-gray-100"></div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-700">3 Days Before</p>
                                <p className="text-sm text-gray-500">Early warning for items expiring soon</p>
                            </div>
                            <Switch.Root
                                checked={settings.threeDaysBefore}
                                onCheckedChange={() => toggleSetting('threeDaysBefore')}
                                className="w-11 h-6 rounded-full relative transition-colors bg-gray-300 data-[state=checked]:bg-green-500"
                            >
                                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-sm transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                            </Switch.Root>
                        </div>

                        <div className="border-t border-gray-100"></div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-700">On Expiry Day</p>
                                <p className="text-sm text-gray-500">Final reminder on expiration date</p>
                            </div>
                            <Switch.Root
                                checked={settings.onExpiry}
                                onCheckedChange={() => toggleSetting('onExpiry')}
                                className="w-11 h-6 rounded-full relative transition-colors bg-gray-300 data-[state=checked]:bg-green-500"
                            >
                                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-sm transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                            </Switch.Root>
                        </div>
                    </div>
                </div>

                {/* Notification Channels Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-slate-700 mb-2">Notification Channels</h2>
                    <p className="text-sm text-gray-500 mb-4">How would you like to receive notifications?</p>

                    <div className="space-y-4 bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-700">Email Notifications</p>
                                <p className="text-sm text-gray-500">Receive reminders via email</p>
                            </div>
                            <Switch.Root
                                checked={settings.emailNotifications}
                                onCheckedChange={() => toggleSetting('emailNotifications')}
                                className="w-11 h-6 rounded-full relative transition-colors bg-gray-300 data-[state=checked]:bg-green-500"
                            >
                                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-sm transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                            </Switch.Root>
                        </div>

                        <div className="border-t border-gray-100"></div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-700">Push Notifications</p>
                                <p className="text-sm text-gray-500">Get alerts on your device</p>
                            </div>
                            <Switch.Root
                                checked={settings.pushNotifications}
                                onCheckedChange={() => toggleSetting('pushNotifications')}
                                className="w-11 h-6 rounded-full relative transition-colors bg-gray-300 data-[state=checked]:bg-green-500"
                            >
                                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-sm transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                            </Switch.Root>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-green-500 text-white py-4 rounded-full font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Settings"}
                </button>
            </div>

            <BottomNav />
        </div>
    );
}
