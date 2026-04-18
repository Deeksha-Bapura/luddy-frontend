import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EnterScorePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    teamName: "",
    judgeId: "",
    innovation: "",
    technical: "",
    impact: "",
    presentation: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName: formData.teamName,
          judgeId: formData.judgeId,
          innovation: Number(formData.innovation),
          technical: Number(formData.technical),
          presentation: Number(formData.presentation),
          impact: Number(formData.impact),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Score submitted successfully!");
        navigate("/dashboard");
      } else {
        alert(data.error || "Submission failed");
      }
    } catch (err) {
      alert("Could not connect to server. Is the backend running?");
    }
  };

  return (
    <div className="score-page">
      <div className="score-card">
        <h2>Enter Team Score</h2>
        <form onSubmit={handleSubmit} className="score-form">
          <input
            type="text"
            name="teamName"
            placeholder="Team Name"
            value={formData.teamName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="judgeId"
            placeholder="Judge ID"
            value={formData.judgeId}
            onChange={handleChange}
          />
          <input
            type="number"
            name="innovation"
            placeholder="Innovation and Creativity"
            value={formData.innovation}
            onChange={handleChange}
          />
          <input
            type="number"
            name="technical"
            placeholder="Technical Feasibility and Execution"
            value={formData.technical}
            onChange={handleChange}
          />
          <input
            type="number"
            name="impact"
            placeholder="Impact and Viability"
            value={formData.impact}
            onChange={handleChange}
          />
          <input
            type="number"
            name="presentation"
            placeholder="Presentation and Communication"
            value={formData.presentation}
            onChange={handleChange}
          />
          <button type="submit">Submit Score</button>
        </form>
      </div>
    </div>
  );
}

export default EnterScorePage;