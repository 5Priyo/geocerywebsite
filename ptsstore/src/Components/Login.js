import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import authentication context
import "../CSS/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUserRole } = useAuth(); // Use AuthContext to set role

  const handleLogin = () => {
    fetch("http://localhost:3005/users")
      .then((response) => response.json())
      .then((data) => {
        const user = data.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          alert("Login successful!");
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          setUserRole(user.role); // Update role in context

          // Redirect based on user role
          user.role === "admin" ? navigate("/dashboard") : navigate("/");
        } else {
          setError("Invalid email or password.");
        }
      })
      .catch(() => setError("Error connecting to the server."));
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="error-message">{error}</div>}
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
