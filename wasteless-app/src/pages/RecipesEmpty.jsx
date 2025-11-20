import React from "react";
import BottomNav from "../components/BottomNav";
import emptyrecipe from "../assets/illustrations/Recipe-Empty.png"

export default function RecipesEmpty() {
    return (
        <div className="min-h-screen bg-white pb-28">

            <header className="px-5 py-6 text-center font-semibold">Recipes</header>

            <div className="px-5">
                <input
                    placeholder="Search recipes (e.g., Carrot, Beans, Apple)"
                    className="w-full border rounded-full px-4 py-3"
                />
            </div>

            <div className="mt-10 flex flex-col items-center px-6">
                <img src={emptyrecipe} className="w-72" />

                <h2 className="text-lg font-semibold mt-4">Where's the Magic?</h2>

                <p className="text-center text-gray-500 text-sm mt-2">
                    Recipes only appear when they’re matched to your food!
                    Please go to Inventory to list your items, and we’ll fill this
                    screen with delicious meals.
                </p>

                <button className="mt-6 bg-green-600 text-white px-8 py-3 rounded-full">
                    Go to Inventory
                </button>
            </div>

            <BottomNav />
        </div>
    );
}
