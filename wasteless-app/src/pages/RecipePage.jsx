import React from "react";
import BottomNav from "../components/BottomNav";

function RecipeCard({ title, subtitle, image }) {
    return (
        <div className="bg-white rounded-xl p-3 shadow-sm flex gap-3 items-center">
            <div className="w-24 h-20 rounded-md overflow-hidden bg-gray-100">
                <img src={image || "/assets/recipe1.jpg"} alt={title} className="w-full h-full object-cover" />
            </div>
            <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            </div>
        </div>
    );
}

export default function Recipe() {
    return (
        <div className="min-h-screen bg-white pb-28 px-5">
            <div className="pt-6 pb-4">
                <h1 className="text-xl font-semibold">Recipes</h1>
                <p className="text-sm text-gray-500 mt-1">Find recipes using what you already have</p>
            </div>

            <div className="space-y-3">
                <RecipeCard title="Ofada Rice (with Ayamase stew)" subtitle="Great for rainy days" image="/assets/recipe1.jpg" />
                <RecipeCard title="Nigerian Meat Pie" subtitle="Quick & tasty" image="/assets/recipe2.jpg" />
                <RecipeCard title="Egusi Soup" subtitle="Freezer-friendly" image="/assets/recipe3.jpg" />
            </div>

            <div className="mt-6">
                <div className="bg-green-700 text-white p-5 rounded-xl">
                    <p className="text-lg font-bold">Use What's Open</p>
                    <p className="text-sm mt-1">See meals you can make with your current ingredients.</p>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
