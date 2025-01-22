import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import RecipePage from './components/pages/RecipePage';
import RecipeDetailPage from './components/pages/RecipeDetailPage';
import CreateUsername from './components/pages/CreateUsername';
import Settings from './components/pages/Settings';
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
          <Route path='/create-username' element={<CreateUsername />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
