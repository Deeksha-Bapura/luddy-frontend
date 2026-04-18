import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, adminSecret }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please log in.");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      alert("Could not connect to server. Is the backend running?");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Judge Sign Up</h2>
        <form onSubmit={handleRegister}>
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
          <input
            type="password"
            placeholder="Admin Secret Code"
            value={adminSecret}
            onChange={(e) => setAdminSecret(e.target.value)}
          />
        <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Log in here</Link></p>
      </div>
    </div>
  );
}

export default RegisterPage;