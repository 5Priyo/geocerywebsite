import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Import logout icon
import "../CSS/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Retrieve logged-in user details from localStorage
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="welcome-message">
          {loggedInUser && loggedInUser.role === "admin" && (
            <h2>
              Welcome, Admin! {loggedInUser.name}
            </h2>
          )}
        </div>
        <div className="admin-profile">
          <img
            src="/login.png" // Replace with your admin icon path
            alt="Admin Icon"
            className="admin-icon"
          />
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className="logout-icon"
            title="Logout"
            onClick={handleLogout}
          /> Logout
        </div>
      </header>

      {/* Sidebar Section */}
      <aside className="sidebar">
        <div className="dashboardnav">
          <Link to="/">
            <img
              src="/logodashboard.png"
              alt="PTS Grocery Store"
              className="contact-image"
              style={{ width: "100px", height: "100px" }}
            />
          </Link>
        </div>
        <div className="menudashboard">
        <ul>
          <li>
            <Link to="/all-products" className="activeMenus">All Products</Link>
          </li>
          <li>
            <Link to="/manage-users" className="activeMenus">Manage Users</Link>
          </li>
          <li>
            <Link to="/orderdetails" className="activeMenus">Order Details</Link>
          </li>
          
        </ul>
        </div>
      </aside>
    </div>
  );
}

export default Dashboard;
