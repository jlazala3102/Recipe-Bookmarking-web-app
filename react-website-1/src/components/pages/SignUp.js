import React from 'react';
import "../../App.css";
import "./SignUp.css";

export default function SignUp() {
    return (
        <div className='sign-up-container'>
            <h1>Sign Up Today</h1>
            <p>Bookmark your favorite dishes and create your personal recipe collection</p>
            
            <a 
                href="http://localhost:5000/api/auth/google"
                className="google-sign-in-btn"
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <img 
                    src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png" 
                    alt="Sign in with Google"
                    style={{ width: '100%', height: 'auto' }}
                />
            </a>
        </div>
    );
}