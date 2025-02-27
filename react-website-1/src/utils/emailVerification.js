import { saveVerificationCode as saveVerificationCodeDB } from './mongodb';

// Generate a random 6-digit code
export const generateVerificationCode = () => {
    // Generate a random 6-digit verification code
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Save verification code
export const saveVerificationCode = async (email, code) => {
    try {
        await saveVerificationCodeDB(email, code);
        console.log(`Verification code saved for ${email}: ${code}`); // For debugging
    } catch (error) {
        console.error('Error saving verification code:', error);
        throw error;
    }
};

// Check if verification code is correct
export const verifyCode = async (email, code) => {
    try {
        const response = await fetch('/api/auth/verify-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, code }),
        });

        if (!response.ok) {
            throw new Error('Verification failed');
        }

        const data = await response.json();
        return data.isValid;
    } catch (error) {
        console.error('Error verifying code:', error);
        throw error;
    }
}; 