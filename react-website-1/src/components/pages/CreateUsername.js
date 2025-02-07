import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import "./CreateUsername.css";
import { db } from '../../utils/firebase';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

export default function CreateUsername({ setIsCreatingUsername }) {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        setIsCreatingUsername(true); // Set to true when this component mounts
        return () => setIsCreatingUsername(false); // Reset when unmounting
    }, [setIsCreatingUsername]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const isAvailable = await checkUsernameAvailability(username);
            if (!isAvailable) {
                setError('Username is already taken');
                return;
            }

            await saveUsername(currentUser.uid, username);
            navigate('/');
            window.location.reload();
        } catch (error) {
            setError('Failed to create username. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const checkUsernameAvailability = async (username) => {
        try {
            // Query Firestore to check if username exists
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('username', '==', username));
            const querySnapshot = await getDocs(q);
            return querySnapshot.empty; // Returns true if username is available
        } catch (error) {
            console.error('Error checking username:', error);
            throw error;
        }
    };

    const saveUsername = async (uid, username) => {
        try {
            // Create or update user document in Firestore
            const userRef = doc(db, 'users', uid);
            await setDoc(userRef, {
                username: username,
                createdAt: new Date(),
                email: currentUser.email
            }, { merge: true }); // merge: true will update existing doc or create new one
            
            return true;
        } catch (error) {
            console.error('Error saving username:', error);
            throw error;
        }
    };

    return (
        <div className="create-username-container">
            <h1>Create Username</h1>
            <p>Choose a unique username for your account</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    minLength={3}
                    maxLength={20}
                    pattern="^[a-zA-Z0-9_.]+$"
                    required
                />
                <button 
                    type="submit" 
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Username'}
                </button>
            </form>
        </div>
    );
} 