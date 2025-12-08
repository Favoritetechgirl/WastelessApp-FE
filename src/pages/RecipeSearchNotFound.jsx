import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

// TODO: Add recipe not found illustration
// import recipenotfound from "../assets/illustrations/Recipe_Search-Not Found.png"
const recipenotfound = null; // Using emoji placeholder until assets are added

export default function RecipeSearchNotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white pb-28">

            <header className="px-5 py-6 flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="text-2xl">←</button>
                <h1 className="font-semibold">Recipes</h1>
            </header>

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
                {recipenotfound ? (
                    <img src={recipenotfound} alt="Recipe not found" className="w-72" />
                ) : (
                    <div className="w-72 h-72 bg-gray-100 rounded-xl flex items-center justify-center">
                        <span className="text-6xl">🔍</span>
                    </div>
                )}

                <h2 className="text-lg font-semibold mt-4">Uh Oh! That's a Recipe Black Hole.</h2>

                <p className="text-center text-gray-500 text-sm mt-2">
                    We couldn't find a match! Try removing one ingredient,
                    checking your spelling, or browse filters for inspiration.
                </p>
            </div>

            <BottomNav />
        </div>
    );
}
