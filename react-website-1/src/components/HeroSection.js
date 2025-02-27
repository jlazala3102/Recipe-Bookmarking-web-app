import React, { useEffect, useState } from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";
import { searchRecipesByCuisine, fetchRecipesByIngredients } from "../utils/api";

const videos = [
    "/videos/fvideo1.mp4", 
    "/videos/fvideo2.mp4",
    "/videos/fvideo3.mp4",
    "/videos/fvideo4.mp4",
    "/videos/fvideo5.mp4",
    "/videos/fvideo6.mp4",
    "/videos/fvideo7.mp4",
    "/videos/fvideo8.mp4"
];

function HeroSection() {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // State to track the current video
    const [query, setQuery] = React.useState(""); // Search query state
    const [error, setError] = React.useState(null); // Error state
    const [loading, setLoading] = React.useState(false); // Loading state
    const [videoOpacity, setVideoOpacity] = useState(1); // State to manage video opacity
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const interval = setInterval(() => {
            setVideoOpacity(0); // Fade out
            setTimeout(() => {
                setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length); // Change video
                setVideoOpacity(1); // Fade in
            }, 1000); // Wait for fade out to complete
        }, 7000); // Change video every 7 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    const handleSearch = async () => {
        if (!query.trim()) return; // Prevent empty searches
        setLoading(true);
        setError(null);
        try {
            // First, try searching by cuisine and recipe name
            const recipes = await searchRecipesByCuisine(query); // Fetch recipes by query
            if (recipes.length === 0) {
                // If no recipes found, try searching by ingredients
                const ingredientRecipes = await fetchRecipesByIngredients(query);
                navigate("/recipe-page", { state: { recipes: ingredientRecipes, query } }); // Navigate with ingredient results
            } else {
                navigate("/recipe-page", { state: { recipes, query } }); // Navigate with cuisine results
            }
        } catch (err) {
            setError("Failed to fetch recipes. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Add handler for enter key
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="hero-container">
            <video 
                src={videos[currentVideoIndex]} 
                autoPlay 
                loop 
                muted 
                className="video-fade" 
                style={{ opacity: videoOpacity }} // Set opacity dynamically
            />
            <h1>FIND YOUR NEXT RECIPE</h1>
            <p>What are you waiting for?</p>
            <div className="hero-search">
                <input
                    type="text"
                    placeholder="e.g., pasta, tacos, burgers"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="search-input"
                />
            </div>
            <div className="hero-btn">
                <Button
                    className="btns"
                    onClick={handleSearch}
                    buttonStyle="btn--outline"
                    buttonSize="btn--large"
                    disabled={loading}
                >
                    {loading ? "Searching..." : "Search"}
                </Button>
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default HeroSection;
