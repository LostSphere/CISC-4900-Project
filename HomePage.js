// src/components/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; 

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirect back to login page on logout
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Language Learning App!</h1>
      <p>Start learning a new language today.</p>

      <nav>
        <ul>
          <li><a href="/lesson">Start Lesson</a></li>
          <li><a href="/quiz">Take Quiz</a></li>
          <li><a href="/progress">View Progress</a></li>
        </ul>
      </nav>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HomePage;
