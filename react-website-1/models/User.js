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
    profilePicture: {
        type: String
    },
    bookmarks: [{
        _id: { type: String, required: true }, // Recipe ID
        title: { type: String, required: true }, // Recipe title
        image: { type: String, required: true }  // Recipe image URL
    }]
});

module.exports = mongoose.model('User', userSchema); 