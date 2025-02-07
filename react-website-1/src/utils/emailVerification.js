import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

// Generate a random 6-digit code
export const generateVerificationCode = () => {
    // Generate a random 6-digit verification code
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Save verification code to a simulated storage (console log for testing)
export const saveVerificationCode = async (email, code) => {
    // Simulate saving the verification code (you can implement this with Firestore if needed)
    console.log(`Saving verification code for ${email}: ${code}`); // Log the code for testing
};

// Check if verification code is correct
export const verifyCode = async (email, code) => {
    // Simulate verifying the code (you can implement this with Firestore if needed)
    // For testing, let's assume the code is always valid
    console.log(`Verifying code for ${email}: ${code}`); // Log the verification attempt
    return true; // Change this logic as needed
}; 