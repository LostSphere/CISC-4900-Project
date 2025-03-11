import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SurveyPage.css";

function SurveyPage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("");
  const [skillLevel, setSkillLevel] = useState("");

  useEffect(() => {
    const surveyCompleted = localStorage.getItem("surveyCompleted");
    if (surveyCompleted) {
      navigate("/home"); // Redirect if survey was already completed
    }
  }, [navigate]);

  const handleSubmit = () => {
    if (!language || !skillLevel) {
      alert("Please select both a language and a skill level.");
      return;
    }

    localStorage.setItem("selectedLanguage", language);
    localStorage.setItem("selectedSkillLevel", skillLevel);
    localStorage.setItem("surveyCompleted", "true"); // Mark survey as completed
    navigate("/home");
  };

  const handleSkip = () => {
    localStorage.setItem("surveyCompleted", "true"); // Mark survey as completed even if skipped
    navigate("/home");
  };

  return (
    <div className="survey-container">
      <div className="survey-form">
        <h1 className="survey-title">Personalize Your Learning</h1>
        <p className="survey-subtitle">Tell us about your preferences so we can tailor your lessons.</p>

        <label className="survey-label">Choose a Language:</label>
        <select className="survey-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">Select a language</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="Japanese">Japanese</option>
          <option value="Chinese">Chinese</option>
        </select>

        <label className="survey-label">Select Your Skill Level:</label>
        <select className="survey-select" value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)}>
          <option value="">Select a skill level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <button className="survey-button" onClick={handleSubmit}>Continue</button>
        <button className="survey-button skip" onClick={handleSkip}>Skip for Now</button>
      </div>
    </div>
  );
}

export default SurveyPage;
