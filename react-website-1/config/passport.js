const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const mongoose = require('mongoose');

// Serialize user information into the session
passport.serializeUser((user, done) => {
    console.log('Serializing user:', user);
    done(null, user.id); // Store user ID in session
});

// Deserialize user information from the session
passport.deserializeUser(async (id, done) => {
    try {
        console.log('Deserializing user ID:', id);
        const user = await User.findById(id); // Find user by ID
        done(null, user); // Pass user to the next middleware
    } catch (error) {
        console.error('Deserialize error:', error);
        done(error, null); // Handle error
    }
});

// Configure Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('Google Profile received:', {
            id: profile.id,
            displayName: profile.displayName,
            emails: profile.emails?.[0]?.value,
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName
        });

        let user = await User.findOne({ googleId: profile.id }); // Check if user already exists
        
        if (user) {
            console.log('Existing user found:', user);
            return done(null, user); // User exists, proceed
        }

        // If user doesn't exist, create a new user
        user = new User({
            googleId: profile.id,
            email: profile.emails?.[0]?.value,
            displayName: profile.displayName,
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
            profilePicture: profile.photos?.[0]?.value
        });

        console.log('Creating new user:', user);
        await user.save(); // Save new user to the database
        console.log('New user saved successfully');
        return done(null, user); // Return the new user

    } catch (error) {
        console.error('Google Strategy Error:', error);
        return done(error, null); // Handle error
    }
}));

// MongoDB connection event handlers
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

module.exports = passport; // Export the configured passport 