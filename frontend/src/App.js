import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import EnterScorePage from "./pages/EnterScorePage";
import ManageScoresPage from "./pages/ManageScoresPage";
import "./App.css";

function App() {
  const [role, setRole] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage setRole={setRole} />} />
        <Route path="/login" element={<LoginPage setRole={setRole} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage role={role} />} />
        <Route
          path="/enter-score"
          element={role === "judge" ? <EnterScorePage /> : <Navigate to="/" />}
        />
        <Route
          path="/manage-scores"
          element={role === "judge" ? <ManageScoresPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;