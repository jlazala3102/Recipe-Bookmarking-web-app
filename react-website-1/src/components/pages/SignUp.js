import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle, auth, checkUsername, saveUserEmail } from '../../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import "../../App.css";
import "./SignUp.css";
import { generateVerificationCode, saveVerificationCode, verifyCode } from '../../utils/emailVerification';

export default function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [showVerification, setShowVerification] = useState(false);
    const [tempEmail, setTempEmail] = useState('');
    const [tempPassword, setTempPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            const result = await signInWithGoogle();
            if (result.user) {
                const user = result.user;
                const hasUsername = await checkUsername(user.uid);

                // Store the user's email in the database
                await saveUserEmail(user.uid, user.email);

                if (hasUsername) {
                    navigate('/'); // Redirect to home if username exists
                    window.location.reload(); // Refresh the page
                } else {
                    navigate('/create-username'); // Redirect to create username if not
                }
            }
        } catch (error) {
            console.error("Error signing in with Google:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailSignUp = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setError('');
            setLoading(true);
            
            // Generate and save verification code
            const code = generateVerificationCode();
            await saveVerificationCode(email, code); // Simulate saving the code
            console.log(`Verification code for ${email}: ${code}`); // Log the code for testing

            // Show verification input
            setShowVerification(true);
            setTempEmail(email);
            setTempPassword(password);
            setMessage('Please check your email for verification code');

        } catch (error) {
            setError('Failed to send verification code: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerification = async (e) => {
        e.preventDefault();
        
        if (!verificationCode) {
            setError('Please enter verification code');
            return;
        }

        try {
            setLoading(true);
            setError('');

            // Verify the code
            const isValid = await verifyCode(tempEmail, verificationCode);
            
            if (!isValid) {
                setError('Invalid or expired verification code');
                return;
            }

            // If verification is successful, create the user
            const userCredential = await createUserWithEmailAndPassword(auth, tempEmail, tempPassword);
            const user = userCredential.user;

            // Check if the user needs to create a username
            const hasUsername = await checkUsername(user.uid);
            if (hasUsername) {
                navigate('/'); // Redirect to home if username exists
                window.location.reload(); // Refresh the page
            } else {
                navigate('/create-username'); // Redirect to create username if not
            }

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('This email is already registered');
            } else if (error.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters');
            } else {
                setError('Failed to create account: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='sign-up-container'>
            <h1>Sign Up Today</h1>
            <p>Bookmark your favorite dishes and create your personal recipe collection</p>
            
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            {!showVerification ? (
                <form onSubmit={handleEmailSignUp} className="email-signup-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                    <button 
                        type="submit" 
                        className="email-sign-up-btn"
                        disabled={loading}
                    >
                        Send Verification Code
                    </button>
                </form>
            ) : (
                <form onSubmit={handleVerification} className="email-signup-form">
                    <input
                        type="text"
                        placeholder="Enter verification code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        maxLength={6}
                        disabled={loading}
                    />
                    <button 
                        type="submit" 
                        className="email-sign-up-btn"
                        disabled={loading}
                    >
                        Verify and Sign Up
                    </button>
                </form>
            )}

            <div className="divider">
                <span>OR</span>
            </div>

            <button 
                className='google-sign-in-btn'
                onClick={handleGoogleSignIn}
                disabled={loading}
            >
                <img src="/images/google-icon.png" alt="Google" />
                Sign in with Google
            </button>
        </div>
    );
}