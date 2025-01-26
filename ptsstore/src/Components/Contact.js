import React, { useState } from "react";
import "../CSS/ContactPage.css"; // Your CSS file
import { Link } from "react-router-dom";
import Footer from "./Footer";

const ContactPage = () => {
  const [formStatus, setFormStatus] = useState(""); // Track form submission status
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make POST request to backend to save contact details
      const response = await fetch("http://localhost:3005/contactdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactDetails),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus("Your message has been sent! We will get back to you soon.");
      } else {
        setFormStatus(data.error || "Something went wrong. Please try again.");
      }

      // Optionally, reset the form fields
      setContactDetails({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting the form:", error);
      setFormStatus("There was an error submitting your form. Please try again.");
    }
  };

  return (
    <div className="contact-containerfull">
      {/* Header Section */}
      <h1 className="headpts">PTS Grocery Store</h1>

      {/* Navigation Section */}
      <div className="topnav">
        <Link to="/">
          <img
            src="/shop.png"
            alt="PTS Grocery Store"
            className="logo"
            style={{ width: "130px", height: "120px" }}
          />
        </Link>
        <Link to="/" className="homemenutext">Home</Link>
        <Link to="/contact" className="homemenutext">Contact</Link>
      </div>

      {/* Main Contact Section */}
      <div className="contact-container">
        <img
          src="/shop.png"
          alt="PTS Grocery Store"
          className="conimg1"
          style={{ width: "800px", height: "500px" }}
        />

        <h1 className="contacth1">Contact Us</h1>

        {/* Contact Information */}
        <div className="contact-info">
          <h3 className="contacth">Get in Touch</h3>
          <p>
            For any inquiries, feel free to contact us using the information below:
          </p>
          <p>Email: <a href="mailto:info@ptsgrocery.com">info@ptsgrocery.com</a></p>
          <p>Phone: <a href="tel:+1234567890">+123 456 7890</a></p>
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
                value={contactDetails.name}
                onChange={handleChange}
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
                value={contactDetails.email}
                onChange={handleChange}
                placeholder="Your Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                required
                value={contactDetails.message}
                onChange={handleChange}
                placeholder="Your Message"
              ></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
          {formStatus && <p className="form-status">{formStatus}</p>} {/* Confirmation message */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
