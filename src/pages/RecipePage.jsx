import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BottomNav from "../components/BottomNav";
import { useAuth } from "../context/AuthContext";
import { recipeService, inventoryService } from "../services";

function RecipeCard({ recipe, onClick }) {
    return (
        <div
            className="bg-white rounded-xl p-3 shadow-sm flex gap-3 items-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={onClick}
        >
            <div className="w-24 h-20 rounded-md overflow-hidden bg-gray-100">
                <img
                    src={recipe.image || "/assets/recipe1.jpg"}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1">
                <h3 className="font-semibold">{recipe.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                    {recipe.usedIngredientCount} ingredients match • Ready in {recipe.readyInMinutes} min
                </p>
            </div>
        </div>
    );
}

export default function Recipe() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inventoryItems, setInventoryItems] = useState([]);

    useEffect(() => {
        if (user?.userId) {
            fetchInventory();
        }
    }, [user]);

    const fetchInventory = async () => {
        try {
            const items = await inventoryService.getAllItems(user.userId);
            setInventoryItems(items);
        } catch (error) {
            console.error("Failed to fetch inventory:", error);
        }
    };

    const handleFindRecipes = async () => {
        if (inventoryItems.length === 0) {
            toast.info("Add some items to your inventory first!");
            navigate('/item-entry');
            return;
        }

        setLoading(true);
        try {
            const data = await recipeService.getSuggestions(user.userId, { maxMissingIngredients: 5 });
            setRecipes(data);

            if (data.length === 0) {
                toast.info("No recipes found. Try adding more items!");
            } else {
                toast.success(`Found ${data.length} recipes!`);
            }
        } catch (error) {
            console.error("Failed to fetch recipes:", error);
            toast.error("Failed to find recipes. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRecipeClick = (recipe) => {
        navigate(`/recipe-details/${recipe.id}`, { state: { recipe } });
    };

    return (
        <div className="min-h-screen bg-white pb-28 px-5">
            <div className="pt-6 pb-4">
                <h1 className="text-xl font-semibold">Recipes</h1>
                <p className="text-sm text-gray-500 mt-1">Find recipes using what you already have</p>
            </div>

            {recipes.length > 0 ? (
                <div className="space-y-3">
                    {recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onClick={() => handleRecipeClick(recipe)}
                        />
                    ))}
                </div>
            ) : (
                <div className="space-y-3 text-center py-8">
                    <p className="text-gray-500">No recipes loaded yet</p>
                    <p className="text-sm text-gray-400">
                        {inventoryItems.length > 0
                            ? `You have ${inventoryItems.length} items in your inventory`
                            : "Add items to your inventory first"}
                    </p>
                </div>
            )}

            <div className="mt-6">
                <div
                    className="bg-green-700 text-white p-5 rounded-xl cursor-pointer hover:bg-green-800 transition-colors"
                    onClick={handleFindRecipes}
                >
                    <p className="text-lg font-bold">
                        {loading ? "Finding Recipes..." : "Use What's Open"}
                    </p>
                    <p className="text-sm mt-1">
                        See meals you can make with your current ingredients.
                    </p>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
