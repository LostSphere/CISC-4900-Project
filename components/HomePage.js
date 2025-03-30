import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import translations from "../assets/translations.json"; 
import "./HomePage.css"; 

function HomePage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    
    if (loggedInUser && loggedInUser.name) {
      setUserName(loggedInUser.name);
    } else {
      navigate("/");
    }

    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    setSelectedLanguage(savedLanguage);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="home-container">
      <h1>{translations[selectedLanguage]?.hello || "Hello"} {userName}!</h1>
      <p>{translations[selectedLanguage]?.welcome || "Welcome to the Language Learning App!"}</p>
      <p>{translations[selectedLanguage]?.startLearning || "Start learning a new language today."}</p>

      <nav>
        <ul>
          <li><Link to="/lesson">{translations[selectedLanguage]?.startLesson || "Start Lesson"}</Link></li>
          <li><Link to="/test-yourself">{translations[selectedLanguage]?.testYourself || "Test Yourself"}</Link></li>
          <li><a href="/progress">{translations[selectedLanguage]?.viewProgress || "View Progress"}</a></li>
          <li><Link to="/settings">{translations[selectedLanguage]?.settings || "Settings"}</Link></li>
        </ul>
      </nav>

      <button onClick={handleLogout}>
        {translations[selectedLanguage]?.logout || "Logout"}
      </button>
    </div>
  );
}

export default HomePage;
