import React from "react";
import { useNavigate } from "react-router-dom";
import luddyBg from "../assests/luddy.webp";

function LandingPage({ setRole }) {
  const navigate = useNavigate();

  const handleViewer = () => {
    setRole("viewer");
    navigate("/dashboard");
  };

  const handleJudge = () => {
    navigate("/login");
  };

  return (
    <div
      className="landing-page"
      style={{ backgroundImage: `url(${luddyBg})` }}
    >
      <div className="landing-overlay"></div>

      <div className="landing-card">
        <h1>Luddy Hackathon</h1>
        <p>Are you here to explore or judge?</p>

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