import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default to English
  const [errorMessage, setErrorMessage] = useState(""); 

  useEffect(() => {
    // Get previously selected language from localStorage, if any
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
    localStorage.setItem("selectedLanguage", language); // Save the selected language in localStorage
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Get users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user by email and password
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      alert("Login successful!");
      navigate("/home");
    } else {
      setErrorMessage("Wrong email or password. Please try again."); // Set error message
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      
      {/* Language Dropdown */}
      <div>
        <label htmlFor="language">Choose your language: </label>
        <select id="language" value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          {/* Add more languages as needed */}
        </select>
      </div>

      {/* Error message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <button onClick={handleSignup} className="signup-btn">
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default LoginPage;
