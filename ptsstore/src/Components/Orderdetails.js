import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Footer from "./Footer";
import './OrderDetails.css';

function OrderDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, totalPrice } = location.state || {};

  const [loggedInUser, setLoggedInUser] = useState(null);

  // Fetch logged-in user from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setLoggedInUser(user);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Ensure totalPrice is defined and is a valid number
  const validTotalPrice = totalPrice && !isNaN(totalPrice) ? totalPrice : 0;

  return (
    <>
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
            className={`navact ${
              location.pathname === "/contact" ? "active" : ""
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Order Details Content */}
        <div className="order-details-container">
          <h1 className="order-details-title">
            {loggedInUser ? loggedInUser.name : "User"}'s Order Details
          </h1>

          {/* Cart items summary */}
          <h2 className="cart-summary-title">Cart Summary</h2>
          {cartItems && cartItems.length > 0 ? (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  const validPrice =
                    item.price && !isNaN(item.price) ? item.price : 0;
                  const validQuantity =
                    item.quantity && !isNaN(item.quantity) ? item.quantity : 1;
                  const itemTotal = (validPrice * validQuantity).toFixed(2);

                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{validQuantity}</td>
                      <td>Rs.{validPrice}</td>
                      <td>Rs.{itemTotal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="empty-cart-message">No items in cart</p>
          )}

          {/* Total price */}
          <h3 className="total-price">
            Total Price: Rs.{validTotalPrice.toFixed(2)}
          </h3>

          <h2 className="orders-title">Your Orders</h2>
          <p className="order-processing-message">
            Your order will be processed based on the above cart details.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderDetails;
