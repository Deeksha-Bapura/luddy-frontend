import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage({ setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://luddy-backend.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setRole(data.role);
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      alert("Could not connect to server. Is the backend running?");
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-overlay"></div>

      <div className="landing-card login-match-card">
        <h1>Judge Login</h1>
        <p>Log in to enter hackathon scores</p>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;