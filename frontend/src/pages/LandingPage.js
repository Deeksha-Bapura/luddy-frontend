import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage({ setRole }) {
  const navigate = useNavigate();

  const handleViewer = () => {
    setRole("viewer");
    navigate("/dashboard");
  };

  const handleJudge = () => {
    navigate("/register");
  };

  return (
    <div className="landing-page">
      <div className="landing-card">
        <h1>Luddy Hackathon</h1>
        <p>Select your role to continue</p>

        <div className="role-buttons">
          <button className="role-btn viewer-btn" onClick={handleViewer}>
            Viewer
          </button>
          <button className="role-btn judge-btn" onClick={handleJudge}>
            Judge
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;