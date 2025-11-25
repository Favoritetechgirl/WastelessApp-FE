import React from "react";
import BottomNav from "../components/BottomNav";
import ItemCard from "../components/ItemCard";

export default function InventoryExpiring() {
    return (
        <div className="min-h-screen bg-white pb-28">
            <header className="px-5 pt-6 pb-4 flex items-center gap-3">
                <img src="/assets/avatar.jpg" alt="avatar" className="w-12 h-12 rounded-full object-cover" />
                <div>
                    <p className="font-semibold">Nkechi Okafor</p>
                    <p className="text-xs text-gray-400">nkechiokafor@email.com</p>
                </div>
                <div className="ml-auto text-gray-400">🔔</div>
            </header>


            <div className="px-5">
                <div className="bg-red-600 text-white rounded-xl p-4 mb-4">
                    <p className="font-semibold">Expiring within 48 hours</p>
                    <p className="text-sm mt-1">5 items need rescuing in the next 48 hours. Don't let them become waste legends!</p>
                    <button className="mt-3 bg-red-700 py-2 px-3 rounded-md text-sm">View Rescue List</button>
                </div>

                <div className="relative mb-4">
                    <input className="w-full border rounded-full px-4 py-3" placeholder="Find your food friend..." />
                </div>

                <div className="space-y-3">
                    <ItemCard image="/assets/egg.jpg" title="Egg" qty="20 cups" tag="Fridge" expires="Expires today" />
                    <ItemCard image="/assets/milk.jpg" title="Dairy Hero Whole Milk" qty="5 Cartons" tag="Fridge" expires="Expires tomorrow" />
                </div>
            </div>

            <BottomNav />
            <button className="fixed bottom-24 right-6 bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">+</button>
        </div>
    );
}
