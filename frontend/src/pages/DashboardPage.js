import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DashboardPage({ role }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!dashboardData) return <div>Failed to load dashboard data.</div>;

  const { summary, topThree, liveStats = {}, recentUpdates, stats, tableData } = dashboardData;

  const podiumOrder = [1, 0, 2];
  const podium = podiumOrder.map((i) => topThree[i]).filter(Boolean);

  return (
    <div className="app">
      <header className="topbar">
        <div className="logo-title">
          <Link to="/" className="logo-link">
            <div className="iu-badge">IU</div>
          </Link>
          <h1>Luddy Hackathon Leaderboard</h1>
        </div>

        <div className="nav-right">
          <span>Teams: {summary.totalTeams}</span>
          <span>Judges: {summary.totalJudges}</span>
          <span>Updated: {summary.lastUpdated ? new Date(summary.lastUpdated).toLocaleTimeString() : "N/A"}</span>

          {role === "judge" && (
            <>
              <Link to="/enter-score" className="nav-btn">Enter Score</Link>
              <Link to="/manage-scores" className="nav-btn">Manage Scores</Link>
            </>
          )}
        </div>
      </header>

      <section className="hero-section">
        <div className="podium-section">
          {podium.length === 0 ? (
            <p>No scores submitted yet.</p>
          ) : (
            podium.map((item) => (
              <div key={item.rank} className={`podium-card rank-${item.rank}`}>
                <div className="avatar-placeholder">{item.rank}</div>
                <h3>{item.teamName}</h3>
                <div className="score-box">{item.totalScore} pts</div>
              </div>
            ))
          )}
        </div>

        <div className="side-panel">
          <div className="updates-card">
            <h2>Live Stats</h2>
            {!liveStats.leadingTeam ? (
              <p>No scores submitted yet.</p>
            ) : (
              <>
                <p>🏆 <strong>Leading Team</strong> — {liveStats.leadingTeam.teamName} ({liveStats.leadingTeam.totalScore} pts)</p>
                <p>📊 <strong>Competitive Gap</strong> — {liveStats.gap === 0 ? "It's a tie at the top!" : `${liveStats.gap} pts between #1 and #2`}</p>
                <p>✅ <strong>Teams Completed</strong> — {liveStats.teamsCompleted} team{liveStats.teamsCompleted !== 1 ? "s" : ""} fully judged</p>
                <p>⏳ <strong>Teams Pending</strong> — {liveStats.teamsPending} team{liveStats.teamsPending !== 1 ? "s" : ""} still being judged</p>
              </>
            )}
          </div>

          <div className="stats-card">
            <div>
              <h3>Mean</h3>
              <p>{stats.mean}</p>
            </div>
            <div>
              <h3>Median</h3>
              <p>{stats.median}</p>
            </div>
            <div>
              <h3>Std.</h3>
              <p>{stats.standardDeviation}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="leaderboard-section">
        <h2>Top Teams</h2>
        {tableData.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team Name</th>
                <th>Total Score</th>
                <th>Average Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((team) => (
                <tr key={team.rank}>
                  <td>{team.rank}</td>
                  <td>{team.teamName}</td>
                  <td>{team.totalScore}</td>
                  <td>{team.averageScore}</td>
                  <td>{team.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;