import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Search, X } from "lucide-react";
import BottomNav from "../components/BottomNav";
import { useAuth } from "../context/AuthContext";
import { recipeService, inventoryService } from "../services";

function RecipeCard({ recipe, onClick }) {
    return (
        <div
            className="bg-surface-bg rounded-wasteless-lg p-4 shadow-wasteless flex gap-4 items-center cursor-pointer hover:shadow-wasteless-md transition-all hover:scale-[1.02]"
            onClick={onClick}
        >
            <div className="w-24 h-20 rounded-wasteless overflow-hidden bg-surface-accent">
                <img
                    src={recipe.image || "/assets/recipe1.jpg"}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1">
                <h3 className="font-poppins font-medium text-mobile-h3 text-slate-500">{recipe.title}</h3>
                <p className="text-mobile-caption font-inter text-utility-text mt-1">
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
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        if (user?.userId) {
            fetchInventory();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            setShowSearch(false);
            setSearchResults([]);

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

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setSearching(true);
        try {
            const data = await recipeService.searchRecipes(searchQuery);
            setSearchResults(data);
            setRecipes([]);

            if (data.length === 0) {
                toast.info(`No recipes found for "${searchQuery}"`);
            } else {
                toast.success(`Found ${data.length} recipes!`);
            }
        } catch (error) {
            console.error("Failed to search recipes:", error);
            toast.error("Failed to search recipes. Please try again.");
        } finally {
            setSearching(false);
        }
    };

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
        setShowSearch(false);
    };

    const handleRecipeClick = (recipe) => {
        navigate(`/recipe-details/${recipe.id}`, { state: { recipe } });
    };

    const displayedRecipes = searchResults.length > 0 ? searchResults : recipes;

    return (
        <div className="min-h-screen bg-surface-bg pb-28 px-5">
            <div className="pt-6 pb-4">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-mobile-h2 md:text-desktop-h2 font-poppins font-medium text-slate-500">Recipes</h1>
                    <button
                        onClick={() => setShowSearch(!showSearch)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        {showSearch ? <X className="w-5 h-5 text-slate-500" /> : <Search className="w-5 h-5 text-slate-500" />}
                    </button>
                </div>
                <p className="text-mobile-body-sm md:text-desktop-body-sm font-inter text-utility-text mt-1">
                    Find recipes using what you already have
                </p>

                {/* Search Bar */}
                {showSearch && (
                    <form onSubmit={handleSearch} className="mt-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search recipes e.g., Pasta, Jollof Rice..."
                                className="w-full border border-gray-300 rounded-full px-4 py-3 pr-12 focus:outline-none focus:border-green-500"
                            />
                            <button
                                type="submit"
                                disabled={searching}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-green-500"
                            >
                                {searching ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500"></div>
                                ) : (
                                    <Search className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="mt-2 text-sm text-gray-500 hover:text-gray-700"
                            >
                                Clear search
                            </button>
                        )}
                    </form>
                )}
            </div>

            {displayedRecipes.length > 0 ? (
                <div className="space-y-3">
                    {searchResults.length > 0 && (
                        <p className="text-sm text-gray-500 mb-2">
                            Search results for "{searchQuery}"
                        </p>
                    )}
                    {displayedRecipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onClick={() => handleRecipeClick(recipe)}
                        />
                    ))}
                </div>
            ) : (
                <div className="space-y-3 text-center py-8">
                    <p className="text-mobile-body font-inter text-slate-500">No recipes loaded yet</p>
                    <p className="text-mobile-body-sm font-inter text-utility-text">
                        {inventoryItems.length > 0
                            ? `You have ${inventoryItems.length} items in your inventory`
                            : "Add items to your inventory first"}
                    </p>
                </div>
            )}

            <div className="mt-6">
                <button
                    className="w-full bg-gradient-to-br from-brand-700 to-brand-800 text-white p-6 rounded-wasteless-lg cursor-pointer hover:from-brand-800 hover:to-brand-900 transition-all shadow-wasteless hover:shadow-wasteless-md disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleFindRecipes}
                    disabled={loading}
                >
                    <p className="text-mobile-h3 md:text-desktop-h3 font-poppins font-medium">
                        {loading ? "Finding Recipes..." : "Use What's Open"}
                    </p>
                    <p className="text-mobile-body-sm md:text-desktop-body-sm font-inter mt-2 text-white/90">
                        See meals you can make with your current ingredients.
                    </p>
                </button>
            </div>

            <BottomNav />
        </div>
    );
}
