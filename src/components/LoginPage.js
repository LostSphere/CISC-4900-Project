import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import translations from "../assets/translations.json";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    localStorage.setItem("selectedLanguage", language);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert(`${translations[selectedLanguage]?.welcome || "Welcome back"}, ${user.name}!`);
      navigate("/home");
    } else {
      setErrorMessage(translations[selectedLanguage]?.wrongCredentials || "Wrong email or password. Please try again.");
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h2>{translations[selectedLanguage]?.login || "Login"}</h2>

      <div>
        <label htmlFor="language">{translations[selectedLanguage]?.chooseLanguage || "Choose your preferred language:"}</label>
        <select id="language" value={selectedLanguage} onChange={handleLanguageChange} className="login-select">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="zh">中文</option>
          <option value="ja">日本語</option>
        </select>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          name="email"
          placeholder={translations[selectedLanguage]?.emailPlaceholder || "Email"}
          required
          value={formData.email}
          onChange={handleChange}
        />

        <div className="login-password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder={translations[selectedLanguage]?.passwordPlaceholder || "Password"}
            required
            value={formData.password}
            onChange={handleChange}
          />
          <span
            className="login-show-password-icon"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit" className="login-button">
          {translations[selectedLanguage]?.login || "Login"}
        </button>
      </form>

      <p>
        {translations[selectedLanguage]?.noAccount || "Don't have an account?"}{" "}
        <button onClick={handleSignup} className="signup-btn">
          {translations[selectedLanguage]?.signup || "Sign Up"}
        </button>
      </p>
    </div>
  );
}

export default LoginPage;