import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SettingsPage.css";

function SettingsPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState("off");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [skillLevel, setSkillLevel] = useState("beginner");

  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = JSON.parse(localStorage.getItem("surveyData"));
    if (savedPreferences) {
      setSelectedLanguage(savedPreferences.language || "en");
      setSkillLevel(savedPreferences.skillLevel || "beginner");
    }

    // Load and apply dark mode setting
    const savedDarkMode = localStorage.getItem("darkMode") || "off";
    setDarkMode(savedDarkMode);
    applyDarkMode(savedDarkMode);
  }, []);

  // Function to update dark mode
  const applyDarkMode = (mode) => {
    if (mode === "on") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  // Handles dark mode selection
  const handleDarkModeChange = (e) => {
    const newDarkMode = e.target.value;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    applyDarkMode(newDarkMode);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSkillLevelChange = (e) => {
    setSkillLevel(e.target.value);
  };

  const handleSaveSettings = () => {
    const updatedPreferences = { language: selectedLanguage, skillLevel };
    localStorage.setItem("surveyData", JSON.stringify(updatedPreferences));
    alert("Settings updated successfully!");
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      {/* Dark Mode Selection */}
      <div className="setting-option">
        <label className="setting-label">Dark Mode</label>
        <select value={darkMode} onChange={handleDarkModeChange}>
          <option value="off">Off</option>
          <option value="on">On</option>
        </select>
      </div>

      {/* Language Selection */}
      <div className="setting-option">
        <label className="setting-label">Select Language</label>
        <select value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="zh">Chinese</option>
          <option value="ja">Japanese</option>
        </select>
      </div>

      {/* Skill Level Selection */}
      <div className="setting-option">
        <label className="setting-label">Select Skill Level</label>
        <select value={skillLevel} onChange={handleSkillLevelChange}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <button onClick={handleSaveSettings}>Save Settings</button>
      <button className="back-button" onClick={() => navigate("/home")}>
        Back to Home
      </button>
    </div>
  );
}

export default SettingsPage;
