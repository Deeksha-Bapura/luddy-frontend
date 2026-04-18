import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageScoresPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    innovation: "",
    technical: "",
    presentation: "",
    impact: "",
  });
  const navigate = useNavigate();

  const fetchSubmissions = () => {
    fetch("http://localhost:5000/submissions")
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch submissions:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this submission?")) return;

    try {
      const response = await fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        alert("Submission deleted!");
        fetchSubmissions();
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (err) {
      alert("Could not connect to server.");
    }
  };

  const handleEditClick = (submission) => {
    setEditingId(submission._id);
    setEditForm({
      innovation: submission.innovation,
      technical: submission.technical,
      presentation: submission.presentation,
      impact: submission.impact,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          innovation: Number(editForm.innovation),
          technical: Number(editForm.technical),
          presentation: Number(editForm.presentation),
          impact: Number(editForm.impact),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Score updated successfully!");
        setEditingId(null);
        fetchSubmissions();
      } else {
        alert(data.error || "Update failed");
      }
    } catch (err) {
      alert("Could not connect to server.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="app">
      <header className="topbar">
        <div className="logo-title">
          <div className="iu-badge">IU</div>
          <h1>Manage Scores</h1>
        </div>
        <div className="nav-right">
          <button className="nav-btn" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      </header>

      <section className="leaderboard-section">
        {submissions.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Judge ID</th>
                <th>Innovation</th>
                <th>Technical</th>
                <th>Presentation</th>
                <th>Impact</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission._id}>
                  <td>{submission.teamName}</td>
                  <td>{submission.judgeId}</td>

                  {editingId === submission._id ? (
                    <>
                      <td>
                        <input
                          type="number"
                          name="innovation"
                          value={editForm.innovation}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="technical"
                          value={editForm.technical}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="presentation"
                          value={editForm.presentation}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="impact"
                          value={editForm.impact}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        {Number(editForm.innovation) +
                          Number(editForm.technical) +
                          Number(editForm.presentation) +
                          Number(editForm.impact)}
                      </td>
                      <td>
                        <button onClick={() => handleUpdate(submission._id)}>Save</button>
                        <button onClick={() => setEditingId(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{submission.innovation}</td>
                      <td>{submission.technical}</td>
                      <td>{submission.presentation}</td>
                      <td>{submission.impact}</td>
                      <td>{submission.totalScore}</td>
                      <td>
                        <button onClick={() => handleEditClick(submission)}>Edit</button>
                        <button onClick={() => handleDelete(submission._id)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default ManageScoresPage;