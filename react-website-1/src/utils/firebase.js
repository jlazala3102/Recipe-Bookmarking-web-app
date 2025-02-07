import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    query,
    where,
    collection,
    getDocs
} from 'firebase/firestore';

// Your Firebase configuration (get this from Firebase Console)
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Google Sign In
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result;
    } catch (error) {
        throw error;
    }
};

// Sign Out
export const signOutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
};

// Check if username exists
export const checkUsername = async (uid) => {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        return userDoc.exists() && userDoc.data().username;
    } catch (error) {
        console.error('Error checking username:', error);
        return false;
    }
};

// Check if user has username
export const checkUserHasUsername = async (uid) => {
    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        return userDoc.exists() && userDoc.data().username;
    } catch (error) {
        throw error;
    }
};

// Save username
export const saveUsername = async (uid, username) => {
    try {
        await setDoc(doc(db, "users", uid), {
            username,
            createdAt: new Date().toISOString(),
        }, { merge: true });
    } catch (error) {
        throw error;
    }
};

export const saveVerificationCode = async (email, code) => {
    try {
        console.log(`Saving verification code for ${email}: ${code}`); // Log the email and code
        await db.collection('verificationCodes').doc(email).set({ code });
        console.log("Verification code saved successfully."); // Log success
    } catch (error) {
        console.error("Error saving verification code:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

// Save user email to Firestore
export const saveUserEmail = async (uid, email) => {
    try {
        const userRef = doc(db, 'users', uid);
        await setDoc(userRef, {
            email: email,
            createdAt: new Date(),
        }, { merge: true }); // merge: true will update existing doc or create new one
    } catch (error) {
        console.error('Error saving user email:', error);
        throw error;
    }
};