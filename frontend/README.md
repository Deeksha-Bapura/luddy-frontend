Luddy Score Stream — Frontend

This is the frontend for the Luddy Score Stream system. It provides a user interface for viewers and judges to interact with the leaderboard, submit scores, and view real-time updates.

Tech Stack

Frontend: React (JavaScript, HTML, CSS)
Routing: React Router
API Communication: Fetch API
Backend: Node.js + Express

Features

Landing page with Viewer and Judge roles
Judge login
Dashboard with leaderboard, stats, and recent updates
Enter Score form for judges
Submission confirmation
Updated dashboard after scoring

User Flow

Viewer:
Landing → Dashboard → View leaderboard and stats

Judge:
Landing → Login → Dashboard → Enter Score → Submit → Confirmation → Dashboard

Backend Connection

Uses API from:
http://localhost:5000

Make sure backend is running before starting frontend.

How to Run

git clone <FRONTEND_REPO_URL>
cd luddy-frontend
npm install
npm start

*App runs at: http://localhost:3000*
