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

  const t = translations[selectedLanguage] || translations["en"];

  return (
    <div className="settings-container">
      <div className="settings-box">
        <h1>{t.settings}</h1>

        <div className="setting-option">
          <label className="setting-label">{t.darkMode}</label>
          <select value={darkMode} onChange={handleDarkModeChange}>
            <option value="off">{t.off}</option>
            <option value="on">{t.on}</option>
          </select>
        </div>

        <div className="setting-option">
          <label className="setting-label">{t.selectLanguage}</label>
          <select value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
          </select>
        </div>

        <button className="settings-button" onClick={() => navigate("/home")}>
          Home
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
