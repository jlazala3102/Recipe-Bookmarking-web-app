import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/status', {
                    method: 'GET',
                    credentials: 'include'
                });
                
                if (response.ok) {
                    const userData = await response.json();
                    setCurrentUser(userData);
                } else {
                    // Handle non-200 responses
                    setCurrentUser(null);
                    console.log('Not authenticated');
                }
            } catch (error) {
                console.error('Auth status check failed:', error);
                setCurrentUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const logout = async () => {
        try {
            console.log('Initiating logout...'); // Debug log
            const response = await fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Logout response:', response); // Debug log

            if (response.ok) {
                setCurrentUser(null);
                console.log('Logout successful'); // Debug log
                return true;
            } else {
                console.error('Logout failed with status:', response.status); // Debug log
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    const updateCurrentUser = (userData) => {
        setCurrentUser(userData);
    };

    const value = {
        currentUser,
        loading,
        logout,
        updateCurrentUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
} 