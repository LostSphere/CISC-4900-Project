import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewProgress.css";

function ViewProgress() {
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState({});

  useEffect(() => {
    const fetchProgressData = () => {
      const courses = [
        "IntroToEnglish",
        "IntroToFrench",
        "IntroToSpanish",
        "IntroToJapanese",
        "IntroToMandarin",
        "IntroToItalian",
        "IntroToGerman",
      ];

      const updatedProgress = {};

      courses.forEach((course) => {
        let score = 0;

        if (course === "IntroToEnglish") {
          // Get the score for English (or other courses)
          const finalScore = parseInt(localStorage.getItem("finalScore_English"), 10) || 0;
          score = finalScore;
        } else {
          // For other courses, get the current score and compare it with the highest score
          const storageKey = `quizProgress_${course}`;
          const savedProgress = JSON.parse(localStorage.getItem(storageKey)) || { score: 0 };
          const currentCourseScore = savedProgress.score;

          // Get the highest score for this course from localStorage
          const highestScore = parseInt(localStorage.getItem(`highestScore_${course}`), 10) || 0;

          // If the current score is higher than the stored highest score, update it
          if (currentCourseScore > highestScore) {
            localStorage.setItem(`highestScore_${course}`, currentCourseScore);
            score = currentCourseScore;
          } else {
            score = highestScore;
          }
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
      "IntroToEnglish": "/intro-to-english",
      "IntroToFrench": "/intro-to-french",
      "IntroToSpanish": "/intro-to-spanish",
      "IntroToJapanese": "/intro-to-japanese",
      "IntroToMandarin": "/intro-to-mandarin",
      "IntroToItalian": "/intro-to-italian",
      "IntroToGerman": "/intro-to-german",
    };

    const route = routeMap[courseName];
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="view-progress-container">
      <h2>Course Progress</h2>
      <div className="courses-container">
        {Object.keys(progressData).map((course) => {
          const score = progressData[course];
          const progressPercentage = (score / 10) * 100;

          return (
            <div
              key={course}
              className="course-container"
              onClick={() => handleCourseClick(course)}
            >
              <h3>{course.replace(/([A-Z])/g, ' $1').trim()}</h3>
              <div className="progress-info">
                <p><strong>Score:</strong> {score} / 10</p>
                <div className="progress-meter">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${progressPercentage}%`,
                      backgroundColor: score === 10 ? "#28a745" : "#007bff",
                    }}
                  ></div>
                </div>
                <p>{score === 10 ? "Completed!" : `Progress: ${progressPercentage}%`}</p>
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
