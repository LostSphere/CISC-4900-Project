import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => {
  const navigate = useNavigate();

  const goBackToHome = () => {
    navigate('/home'); 
  };

  return (
    <div className="about-page">
      <div className="about-content">
        <h1>About the App</h1>
        
        <p>The goal is to provide a user-friendly, engaging platform for people to begin learning a new language, focusing on accessibility and flexibility. The application customizes the experience based on user choices, ability levels, and learning tempo, ensuring that each learner has a successful and pleasurable learning experience.</p>
        
        <h2>Features</h2>
          <li>Interactive lessons</li>
          <li>Grammar and vocabulary quizzes</li>
          <li>Progress tracking</li>
          <li>Multiple levels of difficulty</li>
        
        <h2>How It Works</h2>
        <p>Choose a language, select a level, and start learning! Complete lessons, track your progress, and review your answers through interactive quizzes.</p>

        <h2>Meet the Team</h2>
        <p>Developed by WeiCheng Zhu.</p>
        <button className="go-back-button" onClick={goBackToHome}>Go Back to Home</button>
      </div>
    </div>
  );
};

export default AboutPage;
