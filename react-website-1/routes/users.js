const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Define your user routes here
router.get('/', (req, res) => {
    res.send('Users route working');
});

// Google OAuth callback
router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/sign-up' }),
    async (req, res) => {
        try {
            // Check if user exists
            let user = await User.findOne({ googleId: req.user.googleId });
            
            if (!user) {
                // Create new user if doesn't exist
                user = new User({
                    email: req.user.email,
                    displayName: req.user.displayName,
                    firstName: req.user.name.givenName,
                    lastName: req.user.name.familyName,
                    googleId: req.user.googleId,
                    profilePicture: req.user.photos?.[0]?.value
                });
                await user.save();
            }

            res.redirect('/');
        } catch (error) {
            console.error('Error in Google callback:', error);
            res.redirect('/sign-up');
        }
    }
);

// Route to get user profile
router.get('/profile', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        
        const user = await User.findOne({ googleId: req.user.googleId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            email: user.email,
            displayName: user.displayName,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePicture
        });
    } catch (error) {
        console.error('Profile route error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/delete-account', async (req, res) => {
    try {
        const { userId } = req.body;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ message: 'Failed to delete account' });
    }
});

// Route to update user profile
router.put('/update-profile', async (req, res) => {
    const { userId, firstName, lastName, email } = req.body;

    try {
        // Find the user by ID and update their information
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { firstName, lastName, email },
            { new: true } // Return the updated user
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Failed to update profile' });
    }
});

module.exports = router; 