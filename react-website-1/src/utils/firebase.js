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
    apiKey: "AIzaSyAev2zzmT3JFhwEzjbZdxTk0v9cXfhJf2o",
    authDomain: "react-recipe-website-f0912.firebaseapp.com",
    projectId: "react-recipe-website-f0912",
    storageBucket: "react-recipe-website-f0912.firebasestorage.app",
    messagingSenderId: "844166956566",
    appId: "1:844166956566:web:2e88dd5dd0af669858d737",
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