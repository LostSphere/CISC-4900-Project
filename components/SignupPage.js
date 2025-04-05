import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import translations from "../assets/translations.json";
import "./SignupPage.css";

function SignupPage() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    setSelectedLanguage(savedLanguage);
  }, []);

  const translation = translations[selectedLanguage] || translations["en"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.email === email)) {
      alert(translation.emailInUse);
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    alert(translation.success);
    navigate("/home");
  };

  return (
    <div className="signup-container">
      <h2>{translation.signup || "Sign Up"}</h2>
      <form onSubmit={handleSignup} className="signup-form">
        <input
          type="text"
          name="name"
          placeholder={translation.fullName || "Full Name"}
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder={translation.emailPlaceholder || "Email"}
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder={translation.passwordPlaceholder || "Password"}
          required
          onChange={handleChange}
        />
        <button type="submit" className="signup-button">
          {translation.signup || "Sign Up"}
        </button>
      </form>
      <p>
        {translation.alreadyHaveAccount || "Already have an account?"}{" "}
        <button onClick={() => navigate("/")} className="login-button">
          {translation.login || "Login"}
        </button>
      </p>
    </div>
  );
}

export default SignupPage;
