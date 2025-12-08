import React, { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import ItemCard from "../components/ItemCard";
import authService from "../services/authService";

export default function InventoryHome() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = authService.getStoredUser();
        setUser(userData);
    }, []);

    return (
        <div className="min-h-screen bg-white pb-28">
            <header className="px-5 pt-6 pb-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-green-100 flex items-center justify-center">
                    {user?.profilePicture ? (
                        <img src={user.profilePicture} alt="avatar" className="w-full h-full object-cover" />
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
                <div className="ml-auto text-gray-400">🔔</div>
            </header>

            <div className="px-5">
                <div className="bg-green-700 text-white rounded-xl p-4 mb-4">
                    <p className="font-semibold">The Coast is Clear!</p>
                    <p className="text-sm mt-1">Relax, hero! All deadlines are safely past the 48-hour mark.</p>
                    <button className="mt-3 bg-green-800 py-2 px-3 rounded-md text-sm">Browse Recipes</button>
                </div>

                <div className="relative mb-4">
                    <input className="w-full border rounded-full px-4 py-3" placeholder="Find your food friend..." />
                    <button className="absolute right-3 top-2.5 text-gray-400">☰</button>
                </div>

                <div className="space-y-3">
                    <ItemCard image="/assets/egg.jpg" title="Egg" qty="20 cups" tag="Fridge" expires="Expires today" />
                    <ItemCard image="/assets/milk.jpg" title="Dairy Hero Whole Milk" qty="5 Cartons" tag="Fridge" expires="Expires tomorrow" />
                    <ItemCard image="/assets/rice.jpg" title="Ofada Rice" qty="20 cups" tag="Pantry" expires="Expires in 10 days" />
                </div>
            </div>

            <BottomNav />
            <button className="fixed bottom-24 right-6 bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">+</button>
        </div>
    );
}
