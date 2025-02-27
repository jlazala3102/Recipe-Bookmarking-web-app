import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

export default function Settings() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(currentUser?.firstName || '');
    const [lastName, setLastName] = useState(currentUser?.lastName || '');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            navigate('/sign-up'); // Redirect if not authenticated
        }
    }, [currentUser, navigate]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await fetch('/api/users/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: currentUser._id,
                    firstName,
                    lastName,
                }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const data = await response.json();
            setMessage('Profile updated successfully!');
            // Optionally update the currentUser state if needed
        } catch (error) {
            setError('Failed to update profile: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            setLoading(true);
            setError('');
            setMessage('');

            try {
                const response = await fetch('/api/users/delete-account', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: currentUser._id }),
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to delete account');
                }

                setMessage('Account deleted successfully!');
                // Optionally log out the user or redirect
                await logout();
                navigate('/sign-up'); // Redirect to sign-up page after deletion
            } catch (error) {
                setError('Failed to delete account: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="settings-container">
            <h1>Settings</h1>
            
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            <h2>User Information</h2>
            <p><strong>Name:</strong> {`${firstName} ${lastName}`}</p>
            <p><strong>Email:</strong> {currentUser?.email}</p>

            <form onSubmit={handleUpdateProfile} className="settings-form">
                <h2>Update First and Last Name</h2>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    disabled={loading}
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Name'}
                </button>
            </form>

            <div className="danger-zone">
                <h3>Danger Zone</h3>
                <button 
                    onClick={handleDeleteAccount}
                    className="delete-account-btn"
                    disabled={loading}
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
} 