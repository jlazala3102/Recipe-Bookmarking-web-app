import React, { createContext, useState, useContext, useEffect } from 'react';

// Create an AuthContext to provide authentication state throughout the app
const AuthContext = createContext();

// Custom hook to use the AuthContext
export function useAuth() {
    return useContext(AuthContext);
}

// AuthProvider component to wrap around the app and provide auth state
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null); // State to hold the current user
    const [loading, setLoading] = useState(true); // State to manage loading status

    useEffect(() => {
        // Function to check the authentication status of the user
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/status', {
                    method: 'GET',
                    credentials: 'include'
                });
                
                if (response.ok) {
                    const userData = await response.json();
                    setCurrentUser(userData); // Set the current user if authenticated
                } else {
                    setCurrentUser(null); // Set to null if not authenticated
                    console.log('Not authenticated');
                }
            } catch (error) {
                console.error('Auth status check failed:', error);
                setCurrentUser(null); // Handle error by setting user to null
            } finally {
                setLoading(false); // Set loading to false after checking
            }
        };

        checkAuthStatus(); // Call the function to check auth status
    }, []);

    // Function to log out the user
    const logout = async () => {
        try {
            console.log('Initiating logout...');
            const response = await fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setCurrentUser(null); // Clear the current user on successful logout
                console.log('Logout successful');
                return true;
            } else {
                console.error('Logout failed with status:', response.status);
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
            throw error; // Rethrow error for handling in the component
        }
    };

    // Function to update the current user state
    const updateCurrentUser = (userData) => {
        setCurrentUser(userData);
    };

    // Value to be provided to the context
    const value = {
        currentUser,
        loading,
        logout,
        updateCurrentUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children} {/* Render children only when not loading */}
        </AuthContext.Provider>
    );
} 