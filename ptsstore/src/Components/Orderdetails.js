import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/OrderDetails.css";
import Dashboard from "./Dashboard";

function OrderDetails() {
  const [orders, setOrders] = useState([]); // State to hold orders data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const [loggedInUser, setLoggedInUser] = useState(null); // Logged in user

  const navigate = useNavigate();

  // Fetch logged-in user info from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log(user); // Check if the user is fetched correctly
    if (user) {
      setLoggedInUser(user);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch orders for the logged-in user or show all orders for admin
  useEffect(() => {
    if (loggedInUser) {
      let fetchUrl = `http://localhost:3005/orders`;
      
      // If admin is logged in, show all orders, else show only user's orders
      if (loggedInUser.role === "admin") {
        fetchUrl = `http://localhost:3005/orders`; // Fetch all orders
      } else {
        fetchUrl = `http://localhost:3005/orders?userId=${loggedInUser.id}`; // Fetch only the logged-in user's orders
      }

      fetch(fetchUrl)
        .then((response) => response.json())
        .then((data) => {
          setOrders(data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Error fetching orders. Please try again later.");
          setLoading(false);
          console.error("Error fetching orders:", error);
        });
    }
  }, [loggedInUser]);

  return (
    <>
      <Dashboard />
      <div className="order-details">
        {/* Show the logged-in user's name or a generic message */}
    
        {/* Show loading spinner */}
        {loading && <p>Loading orders...</p>}

        {/* Show error message if fetch fails */}
        {error && <p className="error-message">{error}</p>}

        {/* Display orders in separate boxes */}
        {orders.length > 0 ? (
          <div className="orders-container">
            {orders.map((order) => (
              <div key={order.orderId} className="order-box">
                <h2>Order ID: {order.orderId}</h2>
               
                <p><strong>Name</strong> {order.username}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Phone:</strong> {order.phoneNumber}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Booking Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Pickup Date:</strong> {new Date(order.pickupDateTime).toLocaleDateString()}</p>

                {/* Display product details for each order */}
                <div className="cart-items">
                  {order.cartItems.map((item) => {
                    const itemTotal = (item.price * item.quantity).toFixed(2);
                    return (
                      <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} className="product-image" />
                        <div>
                          <h4>{item.name}</h4>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: Rs.{item.price}</p>
                          <p>Total: Rs.{itemTotal}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="order-total">
                  <strong>Total Price:</strong> Rs.{order.totalPrice}
                </p>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p className="empty-orders-message">No orders available</p>
        )}
      </div>
    </>
  );
}

export default OrderDetails;
