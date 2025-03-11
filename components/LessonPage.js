import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LessonPage.css";

const lessonsData = {
  beginner: ["Lesson 1", "Lesson 2", "Lesson 3"],
  intermediate: ["Lesson 4", "Lesson 5", "Lesson 6"],
  advanced: ["Lesson 7", "Lesson 8", "Lesson 9"],
};

function LessonPage() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState("beginner");
  const [unlockedLessons, setUnlockedLessons] = useState(1);

  useEffect(() => {
    const savedLevel = localStorage.getItem("userLevel") || "beginner";
    const savedProgress = parseInt(localStorage.getItem("unlockedLessons"), 10) || 1;
    setSelectedLevel(savedLevel);
    setUnlockedLessons(savedProgress);
  }, []);

  const handleLessonClick = (lessonIndex) => {
    if (lessonIndex < unlockedLessons) {
      navigate(`/lesson/${lessonIndex + 1}`);
    }
  };

  return (
    <div className="lesson-page-container">
      <h2>Choose a Lesson</h2>
      <div className="lesson-buttons">
        {lessonsData[selectedLevel].map((lesson, index) => (
          <button
            key={index}
            className={index < unlockedLessons ? "unlocked" : "locked"}
            onClick={() => handleLessonClick(index)}
            disabled={index >= unlockedLessons}
          >
            {lesson} {index < unlockedLessons ? "✅" : "🔒"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LessonPage;
