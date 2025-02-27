import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './BookmarksPage.css'; // Optional: Create a CSS file for styling

const BookmarksPage = () => {
    const { currentUser } = useAuth();
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/bookmarks', {
                    method: 'GET',
                    credentials: 'include', // Include credentials for authentication
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched bookmarks:', data); // Log the fetched bookmarks
                    setBookmarks(data); // Set bookmarks to the fetched data
                } else {
                    console.error('Failed to fetch bookmarks');
                }
            } catch (error) {
                console.error('Error fetching bookmarks:', error);
            }
        };

        if (currentUser) {
            fetchBookmarks(); // Fetch bookmarks if the user is logged in
        }
    }, [currentUser]);

    return (
        <div className="bookmarks-page-container">
            <h1>Your Bookmarked Recipes</h1>
            {bookmarks.length === 0 ? (
                <p>You have no bookmarked recipes.</p>
            ) : (
                <div className="bookmarks-list">
                    {bookmarks.map((recipe) => (
                        <div key={recipe._id} className="bookmark-item">
                            <Link to={`/recipe/${recipe._id}`}>
                                <img src={recipe.image} alt={recipe.title} className="bookmark-image" />
                                <h2>{recipe.title}</h2>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookmarksPage; 