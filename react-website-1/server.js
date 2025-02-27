require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const passport = require('passport');
const authRoutes = require('./routes/auth');
require('./config/passport'); // Import passport config

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Your React app URL
    credentials: true
}));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/react-web'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Mount auth routes
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/react-web')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Remove the User schema and model definition from here
// Instead, import the User model
const User = require('./models/User');

// API routes
app.post('/api/users', async (req, res) => {
    const { email, username } = req.body;
    try {
        const newUser = new User({ email, username });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Routes (we'll create these files next)
const userRoutes = require('./routes/users');

// Mount the routes
app.use('/api/users', userRoutes);

// Error handling middleware (place this after all routes)
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 