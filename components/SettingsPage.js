import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import translations from "../assets/translations.json";
import "./SettingsPage.css";

function SettingsPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState("off");
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "en"
  );
  const [selectedProfileImage, setSelectedProfileImage] = useState(
    localStorage.getItem("profileImage") || ""
  );

  const profileImageOptions = [
    { image: "/images/profileImages/Pig.jpg", emoji: "🐖", name: "Pig" },
    { image: "/images/profileImages/hippo.jpg", emoji: "🦛", name: "Hippo" },
    { image: "/images/profileImages/monkey.jpg", emoji: "🐒", name: "Monkey" },
    { image: "/images/profileImages/cat.jpg", emoji: "🐱", name: "Cat" },
    { image: "/images/profileImages/dog.jpg", emoji: "🐶", name: "Dog" },
    { image: "/images/profileImages/penguin.jpg", emoji: "🐧", name: "Penguin" },
    { image: "/images/profileImages/panda.jpg", emoji: "🐼", name: "Panda" },
    { image: "/images/profileImages/bird.jpg", emoji: "🐦", name: "Bird" }
  ];

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") || "off";
    setDarkMode(savedDarkMode);
    applyDarkMode(savedDarkMode);
  }, []);

  const applyDarkMode = (mode) => {
    document.body.classList.toggle("settings-dark-mode", mode === "on");
  };

  const handleDarkModeChange = (e) => {
    const newDarkMode = e.target.value;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    applyDarkMode(newDarkMode);
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    localStorage.setItem("selectedLanguage", newLanguage);
    window.location.reload();
  };

  const handleProfileImageChange = (e) => {
    const selectedImage = e.target.value;
    setSelectedProfileImage(selectedImage);
    localStorage.setItem("profileImage", selectedImage);
  };

  const t = translations[selectedLanguage] || translations["en"];

  return (
    <div className="settings-container">
      <div className="settings-box">
        <h1>{t.settings}</h1>

        <div className="setting-option">
          <label className="setting-label">{t.darkMode}</label>
          <select
            value={darkMode}
            onChange={handleDarkModeChange}
            aria-label="Select dark mode"
          >
            <option value="off">{t.off}</option>
            <option value="on">{t.on}</option>
          </select>
        </div>

        <div className="setting-option">
          <label className="setting-label">{t.selectLanguage}</label>
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            aria-label="Select language"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
          </select>
        </div>

        <div className="setting-option">
          <label className="setting-label">{t.selectProfilePicture}</label>
          <select
            value={selectedProfileImage}
            onChange={handleProfileImageChange}
            aria-label="Select profile image"
          >
            {profileImageOptions.map((option, index) => (
              <option key={index} value={option.image}>
                {option.name} {option.emoji}
              </option>
            ))}
          </select>
        </div>

        <div className="setting-buttons">
          <button className="settings-button" onClick={() => navigate("/home")}>
            {t.home || "Home"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
