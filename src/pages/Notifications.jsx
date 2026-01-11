import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BottomNav from "../components/BottomNav";
import { useAuth } from "../context/AuthContext";
import { expirationService } from "../services";

// Sample notifications for demo mode
const SAMPLE_NOTIFICATIONS = [
    {
        id: 1,
        type: 'expiration',
        title: 'Expiration Alert',
        message: 'Milk expiring in 2 day(s)',
        timestamp: new Date()
    },
    {
        id: 2,
        type: 'expiration',
        title: 'Expiration Alert',
        message: 'Bread expiring in 1 day(s)',
        timestamp: new Date()
    },
    {
        id: 3,
        type: 'expiration',
        title: 'Expiration Alert',
        message: 'Yogurt expiring in 3 day(s)',
        timestamp: new Date()
    },
    {
        id: 4,
        type: 'recipe',
        title: 'Recipe Suggestion',
        message: 'Try making French Toast with your expiring bread!',
        timestamp: new Date()
    },
    {
        id: 5,
        type: 'expiration',
        title: 'Expiration Alert',
        message: 'Eggs expiring in 5 day(s)',
        timestamp: new Date()
    }
];

export default function Notifications() {
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDemo, setIsDemo] = useState(false);

    useEffect(() => {
        console.log('[Notifications] useEffect triggered, user:', user, 'authLoading:', authLoading);

        // Wait for auth context to finish loading before deciding
        if (authLoading) {
            console.log('[Notifications] Auth still loading, waiting...');
            return;
        }

        // Check for userId or id (for compatibility with different response formats)
        const userId = user?.userId || user?.id;
        if (userId) {
            fetchNotifications();
        } else {
            console.log('[Notifications] No user or userId, showing demo notifications');
            setNotifications(SAMPLE_NOTIFICATIONS);
            setIsDemo(true);
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, authLoading]);

    const fetchNotifications = async () => {
        console.log('[Notifications] fetchNotifications started');
        setLoading(true);
        setError(null);
        setIsDemo(false);

        try {
            const userId = user?.userId || user?.id;
            const data = await expirationService.getUpcomingExpirations(userId);
            const expirationNotifications = data.map(item => ({
                id: item.id,
                type: 'expiration',
                title: 'Expiration Alert',
                message: `${item.name} expiring in ${calculateDaysLeft(item.expirationDate)} day(s)`,
                timestamp: new Date()
            }));
            setNotifications(expirationNotifications);
        } catch (error) {
            console.error("[Notifications] Failed to fetch notifications:", error);

            if (!error.response || error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
                setNotifications(SAMPLE_NOTIFICATIONS);
                setIsDemo(true);
                toast.info("Showing demo notifications - backend is starting up");
            } else if (error.response?.status === 401 || error.response?.status === 403) {
                setNotifications(SAMPLE_NOTIFICATIONS);
                setIsDemo(true);
                toast.info("Please login for personalized notifications");
            } else {
                setError(error.response?.data?.message || "Failed to load notifications");
            }
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

    if (loading || authLoading) {
        return (
            <div className="min-h-screen bg-white pb-28 px-5 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mb-4"></div>
                <p className="text-gray-500">Loading notifications...</p>
            </div>
        );
    }

    if (error && !isDemo) {
        return (
            <div className="min-h-screen bg-white pb-28 px-5">
                <header className="pt-6 pb-4 flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="text-2xl">←</button>
                    <h1 className="text-lg font-semibold">Notifications</h1>
                </header>
                <div className="flex flex-col items-center justify-center mt-20 px-6">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Connection Error</h2>
                    <p className="text-gray-500 text-center text-sm mb-6">{error}</p>
                    <button
                        onClick={() => fetchNotifications()}
                        className="bg-brand-500 text-white px-6 py-2 rounded-lg hover:bg-brand-600 transition-all font-medium shadow-sm hover:shadow-md"
                    >
                        Try Again
                    </button>
                </div>
                <BottomNav />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-28 px-5">
            <header className="pt-6 pb-4 flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="text-2xl">←</button>
                <h1 className="text-lg font-semibold">Notifications</h1>
            </header>

            {/* Demo Mode Banner */}
            {isDemo && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                    <p className="text-amber-800 text-sm">
                        <span className="font-semibold">Demo Mode:</span> Login to see your personal notifications
                    </p>
                </div>
            )}

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
