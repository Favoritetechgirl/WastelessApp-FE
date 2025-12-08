import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import BottomNav from "../components/BottomNav";
import StatCard from "../components/StatCard";
import { useAuth } from "../context/AuthContext";
import { impactService } from "../services";
import ImpactEmpty from "./ImpactEmpty";

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
    const [selectedPeriod, setSelectedPeriod] = useState('month'); // week, month, year, all

    useEffect(() => {
        if (user?.userId) {
            fetchImpactData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, selectedPeriod]);

    const fetchImpactData = async () => {
        setLoading(true);
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
            console.error("Failed to fetch impact data:", error);
            toast.error("Failed to load impact data");
        } finally {
            setLoading(false);
        }
    };

    const handlePeriodChange = (period) => {
        setSelectedPeriod(period);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white pb-28 p-4 flex items-center justify-center">
                <p className="text-gray-500">Loading impact data...</p>
            </div>
        );
    }

    // Show empty state if no items tracked yet
    if (impactData.totalItems === 0) {
        return <ImpactEmpty />;
    }

    return (
        <div className="min-h-screen bg-white pb-28 p-4">
            <h1 className="font-semibold text-xl mb-4">Impact</h1>

            {/* Period Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
                <button
                    onClick={() => handlePeriodChange('week')}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                        selectedPeriod === 'week'
                            ? 'bg-green-600 text-white font-medium'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    This Week
                </button>
                <button
                    onClick={() => handlePeriodChange('month')}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                        selectedPeriod === 'month'
                            ? 'bg-green-600 text-white font-medium'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    This Month
                </button>
                <button
                    onClick={() => handlePeriodChange('year')}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                        selectedPeriod === 'year'
                            ? 'bg-green-600 text-white font-medium'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    Yearly
                </button>
                <button
                    onClick={() => handlePeriodChange('all')}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                        selectedPeriod === 'all'
                            ? 'bg-green-600 text-white font-medium'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    All Time
                </button>
            </div>

            <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <StatCard number={impactData.totalItems.toString()} label="Items Logged" />
                    <StatCard number={impactData.itemsEaten.toString()} label="Rescued" />
                    <StatCard number={impactData.itemsWasted.toString()} label="Wasted" />
                </div>

                {/* Green Card - Money Saved */}
                <div className="bg-green-800 text-white p-5 rounded-xl">
                    <p className="text-2xl font-bold">₦{impactData.moneySaved.toLocaleString()}</p>
                    <p className="text-sm mt-1">Saved from wastage</p>
                </div>

                {/* Blue Card - Environmental Impact */}
                <div className="bg-blue-800 text-white p-5 rounded-xl">
                    <p className="text-2xl font-bold">{impactData.co2Saved.toFixed(1)} kg CO₂</p>
                    <p className="text-sm mt-1">Environmental Impact</p>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
