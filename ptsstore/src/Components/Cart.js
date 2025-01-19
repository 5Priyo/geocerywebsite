import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Cart.css";
import "../CSS/Store.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState("");
  const location = useLocation(); // Get current route location

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const sanitizedCart = storedCart.map((item) => ({
        ...item,
        price: item.price || 0, // Default price to 0 if undefined
        quantity: item.quantity || 1, // Default quantity to 1 if undefined
      }));
      setCartItems(sanitizedCart);
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      setCartItems([]);
    }
  }, []);

  const displayNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 5000); // Display notification for 5 seconds
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    displayNotification("Item removed from cart!");
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1

    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty! Add some items before proceeding.");
      return;
    }
  
    // Example condition: Navigate to OrderDetails if there are items, otherwise go to Home
    if (totalPrice > 100) {
      // Navigate to OrderDetails for carts with total price over 100
      navigate("/orderdetails", { state: { cartItems, totalPrice } });
    } else {
      // Navigate to Home for carts with total price of 100 or less
      navigate("/");
    }
  };
  
  

  return (
    <div className="store-container">
      <h1 className="headpts">PTS Grocery Store</h1>

      {/* Top Navigation Bar */}
      <div className="topnav">
        <Link to="/">
          <img
            src="/logo.jpg"
            alt="PTS Grocery Store"
            className="contact-image"
            style={{ width: "50px", height: "50px" }}
          />
        </Link>
        <Link
          to="/"
          className={`navact ${location.pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/contact"
          className={`navact ${location.pathname === "/contact" ? "active" : ""}`}
        >
          Contact
        </Link>
      </div>

      {/* Notification */}
      {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}

      {/* Cart Section */}
      <div className="cart-page">
        <h1>Your Cart</h1>
        {cartItems.length > 0 ? (
          <div>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <img
                    src={item.image || "/default-placeholder.png"}
                    alt={item.name || "Product Image"}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h2 className="cart-item-name">{item.name}</h2>
                    <div className="cart-item-quantity">
                      <button
                        className="quantity-button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="quantity-button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="product-total">
                      Rs.{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="remove-button"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <div className="total-price">
                <h3>Total Price  =  Rs. {totalPrice.toFixed(2)}</h3>
              </div>
            </div>
            <button onClick={proceedToCheckout} className="checkout-button">
            Proceed to Checkout
          </button>

          </div>
        ) : (
          <div>
            <p>Your cart is empty.</p>
            <button onClick={() => navigate("/")} className="go-back-button">
              Go Back to Store
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CartPage;
