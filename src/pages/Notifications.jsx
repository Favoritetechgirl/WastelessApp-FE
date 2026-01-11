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
    const [loadingMessage, setLoadingMessage] = useState('Loading notifications...');
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('[Notifications] useEffect triggered, user:', user);
        if (user?.userId) {
            fetchNotifications();
        } else {
            console.log('[Notifications] No user or userId, stopping loading');
            setLoading(false);
            setError('User not authenticated');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const fetchNotifications = async () => {
        console.log('[Notifications] fetchNotifications started');
        setLoading(true);
        setLoadingMessage('Loading notifications...');
        setError(null);

        // Show extended wait message after 5 seconds
        const waitTimer = setTimeout(() => {
            setLoadingMessage('Server is waking up, please wait...');
        }, 5000);

        // Show longer wait message after 15 seconds
        const longWaitTimer = setTimeout(() => {
            setLoadingMessage('Still connecting... This may take up to a minute on first load.');
        }, 15000);

        try {
            console.log('[Notifications] Calling expirationService.getUpcomingExpirations with userId:', user.userId);
            const data = await expirationService.getUpcomingExpirations(user.userId);
            console.log('[Notifications] Data received:', data);

            clearTimeout(waitTimer);
            clearTimeout(longWaitTimer);

            // Transform expiration data into notifications
            const expirationNotifications = data.map(item => ({
                id: item.id,
                type: 'expiration',
                title: 'Expiration Alert',
                message: `${item.name} expiring in ${calculateDaysLeft(item.expirationDate || item.expiryDate)} day(s)`,
                timestamp: new Date()
            }));
            setNotifications(expirationNotifications);
            console.log('[Notifications] Notifications set successfully:', expirationNotifications.length, 'items');
        } catch (error) {
            clearTimeout(waitTimer);
            clearTimeout(longWaitTimer);
            console.error("[Notifications] Failed to fetch notifications:", error);

            // Better error handling
            if (!error.response || error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
                const errorMsg = "Cannot connect to server. The backend may still be starting up. Please try again.";
                setError(errorMsg);
                toast.error("Connection failed - try again");
                console.error('[Notifications]', errorMsg);
            } else if (error.response?.status === 401 || error.response?.status === 403) {
                const errorMsg = "Authentication failed. Please login again.";
                setError(errorMsg);
                toast.error("Authentication error");
                console.error('[Notifications]', errorMsg);
            } else {
                const errorMsg = error.response?.data?.message || "Failed to load notifications";
                setError(errorMsg);
                toast.error(errorMsg);
                console.error('[Notifications]', errorMsg);
            }
        } finally {
            console.log('[Notifications] Setting loading to false');
            setLoading(false);
            setLoadingMessage('');
        }
    };

    const calculateDaysLeft = (expirationDate) => {
        if (!expirationDate) return 0;
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
            <div className="min-h-screen bg-white pb-28 px-5 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500 mb-4"></div>
                <p className="text-gray-500 animate-pulse">{loadingMessage}</p>
            </div>
        );
    }

    // Show error state if there's an error
    if (error) {
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
                        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all font-medium shadow-sm hover:shadow-md"
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
