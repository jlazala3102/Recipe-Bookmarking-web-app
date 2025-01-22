import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";
import { fetchRecipesByIngredients } from "../utils/api";

function HeroSection() {
    const [query, setQuery] = React.useState(""); // Search query state
    const [error, setError] = React.useState(null); // Error state
    const [loading, setLoading] = React.useState(false); // Loading state
    const navigate = useNavigate(); // Hook for navigation

    const handleSearch = async () => {
        if (!query.trim()) return; // Prevent empty searches
        setLoading(true);
        setError(null);
        try {
            const recipes = await fetchRecipesByIngredients(query); // Fetch recipes
            navigate("/recipe-page", { state: { recipes, query } }); // Navigate with state
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
            <video src="/videos/video-2.mp4" autoPlay loop muted />
            <h1>FIND YOUR NEXT RECIPE</h1>
            <p>What are you waiting for?</p>
            <div className="hero-search">
                <input
                    type="text"
                    placeholder="e.g., chicken, rice"
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
