const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    displayName: {  // This will store the Google user's full name
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    profilePicture: {  // Optional: store Google profile picture URL
        type: String
    },
    verificationCode: {
        code: String,
        expiresAt: Date
    }
});

module.exports = mongoose.model('User', userSchema); 