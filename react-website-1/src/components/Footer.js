import React from 'react'
import { Button } from './Button'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='footer-container'>
            <section className="footer-subscription">
                <p className="footer-subscription-heading">
                    Join our Recipe newsletter to receive the latest recipes and cooking tips!
                </p>
                <p className="footer-subscription-text">
                    You can unsubscribe at any time.
                </p>
                <div className="input-areas">
                    <form>
                        <input
                            type="email"
                            name='email'
                            placeholder="Your Email"
                            className="footer-input" />
                        <Button buttonStyle='btn--outline'>Subscribe</Button>
                    </form>
                </div>
            </section>
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>About Us</h2>
                        <Link to='/about'>Our Story</Link>
                        <Link to='/recipes'>Popular Recipes</Link>
                        <Link to='/blog'>Cooking Blog</Link>
                        <Link to='/contact'>Contact Us</Link>
                    </div>
                    <div className="footer-link-items">
                        <h2>Resources</h2>
                        <Link to='/recipes'>Recipe Categories</Link>
                        <Link to='/meal-planning'>Meal Planning</Link>
                        <Link to='/cooking-tips'>Cooking Tips</Link>
                        <Link to='/faq'>FAQs</Link>
                    </div>
                </div>
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>Follow Us</h2>
                        <Link to='/'>Instagram</Link>
                        <Link to='/'>Facebook</Link>
                        <Link to='/'>Pinterest</Link>
                        <Link to='/'>YouTube</Link>
                    </div>
                    <div className="footer-link-items">
                        <h2>Get Involved</h2>
                        <Link to='/submit-recipe'>Submit a Recipe</Link>
                        <Link to='/collaborate'>Collaborate with Us</Link>
                        <Link to='/sponsorship'>Sponsorship Opportunities</Link>
                    </div>
                </div>
            </div>
            <section className="social-media">
                <div className="social-media-wrap">
                    <div className="footer-logo">
                        <Link to='/' className='social-logo'>
                            BiteMark <i className='fas fa-drumstick-bite' />
                        </Link>
                    </div>
                    <small className="website-rights">
                    BiteMark © 2024-2025
                    </small>
                    <div className="social-icons">
                        <Link className="social-icon-link facebook"
                            to='/'
                            target='_blank'
                            aria-label='Facebook'>
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link className="social-icon-link instagram"
                            to='/'
                            target='_blank'
                            aria-label='Instagram'>
                            <i className="fab fa-instagram"></i>
                        </Link>
                        <Link
                            className='social-icon-link youtube'
                            to='/'
                            target='_blank'
                            aria-label='Youtube'
                        >
                            <i className='fab fa-youtube' />
                        </Link>
                        <Link
                            className='social-icon-link twitter'
                            to='/'
                            target='_blank'
                            aria-label='Twitter'
                        >
                            <i className='fab fa-twitter' />
                        </Link>
                        <Link
                            className='social-icon-link linkedin'
                            to='/'
                            target='_blank'
                            aria-label='LinkedIn'
                        >
                            <i className='fab fa-linkedin' />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Footer;
