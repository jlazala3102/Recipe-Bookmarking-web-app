import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../../App.css";
import "./RecipePage.css";

export default function RecipePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { recipes = [], query = "" } = location.state || {};
    const hasRecipes = recipes && recipes.length > 0;

    const handleRecipeClick = (recipe) => {
        navigate(`/recipe/${recipe.id}`);
    };

    if (!location.state) {
        return <div className="recipe-page-container">
            <p>No recipe data available. Please search for recipes first.</p>
        </div>;
    }

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
