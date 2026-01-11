import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import BottomNav from "../components/BottomNav";
import StatCard from "../components/StatCard";
import { useAuth } from "../context/AuthContext";
import { impactService } from "../services";
import ImpactEmpty from "./ImpactEmpty";

// Demo data for when user is not authenticated or backend is unavailable
const DEMO_IMPACT_DATA = {
    totalItems: 47,
    itemsEaten: 38,
    itemsWasted: 5,
    moneySaved: 12500,
    co2Saved: 8.2
};

export default function ImpactDashboard() {
    const { user } = useAuth();
    const [impactData, setImpactData] = useState({
        totalItems: 0,
        itemsEaten: 0,
        itemsWasted: 0,
        moneySaved: 0,
        co2Saved: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const [isDemo, setIsDemo] = useState(false);

    useEffect(() => {
        console.log('[ImpactDashboard] useEffect triggered, user:', user);
        if (user?.userId) {
            fetchImpactData();
        } else {
            console.log('[ImpactDashboard] No user or userId, showing demo data');
            setImpactData(DEMO_IMPACT_DATA);
            setIsDemo(true);
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, selectedPeriod]);

    const fetchImpactData = async () => {
        console.log('[ImpactDashboard] fetchImpactData started');
        setLoading(true);
        setError(null);
        setIsDemo(false);

        try {
            const data = await impactService.getSummary(user.userId, selectedPeriod);
            setImpactData({
                totalItems: data.totalItems || 0,
                itemsEaten: data.itemsEaten || data.itemsSaved || 0,
                itemsWasted: data.itemsWasted || 0,
                moneySaved: data.moneySaved || 0,
                co2Saved: data.co2Saved || 0
            });
        } catch (error) {
            console.error("[ImpactDashboard] Failed to fetch impact data:", error);
            if (!error.response || error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
                setImpactData(DEMO_IMPACT_DATA);
                setIsDemo(true);
                toast.info("Showing demo data - backend is starting up");
            } else if (error.response?.status === 401 || error.response?.status === 403) {
                setImpactData(DEMO_IMPACT_DATA);
                setIsDemo(true);
                toast.info("Please login for personalized data");
            } else {
                setError(error.response?.data?.message || "Failed to load impact data");
            }
        } finally {
            setLoading(false);
        }
    };

    const handlePeriodChange = (period) => {
        setSelectedPeriod(period);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-bg pb-28 p-4 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mb-4"></div>
                <p className="text-utility-text font-inter text-mobile-body">Loading impact data...</p>
            </div>
        );
    }

    if (error && !isDemo) {
        return (
            <div className="min-h-screen bg-surface-bg pb-28 p-4">
                <h1 className="font-poppins font-medium text-mobile-h1 mb-4 text-slate-500">Impact</h1>
                <div className="flex flex-col items-center justify-center mt-20 px-6">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-mobile-h2 font-poppins font-medium text-slate-500 mb-2">Connection Error</h2>
                    <p className="text-utility-text font-inter text-center text-mobile-body-sm mb-6">{error}</p>
                    <button
                        onClick={() => fetchImpactData()}
                        className="bg-brand-500 text-white px-6 py-2 rounded-wasteless hover:bg-brand-600 transition-all font-poppins font-medium shadow-sm hover:shadow-md"
                    >
                        Try Again
                    </button>
                </div>
                <BottomNav />
            </div>
        );
    }

    if (impactData.totalItems === 0 && !isDemo) {
        return <ImpactEmpty />;
    }

    return (
        <div className="min-h-screen bg-surface-bg pb-28 p-4">
            <h1 className="font-poppins font-medium text-mobile-h1 mb-4 text-slate-500">Impact</h1>

            {isDemo && (
                <div className="bg-amber-50 border border-amber-200 rounded-wasteless p-3 mb-4">
                    <p className="text-amber-800 text-mobile-body-sm font-inter">
                        <span className="font-semibold">Demo Mode:</span> Login to see your personal impact data
                    </p>
                </div>
            )}

            <div className="flex gap-2 mb-6 overflow-x-auto">
                <button
                    onClick={() => handlePeriodChange('week')}
                    className={`px-4 py-2 rounded-wasteless-sm whitespace-nowrap transition-all font-poppins font-medium text-mobile-caption ${
                        selectedPeriod === 'week'
                            ? 'bg-brand-500 text-white shadow-sm'
                            : 'bg-surface-accent text-utility-text hover:bg-utility-border'
                    }`}
                >
                    This Week
                </button>
                <button
                    onClick={() => handlePeriodChange('month')}
                    className={`px-4 py-2 rounded-wasteless-sm whitespace-nowrap transition-all font-poppins font-medium text-mobile-caption ${
                        selectedPeriod === 'month'
                            ? 'bg-brand-500 text-white shadow-sm'
                            : 'bg-surface-accent text-utility-text hover:bg-utility-border'
                    }`}
                >
                    This Month
                </button>
                <button
                    onClick={() => handlePeriodChange('year')}
                    className={`px-4 py-2 rounded-wasteless-sm whitespace-nowrap transition-all font-poppins font-medium text-mobile-caption ${
                        selectedPeriod === 'year'
                            ? 'bg-brand-500 text-white shadow-sm'
                            : 'bg-surface-accent text-utility-text hover:bg-utility-border'
                    }`}
                >
                    Yearly
                </button>
                <button
                    onClick={() => handlePeriodChange('all')}
                    className={`px-4 py-2 rounded-wasteless-sm whitespace-nowrap transition-all font-poppins font-medium text-mobile-caption ${
                        selectedPeriod === 'all'
                            ? 'bg-brand-500 text-white shadow-sm'
                            : 'bg-surface-accent text-utility-text hover:bg-utility-border'
                    }`}
                >
                    All Time
                </button>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                    <StatCard number={impactData.totalItems.toString()} label="Items Tracked" variant="default" />
                    <StatCard number={impactData.itemsEaten.toString()} label="Food Rescued!" variant="success" />
                    <StatCard number={impactData.itemsWasted.toString()} label="Items Spoiled" variant="warning" />
                </div>

                <div className="bg-gradient-to-br from-brand-700 to-brand-800 text-white p-5 rounded-wasteless shadow-wasteless-lg">
                    <p className="text-mobile-metric md:text-desktop-metric font-poppins font-bold">₦{impactData.moneySaved.toLocaleString()}</p>
                    <p className="text-mobile-body-sm font-inter mt-1 opacity-90">Money Saved</p>
                </div>

                <div className="bg-gradient-to-br from-impact-600 to-impact-700 text-white p-5 rounded-wasteless shadow-wasteless-lg">
                    <p className="text-mobile-metric md:text-desktop-metric font-poppins font-bold">{impactData.co2Saved.toFixed(1)} kg CO2</p>
                    <p className="text-mobile-body-sm font-inter mt-1 opacity-90">CO2 Impact Prevented</p>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
