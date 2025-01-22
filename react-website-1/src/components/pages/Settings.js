import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Settings.css';

export default function Settings() {
    const { currentUser } = useAuth();

    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <div className="settings-section">
                <h2>Profile</h2>
                <div className="profile-info">
                    <p>Username: {currentUser?.username}</p>
                    <p>Email: {currentUser?.email}</p>
                </div>
                {/* Add more settings options here */}
            </div>
        </div>
    );
} 