import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Footer from "./Footer";
import "../CSS/order.css";

function OrderDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, totalPrice } = location.state || {};

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Added Phone Number
  const [address, setAddress] = useState(""); // Added Address
  const [isOrderCancelled, setIsOrderCancelled] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

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

  // Handle order cancellation
  const handleCancelOrder = () => {
    setIsOrderCancelled(true);
    alert("Your order has been cancelled.");
  };

  // Handle order confirmation and send POST request
  const handleConfirmOrder = () => {
    if (bookingDate && pickupDate && phoneNumber && address) {
      // Generate a unique orderId using a timestamp
      const orderId = `order-${new Date().getTime()}`; // Unique order ID based on timestamp

      const orderDetails = {
        orderId: orderId, // Dynamically generated orderId
        userId: loggedInUser.id, // Assuming loggedInUser has an id
        username: loggedInUser.name, // Add the logged-in user's name
        status: "pending",
        pickupDateTime: `${pickupDate}T12:00:00Z`, // Assuming noon pickup time
        createdAt: new Date().toISOString(), // Add the creation time of the order
        updatedAt: new Date().toISOString(),
        phoneNumber,
        address,
        cartItems, // Add cartItems to include the cart summary details
        totalPrice: validTotalPrice, // Include the total price for reference
      };

      // Send POST request to the server
      fetch("http://localhost:3005/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsOrderConfirmed(true);
          alert("Your order has been confirmed!");
          console.log("Order confirmed:", data);
        })
        .catch((error) => {
          alert("There was an error confirming your order.");
          console.error("Error:", error);
        });
    } else {
      alert("Please fill in all the details.");
    }
  };

  return (
    <>
      <div className="store-container">
        <h1 className="headpts">PTS Grocery Store</h1>

        {/* Top Navigation Bar */}
        <div className="topnav">
          <Link to="/">
            <img
              src="/shop.png"
              alt="PTS Grocery Store"
              className=""
              style={{ width: "130px", height: "120px" }}
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

        {/* Order Details Content */}
        <div className="order-details-container">
          <h1 className="order-details-title">
            {loggedInUser ? loggedInUser.name : "User"}'s Order Details
          </h1>

          {/* If the order is cancelled, remove the order table */}
          {!isOrderCancelled && (
            <>
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
                      const validPrice = item.price && !isNaN(item.price) ? item.price : 0;
                      const validQuantity = item.quantity && !isNaN(item.quantity) ? item.quantity : 1;
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

              {/* Date Selection */}
              <div className="date-selection">
                <label htmlFor="bookingDate">Booking Date:</label>
                <input
                  type="date"
                  id="bookingDate"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />

                <label htmlFor="pickupDate">Pickup Date:</label>
                <input
                  type="date"
                  id="pickupDate"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>

              {/* Contact Details */}
              <div className="contact-details">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                />

                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                />
              </div>

              {/* Order Cancellation Button */}
              <div className="cancel-order">
                <button onClick={handleCancelOrder} className="cancel-button">
                  Cancel Order
                </button>
              </div>

              {/* Order Confirmation Button */}
              <div className="confirm-order">
                <button onClick={handleConfirmOrder} className="confirm-button">
                  Confirm Order
                </button>
              </div>
            </>
          )}

          {/* Display cancellation message */}
          {isOrderCancelled && (
            <p>Your order has been cancelled. The order details are no longer available.</p>
          )}

          {/* Display confirmation message */}
          {isOrderConfirmed && <p>Your order has been confirmed!</p>}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default OrderDetails;
