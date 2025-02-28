import axios from "axios";

// Base URL for Spoonacular API
const BASE_URL = "https://api.spoonacular.com";
const API_KEY = process.env.REACT_APP_API_KEY;

// Fetch recipes by ingredients
export const fetchRecipesByIngredients = async (ingredients) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/findByIngredients`, {
      params: {
        ingredients, // List of ingredients as a comma-separated string
        number: 10,  // Number of results to return
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

// Fetch detailed recipe information by ID
export const fetchRecipeDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/${id}/information`, {
      params: {
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
};

// Combined search function for both ingredients and recipe names
export const searchRecipes = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/recipes/complexSearch?query=${query}&number=10&apiKey=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    const data = await response.json();
    return data.results; // Return only the results array
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

// New function to search recipes by cuisine and recipe name
export const searchRecipesByCuisine = async (query) => {
    const [recipeName, cuisine] = query.split(',').map(part => part.trim());
    try {
        const response = await fetch(`${BASE_URL}/recipes/complexSearch?query=${recipeName}&cuisine=${cuisine}&number=10&apiKey=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        return data.results; // Return only the results array
    } catch (error) {
        console.error('Error searching recipes by cuisine:', error);
        throw error;
    }
};
