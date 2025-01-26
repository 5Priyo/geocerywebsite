import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import "../CSS/Footer.css"; // Link to the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>PTS Grocery Store</h2>
          <p>Your one-stop shop for fresh groceries delivered to your doorstep. We ensure quality and convenience with every product we offer.</p>
        </div>
        
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            
            <li><a href="/">Store</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/order">Order</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact</h3>
          <p>Email: info@ptsgrocery.com</p>
          <p>Phone: +123 456 7890</p>
        </div>

        <div className="footer-section newsletter">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Get the latest offers, new arrivals, and updates delivered straight to your inbox.</p>
          <form action="#" method="post" className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-button">Subscribe</button>
          </form>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="social-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 PTS Grocery Store | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
