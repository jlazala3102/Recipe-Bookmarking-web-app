import axios from "axios";

// Base URL for Spoonacular API
const BASE_URL = "https://api.spoonacular.com";

// Your API Key
const API_KEY = "67dfd063e7ac40639cd72f8f6edca299"; // Replace with your actual API key

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
