import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import RecipePage from './components/pages/RecipePage';
import RecipeDetailPage from './components/pages/RecipeDetailPage';
import Settings from './components/pages/Settings';
import BookmarksPage from './components/pages/BookmarksPage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path="/recipe-page" element={<RecipePage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/bookmarks' element={<BookmarksPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
