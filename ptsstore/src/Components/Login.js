import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Fetch users from db.json (json-server)
    fetch("http://localhost:3005/users")
      .then((response) => response.json())
      .then((data) => {
        // Find if there's a user with matching email and password
        const user = data.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          // Successful login
          alert("Login successful!");
          // Store user details in localStorage
          localStorage.setItem("loggedInUser", JSON.stringify(user));

          // Redirect based on user role
          if (user.role === "admin") {
            navigate("/dashboard"); // Redirect to admin dashboard
          } else {
            navigate("/"); // Redirect to the main dashboard or user homepage
          }
        } else {
          // Invalid credentials
          setError("Invalid email or password.");
        }
      })
      .catch(() => setError("Error connecting to the server."));
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
