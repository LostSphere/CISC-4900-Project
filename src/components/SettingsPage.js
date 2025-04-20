import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import translations from "../assets/translations.json";
import "./SettingsPage.css";

function SettingsPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState("off");
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("selectedLanguage") || "en");
  const [selectedProfileImage, setSelectedProfileImage] = useState(localStorage.getItem("profileImage") || "");
  const [passwordMessageColor, setPasswordMessageColor] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

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
    if (mode === "on") {
      document.body.classList.add("settings-dark-mode");
    } else {
      document.body.classList.remove("settings-dark-mode");
    }
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

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = () => {
    if (oldPassword && newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        changePassword(oldPassword, newPassword);
      } else {
        setPasswordMessage("New password and confirmation do not match.");
        setPasswordMessageColor("red");
      }
    } else {
      setPasswordMessage("Please fill out all fields.");
      setPasswordMessageColor("red");
    }
  };

  const changePassword = (oldPassword, newPassword) => {
    if (oldPassword && newPassword) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      const userIndex = users.findIndex(user => user.email === loggedInUser.email && user.password === oldPassword);
  
      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));
        loggedInUser.password = newPassword;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  
        setPasswordMessage("Password changed successfully! Redirecting to the login page");
        setPasswordMessageColor("green");
  
        setTimeout(() => {
          navigate("/"); 
        }, 3500);
  
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordMessage("Old password does not match.");
        setPasswordMessageColor("red");
      }
    }
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

        {showPasswordChange && (
          <div className="setting-option password-change-section">
            <label className="setting-label">{t.changePassword}</label>
            <div className="password-fields">
              <div className="login-password-container">
                <input
                  type={showOldPassword ? "text" : "password"}
                  name="oldPassword"
                  placeholder={t.oldPassword || "Old Password"}
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="password-input"
                />
                <span
                  className="login-show-password-icon"
                  onClick={toggleOldPasswordVisibility}
                >
                  {showOldPassword ? "🙈" : "👁️"}
                </span>
              </div>

              <div className="login-password-container">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder={t.newPassword || "New Password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="password-input"
                />
                <span
                  className="login-show-password-icon"
                  onClick={toggleNewPasswordVisibility}
                >
                  {showNewPassword ? "🙈" : "👁️"}
                </span>
              </div>

              <div className="login-password-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder={t.confirmPassword || "Confirm New Password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="password-input"
                />
                <span
                  className="login-show-password-icon"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </span>
              </div>

              <div className="password-button-wrapper">
                <button
                  className="change-password-button"
                  onClick={handlePasswordChange}
                >
                  {t.savePassword || "Change Password"}
                </button>
              </div>
              <p style={{ color: passwordMessageColor }}>{passwordMessage}</p>
            </div>
          </div>
        )}

        <div className="setting-buttons">
          <button className="settings-button" onClick={() => navigate("/home")}>
            {t.backToHome || "Home"}
          </button>

          {!showPasswordChange && (
            <button
              className="settings-button"
              onClick={() => setShowPasswordChange(true)}
            >
              {t.changePassword}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
