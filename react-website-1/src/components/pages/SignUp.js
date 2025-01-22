import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../utils/firebase';
import { checkUsername } from '../../utils/firebase';
import "../../App.css";
import "./SignUp.css";

export default function SignUp() {
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            if (result.user) {
                // Check if username exists
                const hasUsername = await checkUsername(result.user.uid);
                if (hasUsername) {
                    navigate('/'); // Go to home if username exists
                } else {
                    navigate('/create-username'); // Go to username creation
                }
            }
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    return (
        <div className='sign-up-container'>
            <h1>Sign Up Today</h1>
            <p>Bookmark your favorite dishes and create your personal recipe collection</p>
            
            <button 
                className='google-sign-in-btn'
                onClick={handleGoogleSignIn}
            >
                <img src="/images/google-icon.png" alt="Google" />
                Sign in with Google
            </button>
        </div>
    );
}