const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const mongoose = require('mongoose');

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

// Add this route to handle adding a bookmark
router.post('/bookmarks', async (req, res) => {
    console.log('Request body:', req.body); // Log the entire request body
    const { recipeId, title, image } = req.body; // Get the recipe ID and title from the request body
    console.log('Adding bookmark for recipeId:', recipeId); // Debug log
    console.log('Title:', title); // Debug log
    console.log('Image:', image); // Debug log

    try {
        if (!req.user) {
            console.log('User not authenticated'); // Debug log
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            console.log('User not found'); // Debug log
            return res.status(404).json({ message: 'User not found' });
        }

        // Create the bookmark object
        const newBookmark = {
            _id: recipeId, // Recipe ID
            title: title,   // Recipe title
            image: image    // Recipe image URL
        };

        // Add the new bookmark to the bookmarks array if it doesn't already exist
        if (!user.bookmarks.some(bookmark => bookmark._id === recipeId)) {
            user.bookmarks.push(newBookmark);
            await user.save();
            console.log('Bookmark added successfully'); // Debug log
        }

        res.status(200).json({ message: 'Bookmark added successfully' });
    } catch (error) {
        console.error('Error adding bookmark:', error);
        res.status(500).json({ message: 'Failed to add bookmark' });
    }
});

// Route to handle removing a bookmark
router.delete('/bookmarks', async (req, res) => {
    const { recipeId } = req.body; // Get the recipe ID from the request body
    console.log('Removing bookmark for recipeId:', recipeId); // Debug log

    try {
        if (!req.user) {
            console.log('User not authenticated'); // Debug log
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            console.log('User not found'); // Debug log
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the recipe ID from the bookmarks array
        user.bookmarks = user.bookmarks.filter(id => id._id.toString() !== recipeId);
        await user.save();
        console.log('Bookmark removed successfully'); // Debug log

        res.status(200).json({ message: 'Bookmark removed successfully' });
    } catch (error) {
        console.error('Error removing bookmark:', error);
        res.status(500).json({ message: 'Failed to remove bookmark' });
    }
});

// Route to get user bookmarks
router.get('/bookmarks', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const user = await User.findById(req.user._id).populate('bookmarks'); // Populate bookmarks with recipe details
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.bookmarks); // Return the bookmarks
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        res.status(500).json({ message: 'Failed to fetch bookmarks' });
    }
});

module.exports = router; 