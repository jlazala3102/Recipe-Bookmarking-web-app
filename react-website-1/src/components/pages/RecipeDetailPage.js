import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeDetails } from "../../utils/api";
import "../../App.css";
import "./RecipeDetailPage.css"; // Import the CSS file

export default function RecipeDetailPage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRecipe = async () => {
            const recipeData = await fetchRecipeDetails(id);
            setRecipe(recipeData);
            setLoading(false);
        };
        loadRecipe();
    }, [id]);

    if (loading) {
        return <div className="recipe-page-container">Loading...</div>;
    }

    if (!recipe) {
        return <div className="recipe-page-container">Recipe not found</div>;
    }

    return (
        <div className="recipe-page-container">
            <div className="recipe-detail">
                <h1>{recipe.title}</h1>
                <img src={recipe.image} alt={recipe.title} className="recipe-img" />
                
                <div className="recipe-details">
                    <h3>Ingredients:</h3>
                    <ul>
                        {recipe.extendedIngredients?.map((ingredient, index) => (
                            <li key={index}>{ingredient.original}</li>
                        ))}
                    </ul>
                    
                    <h3>Instructions:</h3>
                    <ol>
                        {recipe.analyzedInstructions && 
                         recipe.analyzedInstructions.length > 0 && 
                         recipe.analyzedInstructions[0].steps?.map((step, index) => (
                            <li key={index}>{step.step}</li>
                        ))}
                        {(!recipe.analyzedInstructions || recipe.analyzedInstructions.length === 0) && (
                            <p>No detailed instructions available for this recipe.</p>
                        )}
                    </ol>
                </div>
            </div>
        </div>
    );
} 