import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewProgress.css";

function ViewProgress() {
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [perfectCourse, setPerfectCourse] = useState(""); 
  useEffect(() => {
    const fetchProgressData = () => {
      const allCourses = [
        // First row: intro courses
        "IntroToEnglish",
        "IntroToFrench",
        "IntroToSpanish",
        "IntroToJapanese",
        "IntroToMandarin",
        "IntroToItalian",
        "IntroToGerman",

        // Second row: story-based courses
        "Spanish Fiesta",
        "Lost in Tokyo",
      ];

      const updatedProgress = {};

      allCourses.forEach((course) => {
        let score = 0;
        const storageKey = `highestScore_${course.replace(/\s+/g, "")}`;
        const highestScore = parseInt(localStorage.getItem(storageKey), 10) || 0;
        score = highestScore;

        if (score === 10 && !localStorage.getItem(`congratulated_${course}`)) {
          setShowModal(true);
          setPerfectCourse(course); 
          localStorage.setItem(`congratulated_${course}`, "true"); 
        }

        updatedProgress[course] = score;
      });

      setProgressData(updatedProgress);
    };

    fetchProgressData();

    window.addEventListener("storage", fetchProgressData);
    return () => {
      window.removeEventListener("storage", fetchProgressData);
    };
  }, []);

  const handleBack = () => {
    navigate("/home");
  };

  const handleCourseClick = (courseName) => {
    const routeMap = {
      // First row
      "IntroToEnglish": "/intro-to-english",
      "IntroToFrench": "/intro-to-french",
      "IntroToSpanish": "/intro-to-spanish",
      "IntroToJapanese": "/intro-to-japanese",
      "IntroToMandarin": "/intro-to-mandarin",
      "IntroToItalian": "/intro-to-italian",
      "IntroToGerman": "/intro-to-german",

      // Second row
      "Spanish Fiesta": "/spanish-story",
      "Lost in Tokyo": "/japanese-story",
    };

    const route = routeMap[courseName];
    if (route) {
      navigate(route);
    }
  };

  const introCourses = [
    "IntroToEnglish",
    "IntroToFrench",
    "IntroToSpanish",
    "IntroToJapanese",
    "IntroToMandarin",
    "IntroToItalian",
    "IntroToGerman",
  ];

  const storyCourses = [
    "Spanish Fiesta",
    "Lost in Tokyo",
  ];

  return (
    <div className="view-progress-container">
      <h2>Course Progress</h2>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>🎉 Congratulations!</h3>
            <p>You’ve completed {perfectCourse} with a perfect score of 10/10! 🏆</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      <h3>Intro Courses</h3>
      <div className="courses-container">
        {introCourses.map((course) => {
          const score = progressData[course] || 0;
          const progressPercentage = (score / 10) * 100;
          const completedPerfectly = score === 10;

          return (
            <div
              key={course}
              className="course-container"
              onClick={() => handleCourseClick(course)}
            >
              <h3>
                {course.replace(/([A-Z])/g, ' $1').trim()}
                {completedPerfectly && (
                  <span className="trophy-icon">🏆</span>
                )}
              </h3>
              <div className="progress-info">
                <p><strong>Score:</strong> {score} / 10</p>
                <div className="progress-meter">
                  <div
                    className="progress-bar"
                    style={{ width: `${progressPercentage}%`, backgroundColor: "#4caf50" }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h3>Cultural Adventures</h3>
      <div className="courses-container">
        {storyCourses.map((course) => {
          const score = progressData[course] || 0;
          const progressPercentage = (score / 10) * 100;
          const completedPerfectly = score === 10;

          return (
            <div
              key={course}
              className="course-container"
              onClick={() => handleCourseClick(course)}
            >
              <h3>
                {course.replace(/([A-Z])/g, ' $1').trim()}
                {completedPerfectly && (
                  <span className="trophy-icon">🏆</span>
                )}
              </h3>
              <div className="progress-info">
                <p><strong>Score:</strong> {score} / 10</p>
                <div className="progress-meter">
                  <div
                    className="progress-bar"
                    style={{ width: `${progressPercentage}%`, backgroundColor: "#4caf50" }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="button-container" style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <button className="story-button" onClick={handleBack}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ViewProgress;
