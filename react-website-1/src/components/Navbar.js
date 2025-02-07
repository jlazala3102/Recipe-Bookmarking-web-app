import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';
import { Button } from './Button';

function Navbar({ isDisabled }) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [dropdown, setDropdown] = useState(false);
    const { currentUser, logout } = useAuth();
    const [username, setUsername] = useState(null);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        }
        else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
        if (currentUser) {
            setUsername(currentUser.username || currentUser.email);
        } else {
            setUsername(null);
        }
    }, [currentUser]);

    window.addEventListener('resize', showButton);

    const handleLogout = async () => {
        try {
            await logout();
            setDropdown(false);
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    return (
        <>
            <nav className={`navbar ${isDisabled ? 'navbar-disabled' : ''}`}>
                <div className='navbar-container'>
                    <Link to="/" className='navbar-logo' onClick={closeMobileMenu}>
                        TRVL <i className='fab fa-typo3' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? ' fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                    <div className='nav-auth'>
                        {currentUser ? (
                            <div className='user-menu'>
                                <button 
                                    className='username-btn'
                                    onClick={() => setDropdown(!dropdown)}
                                >
                                    {username}
                                </button>
                                
                                {dropdown && (
                                    <div className='dropdown-menu'>
                                        <Link 
                                            to='/settings'
                                            onClick={() => setDropdown(false)}
                                        >
                                            Settings
                                        </Link>
                                        <button onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to='/sign-up' className='nav-links'>
                                SIGN UP
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
