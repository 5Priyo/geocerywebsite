import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Store.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Banner from "./Banner";
import Card from "./Cardset";
import Productserver from "./Product";
import Footer from "./Footer";
import Popup from "./Popup"; // Import the Popup component

export const Store = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State for controlling the popup visibility
  const [popupMessage, setPopupMessage] = useState(""); // State to hold the popup message

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  const displayNotification = (message) => {
    setPopupMessage(message); // Set the message
    setShowPopup(true); // Show the popup
    setTimeout(() => setShowPopup(false), 3000); // Hide the popup after 3 seconds
  };

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    setCartCount(updatedCart.length);
    displayNotification(`${product.name} added to cart!`);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.search.value.trim();
    setSearchQuery(query);
  };

  return (
    <div className="store-container">
      <h1 className="headpts">PTS Grocery Store</h1>

      <div className="topnav">
        <Link to="/">
          <img
            src="/shop.png"
            alt="PTS Grocery Store"
            className=""
            style={{ width: "130px", height: "120px" }}
          />
        </Link>

        <Link to="/" className="homemenutext">
          Home
        </Link>

        <Link to="/contact" className="homemenutext">
          Contact
        </Link>

        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              id="search"
              placeholder="Search.."
              name="search"
              aria-label="Search"
            />
            <button type="submit" aria-label="Submit Search">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>

        <Link to="/cart" className="cart-icon">
          <p>
            <i className="fa fa-shopping-cart"></i> 
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </p>
        </Link>

        {loggedInUser ? (
          <div className="user-info">
            <p>
              <i className="fa fa-user"></i> {loggedInUser.name}
            </p>
            <button onClick={handleLogout} className="logout-button">
              <i className="fa fa-sign-out-alt"></i> Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-icon">
            <p>
              <i className="fa fa-sign-in-alt"></i> Login
            </p>
          </Link>
        )}
      </div>

      {showPopup && (
        <Popup message={popupMessage} onClose={() => setShowPopup(false)} />
      )}

      <Banner />
      <Card />
      <Productserver
        displayNotification={displayNotification}
        addToCart={addToCart}
        searchQuery={searchQuery}
      />
      <Footer />
    </div>
  );
};

export default Store;
