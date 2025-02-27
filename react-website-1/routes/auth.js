const express = require('express');
const router = express.Router();
const passport = require('passport');

// Google Auth Routes
router.get('/google',
    passport.authenticate('google', { 
        scope: ['profile', 'email'],
        prompt: 'select_account'
    })
);

router.get('/google/callback', 
    passport.authenticate('google', { 
        failureRedirect: '/login',
        failureMessage: true
    }),
    (req, res, next) => {
        try {
            console.log('Callback successful, user:', req.user);
            res.redirect('http://localhost:3000/');
        } catch (error) {
            console.error('Callback error:', error);
            next(error);
        }
    }
);

// Add error handling middleware
router.use((err, req, res, next) => {
    console.error('Auth route error:', err);
    res.status(500).json({ 
        message: 'Authentication error', 
        error: err.message 
    });
});

// Check authentication status
router.get('/status', (req, res) => {
    if (req.isAuthenticated()) {
        return res.json(req.user);
    }
    return res.status(401).json({ message: 'Not authenticated' });
});

// Updated logout route to clear session and cookies
router.post('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ message: 'Logout failed' });
        }
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                console.error('Session destruction error:', err);
                return res.status(500).json({ message: 'Logout failed' });
            }
            // Clear the session cookie
            res.clearCookie('connect.sid');
            res.json({ message: 'Logged out successfully' });
        });
    });
});

module.exports = router; 