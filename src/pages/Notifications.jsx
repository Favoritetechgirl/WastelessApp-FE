import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BottomNav from "../components/BottomNav";
import { useAuth } from "../context/AuthContext";
import { expirationService } from "../services";

export default function Notifications() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.userId) {
            fetchNotifications();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const data = await expirationService.getUpcomingExpirations(user.userId);
            // Transform expiration data into notifications
            const expirationNotifications = data.map(item => ({
                id: item.id,
                type: 'expiration',
                title: 'Expiration Alert',
                message: `${item.name} expiring in ${calculateDaysLeft(item.expirationDate)} day(s)`,
                timestamp: new Date()
            }));
            setNotifications(expirationNotifications);
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
            toast.error("Failed to load notifications");
        } finally {
            setLoading(false);
        }
    };

    const calculateDaysLeft = (expirationDate) => {
        const today = new Date();
        const expDate = new Date(expirationDate);
        const diffTime = expDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'expiration':
                return '⏰';
            case 'recipe':
                return '🍳';
            default:
                return '📢';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white pb-28 px-5 flex items-center justify-center">
                <p className="text-gray-500">Loading notifications...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-28 px-5">
            <header className="pt-6 pb-4 flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="text-2xl">←</button>
                <h1 className="text-lg font-semibold">Notifications</h1>
            </header>

            {notifications.length > 0 ? (
                <div className="space-y-3">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                                <div className="flex-1">
                                    <p className="font-semibold">{notification.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500">No notifications yet</p>
                    <p className="text-sm text-gray-400 mt-2">
                        You'll see alerts here when items are about to expire
                    </p>
                </div>
            )}

            <BottomNav />
        </div>
    );
}
