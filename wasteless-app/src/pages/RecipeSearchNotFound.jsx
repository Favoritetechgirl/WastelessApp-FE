import React from "react";
import BottomNav from "../components/BottomNav";
import recipenotfound from "../assets/illustrations/Recipe_Search-Not Found.png"

export default function RecipeSearchNotFound() {
    return (
        <div className="min-h-screen bg-white pb-28">

            <header className="px-5 py-6 text-center font-semibold">Recipes</header>

            <div className="px-5">
                <div className="relative">
                    <input
                        placeholder="Search query"
                        className="w-full border rounded-full px-4 py-3"
                    />
                    <span className="absolute right-4 top-3">✖</span>
                </div>
            </div>

            <div className="mt-14 flex flex-col items-center px-6">
                <img src={recipenotfound} className="w-72" />

                <h2 className="text-lg font-semibold mt-4">Uh Oh! That’s a Recipe Black Hole.</h2>

                <p className="text-center text-gray-500 text-sm mt-2">
                    We couldn’t find a match! Try removing one ingredient,
                    checking your spelling, or browse filters for inspiration.
                </p>
            </div>

            <BottomNav />
        </div>
    );
}
