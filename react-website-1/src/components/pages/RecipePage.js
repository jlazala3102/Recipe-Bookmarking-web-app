import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchRecipesByCuisine, fetchRecipesByIngredients } from "../../utils/api";
import "../../App.css";
import "./RecipePage.css";

export default function RecipePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { recipes = [], query = "" } = location.state || {};
    const hasRecipes = recipes && recipes.length > 0;
    const [queryState, setQueryState] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRecipeClick = (recipe) => {
        navigate(`/recipe/${recipe.id}`);
    };

    const handleSearch = async () => {
        if (!queryState.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const recipes = await searchRecipesByCuisine(queryState);
            if (recipes.length === 0) {
                const ingredientRecipes = await fetchRecipesByIngredients(queryState);
                navigate("/recipe-page", { state: { recipes: ingredientRecipes, query: queryState } });
            } else {
                navigate("/recipe-page", { state: { recipes, query: queryState } });
            }
        } catch (err) {
            console.error("Failed to fetch recipes:", err);
            setError("Failed to fetch recipes. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    if (!location.state) {
        return <div className="recipe-page-container">
            <p>No recipe data available. Please search for recipes first.</p>
        </div>;
    }

    return (
        <div className="recipe-page-container">
            <div className="search-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search for recipes..."
                    value={queryState}
                    onChange={(e) => setQueryState(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="search-input"
                />
            </div>
            <h1 className="recipe-page">Recipes for "{query}"</h1>
            {error && <p className="error-message">{error}</p>}
            {/* Display Recipes */}
            {hasRecipes ? (
                <div className="recipe-results">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="recipe-card">
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="recipe-img"
                            />
                            <h3 
                                onClick={() => handleRecipeClick(recipe)}
                                style={{ cursor: 'pointer' }}
                                className="recipe-title"
                            >
                                {recipe.title}
                            </h3>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No recipes found. Try a different query!</p>
            )}
        </div>
    );
}
