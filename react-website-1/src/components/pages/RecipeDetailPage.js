import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRecipeDetails, searchRecipesByCuisine, fetchRecipesByIngredients } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth
import "../../App.css";
import "./RecipeDetailPage.css"; // Import the CSS file

export default function RecipeDetailPage() {
    const { id } = useParams();
    const { currentUser } = useAuth(); // Get current user from AuthContext
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]); // State for bookmarked recipes
    const [query, setQuery] = useState(""); // State for search query
    const [error, setError] = useState(null); // State for error handling
    const navigate = useNavigate();

    useEffect(() => {
        const loadRecipe = async () => {
            const recipeData = await fetchRecipeDetails(id);
            setRecipe(recipeData);
            setLoading(false);
        };
        loadRecipe();
    }, [id]);

    useEffect(() => {
        const fetchBookmarkedRecipes = async () => {
            if (currentUser) {
                // Fetch the user's bookmarked recipes from the server
                const response = await fetch('/api/users/bookmarks', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const bookmarks = await response.json();
                    setBookmarkedRecipes(bookmarks.map(bookmark => bookmark._id)); // Assuming bookmarks contain objects with _id
                }
            }
        };
        fetchBookmarkedRecipes();
    }, [currentUser]);

    const toggleBookmark = async () => {
        try {
            const isBookmarked = bookmarkedRecipes.includes(id);
            const response = isBookmarked
                ? await fetch('/api/users/bookmarks', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ recipeId: id }),
                })
                : await fetch('/api/users/bookmarks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ recipeId: id, title: recipe.title, image: recipe.image }), // Include title and image
                });

            console.log('Response:', response); // Log the response

            if (response.ok) {
                setBookmarkedRecipes((prev) => {
                    if (isBookmarked) {
                        return prev.filter(recipeId => recipeId !== id); // Remove from bookmarks
                    } else {
                        return [...prev, id]; // Add to bookmarks
                    }
                });
            } else {
                console.error('Failed to update bookmark');
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        }
    };

    const handleSearch = async () => {
        if (!query.trim()) return; // Prevent empty searches
        setLoading(true); // Set loading state
        setError(null); // Reset error state
        try {
            const recipes = await searchRecipesByCuisine(query); // Fetch recipes by query
            if (recipes.length === 0) {
                const ingredientRecipes = await fetchRecipesByIngredients(query);
                navigate("/recipe-page", { state: { recipes: ingredientRecipes, query } }); // Navigate with ingredient results
            } else {
                navigate("/recipe-page", { state: { recipes, query } }); // Navigate with cuisine results
            }
        } catch (err) {
            console.error("Failed to fetch recipes:", err);
            setError("Failed to fetch recipes. Please try again.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Add handler for enter key
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    if (loading) {
        return <div className="recipe-page-container">Loading...</div>;
    }

    if (!recipe) {
        return <div className="recipe-page-container">Recipe not found</div>;
    }

    return (
        <div className="recipe-page-container">
            <div className="search-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search for recipes..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="search-input"
                />
            </div>
            <div className="recipe-detail">
                <h1>{recipe.title}</h1>
                <img src={recipe.image} alt={recipe.title} className="recipe-img" />
                
                {currentUser && ( // Only show bookmark icon if user is logged in
                    <div className="bookmark-container">
                        <button onClick={toggleBookmark} className="bookmark-button">
                            <i className={bookmarkedRecipes.includes(id) ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                        </button>
                        <span className="tooltip">Bookmark</span>
                    </div>
                )}

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