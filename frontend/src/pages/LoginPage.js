import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      setRole("judge");
      navigate("/dashboard");
    } else {
      alert("Please enter username and password");
    }
  };

return (
  <div className="landing-page">
    <div className="landing-overlay"></div>

    <div className="landing-card login-match-card">
      <h1>Judge Login</h1>
      <p>Log in to enter hackathon scores</p>

      <div className="login-form">
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

<button onClick={handleLogin}>Login</button>
      </div>
    </div>
  </div>
);
}

export default LoginPage;