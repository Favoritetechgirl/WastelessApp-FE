import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BottomNav from "../components/BottomNav";
import ItemCard from "../components/ItemCard";
import authService from "../services/authService";
import inventoryService from "../services/inventoryService";
import expirationService from "../services/expirationService";

export default function InventoryHome() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [items, setItems] = useState([]);
    const [expiringItems, setExpiringItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const userData = authService.getStoredUser();
        setUser(userData);
        if (userData?.userId) {
            fetchInventory(userData.userId);
            fetchExpiringItems(userData.userId);
        }
    }, []);

    const fetchInventory = async (userId) => {
        try {
            setLoading(true);
            const data = await inventoryService.getAllItems(userId);
            setItems(data);
        } catch (error) {
            toast.error(error.message || "Failed to fetch inventory");
        } finally {
            setLoading(false);
        }
    };

    const fetchExpiringItems = async (userId) => {
        try {
            const data = await expirationService.getUpcomingExpirations(userId);
            setExpiringItems(data);
        } catch (error) {
            console.error("Failed to fetch expiring items:", error);
        }
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatExpirationDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const diffTime = date - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Expires today";
        if (diffDays === 1) return "Expires tomorrow";
        if (diffDays > 0 && diffDays <= 10) return `Expires in ${diffDays} days`;
        return `Expires on ${date.toLocaleDateString()}`;
    };

    // Show Empty state
    if (!loading && items.length === 0) {
        return (
            <div className="min-h-screen bg-surface-bg pb-28 flex flex-col">
                <header className="px-5 pt-6 pb-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-brand-50 flex items-center justify-center">
                        {user?.profilePicture ? (
                            <img src={user.profilePicture} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-xl font-poppins font-semibold text-brand-500">
                                {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                            </span>
                        )}
                    </div>
                    <div>
                        <p className="font-poppins font-medium text-mobile-h3 text-slate-500">{user?.fullName || 'User'}</p>
                        <p className="text-mobile-caption font-inter text-utility-text">{user?.email || ''}</p>
                    </div>
                    <div className="ml-auto text-utility-text cursor-pointer hover:text-brand-500 transition-colors" onClick={() => navigate('/notifications')}>🔔</div>
                </header>

                <div className="flex flex-col items-center mt-6 px-6">
                    <img src="/assets/illustrations/Inventory_Home-Empty.png" alt="Empty" className="w-60" />
                    <h2 className="text-mobile-h1 font-poppins font-medium mt-4 text-center text-slate-500">So… Much… Echo!</h2>
                    <p className="text-center text-utility-text text-mobile-body-sm font-inter mt-2">
                        It's a little empty in here. Tap the + to fill your new inventory with groceries and kick waste to the curb!
                    </p>
                </div>

                <button
                    onClick={() => navigate('/itementry')}
                    className="fixed bottom-24 right-6 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-wasteless-lg transition-all duration-200 hover:scale-110">
                    <span className="text-2xl font-poppins">+</span>
                </button>

                <BottomNav />
            </div>
        );
    }

    const hasExpiringItems = expiringItems.length > 0;

    return (
        <div className="min-h-screen bg-surface-bg pb-28">
            <header className="px-5 pt-6 pb-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-brand-50 flex items-center justify-center">
                    {user?.profilePicture ? (
                        <img src={user.profilePicture} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-xl font-poppins font-semibold text-brand-500">
                            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                        </span>
                    )}
                </div>
                <div>
                    <p className="font-poppins font-medium text-mobile-h3 text-slate-500">{user?.fullName || 'User'}</p>
                    <p className="text-mobile-caption font-inter text-utility-text">{user?.email || 'email@example.com'}</p>
                </div>
                <div className="ml-auto text-utility-text cursor-pointer hover:text-brand-500 transition-colors" onClick={() => navigate('/notifications')}>🔔</div>
            </header>

            <div className="px-5">
                {/* Alert Banner */}
                {hasExpiringItems ? (
                    <div className="bg-gradient-to-br from-danger-500 to-danger-600 text-white rounded-wasteless p-4 mb-4 shadow-wasteless">
                        <p className="font-poppins font-medium text-mobile-h3">Expiring within 48 hours</p>
                        <p className="text-mobile-body-sm font-inter mt-2 opacity-95">{expiringItems.length} items need rescuing in the next 48 hours. Don't let them become waste legends!</p>
                        <button
                            onClick={() => navigate('/recipesearch')}
                            className="mt-3 bg-danger-700 hover:bg-danger-800 py-2 px-4 rounded-wasteless-sm text-mobile-button font-poppins font-medium transition-colors">
                            View Rescue List
                        </button>
                    </div>
                ) : (
                    <div className="bg-gradient-to-br from-brand-600 to-brand-700 text-white rounded-wasteless p-4 mb-4 shadow-wasteless">
                        <p className="font-poppins font-medium text-mobile-h3">The Coast is Clear!</p>
                        <p className="text-mobile-body-sm font-inter mt-2 opacity-95">Relax, hero! All deadlines are safely past the 48-hour mark. It's smooth sailing!</p>
                        <button
                            onClick={() => navigate('/recipepage')}
                            className="mt-3 bg-brand-800 hover:bg-brand-900 py-2 px-4 rounded-wasteless-sm text-mobile-button font-poppins font-medium transition-colors">
                            Browse Recipes
                        </button>
                    </div>
                )}

                {/* Search Bar */}
                <div className="relative mb-4">
                    <input
                        className="w-full border border-utility-border rounded-full px-4 py-3 text-mobile-body font-inter placeholder:text-utility-text focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all"
                        placeholder="Find your food friend..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={() => navigate('/sort')}
                        className="absolute right-3 top-2.5 text-utility-text hover:text-brand-500 cursor-pointer transition-colors">☰</button>
                </div>

                {/* Inventory Items */}
                {loading ? (
                    <div className="text-center py-8">Loading...</div>
                ) : (
                    <div className="space-y-3">
                        {filteredItems.map((item) => (
                            <ItemCard
                                key={item.id}
                                image={item.imageUrl || item.image}
                                title={item.name}
                                qty={`${item.quantity}`}
                                tag={item.category}
                                expires={formatExpirationDate(item.expiryDate || item.expirationDate)}
                                onClick={() => navigate(`/itemdetails?id=${item.id}`)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <BottomNav />
            <button
                onClick={() => navigate('/itementry')}
                className="fixed bottom-24 right-6 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-wasteless-lg transition-all duration-200 hover:scale-110">
                <span className="text-2xl font-poppins">+</span>
            </button>
        </div>
    );
}
