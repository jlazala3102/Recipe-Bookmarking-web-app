import React from "react";
import { useLocation } from "react-router-dom";
import "../../App.css";

export default function RecipePage() {
    const location = useLocation(); // Access state from navigation
    const { recipes, query } = location.state || {}; // Destructure state
    const hasRecipes = recipes && recipes.length > 0;

    return (
        <div className="recipe-page-container">
            <h1 className="recipe-page">Recipes for "{query}"</h1>

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
                            <h3>{recipe.title}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No recipes found. Try a different query!</p>
            )}
        </div>
    );
}
