import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import translations from "../assets/translations.json";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [profileImage, setProfileImage] = useState("/images/profileImages/Pig.jpg"); 

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser && loggedInUser.name) {
      setUserName(loggedInUser.name);
    } else {
      navigate("/");
    }

    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    setSelectedLanguage(savedLanguage);

    const savedProfileImage = localStorage.getItem("profileImage");
    if (savedProfileImage) {
      setProfileImage(savedProfileImage); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="homepage-wrapper">
      <div className="homepage-container">
        <div className="profile-section">
          <Link to="/settings" className="profile-image">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="profile-img"
                onError={() => setProfileImage("/images/profileImages/Pig.jpg")} 
              />
            ) : (
              <div className="profile-initials">
                {userName?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
          </Link>
        </div>

        <h1 className="homepage-header">
          {translations[selectedLanguage]?.hello || "Hello"} {userName}!
        </h1>
        <p className="homepage-paragraph">
          {translations[selectedLanguage]?.welcome ||
            "Welcome to the Language Learning App!"}
        </p>
        <p className="homepage-paragraph">
          {translations[selectedLanguage]?.startLearning ||
            "Start learning a new language today."}
        </p>

        <nav className="homepage-nav">
          <ul>
            <li>
              <Link to="/lesson">
                {translations[selectedLanguage]?.startLesson || "Start Lesson"}
              </Link>
            </li>
            <li>
              <Link to="/test-yourself">
                {translations[selectedLanguage]?.testYourself || "Test Yourself"}
              </Link>
            </li>
            <li>
              <a href="/progress">
                {translations[selectedLanguage]?.viewProgress || "View Progress"}
              </a>
            </li>
            <li>
              <Link to="/settings">
                {translations[selectedLanguage]?.settings || "Settings"}
              </Link>
            </li>
          </ul>
        </nav>

        <button className="home-logout-button" onClick={handleLogout}>
          {translations[selectedLanguage]?.logout || "Logout"}
        </button>
      </div>
    </div>
  );
}

export default HomePage;
