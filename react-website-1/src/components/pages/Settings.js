import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { saveUsername } from '../../utils/firebase';
import { updateEmail, deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

export default function Settings() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUsernameChange = async (e) => {
        e.preventDefault();
        if (!newUsername.trim()) return;

        try {
            setLoading(true);
            setError('');
            await saveUsername(currentUser.uid, newUsername);
            setMessage('Username updated successfully!');
            setNewUsername('');
            window.location.reload();
        } catch (error) {
            setError('Failed to update username: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailChange = async (e) => {
        e.preventDefault();
        if (!newEmail.trim()) return;

        try {
            setLoading(true);
            setError('');
            await updateEmail(currentUser, newEmail);
            setMessage('Email updated successfully!');
            setNewEmail('');
            window.location.reload();
        } catch (error) {
            setError('Failed to update email: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                setLoading(true);
                setError('');
                await deleteUser(currentUser);
                await logout();
                navigate('/');
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

            <div className="settings-section">
                <h2>Profile</h2>
                <div className="profile-info">
                    <p>Current Username: {currentUser?.username}</p>
                    <p>Current Email: {currentUser?.email}</p>
                </div>

                <form onSubmit={handleUsernameChange} className="settings-form">
                    <h3>Change Username</h3>
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="New username"
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>
                        Update Username
                    </button>
                </form>

                <form onSubmit={handleEmailChange} className="settings-form">
                    <h3>Change Email</h3>
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="New email"
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>
                        Update Email
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
        </div>
    );
} 