import React, { useState } from "react";
import "./ContactPage.css"; // Your CSS file

import { Link } from "react-router-dom";
import Footer from "./Footer";

const ContactPage = () => {
  const [formStatus, setFormStatus] = useState(""); // Track form submission status

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Your message has been sent! We will get back to you soon.");
    // Optionally, reset form fields here after submission
  };

  return (
    <div className="contact-containerfull">
      {/* Header Section */}
      <h1 className="headpts">PTS Grocery Store</h1>

      {/* Navigation Section */}
      <div className="topnav">
        <Link to="/">
          <img
            src="/logo.jpg"
            alt="PTS Grocery Store"
            className="contact-image"
            style={{ width: "50px", height: "50px" }}
          />
        </Link>
        <Link to="/" className="homemenutext">Home</Link>
        <Link to="/contact" className="homemenutext">Contact</Link>
      </div>
    
      {/* Main Contact Section */}
      <div className="contact-container">
      
      <img
            src="/store.jpg"
            alt="PTS Grocery Store"
            className="contact-img1"
            style={{ width: "200vh", height: "600px" }}
          />

        <h1>Contact Us</h1>

        {/* Contact Information */}
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>For any inquiries, feel free to contact us using the information below:</p>
          <p>
            Email: <a href="mailto:info@ptsgrocery.com">info@ptsgrocery.com</a>
          </p>
          <p>
            Phone: <a href="tel:+1234567890">+123 456 7890</a>
          </p>
        </div>
        
        {/* Contact Form */}
        <div className="contact-form">
          <h3>Send Us a Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Your Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Your Message"
              ></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>

          {formStatus && <p className="form-status">{formStatus}</p>} {/* Confirmation message */}
        </div>

        {/* Google Maps Embed */}
        <div className="map-container">
          <h3>Our Location</h3>
          <iframe title="contact"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d16878.795748599674!2d80.02030784575835!3d9.678815890634562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2slk!4v1737263918084!5m2!1sen!2slk" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
            
          </iframe>
        </div>
       </div>
      
      
      <Footer/>
    </div>
   
  );
};

export default ContactPage;
