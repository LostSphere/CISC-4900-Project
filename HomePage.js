import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; 

function HomePage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retrieve the logged-in user's info from local storage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    
    if (loggedInUser && loggedInUser.name) {
      setUserName(loggedInUser.name);
    } else {
      // If no user is found, redirect to login page
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Remove user data on logout
    navigate("/"); // Redirect back to login page
  };

  return (
    <div className="home-container">
      <h1>Hello {userName}!</h1>
      <p>Welcome to the Language Learning App!</p>
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
