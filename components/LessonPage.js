import React from "react";
import { useNavigate } from "react-router-dom";
import "./LessonPage.css";

const adventureLevels = [
  { name: "Lost in Tokyo", language: "Japanese", image: "/images/tokyo.jpg" },
  { name: "Parisian Café", language: "French", image: "/images/paris.jpg" },
  { name: "Spanish Fiesta", language: "Spanish", image: "/images/spanish.jpg" },
  { name: "Mystery in Beijing", language: "Mandarin", image: "/images/beijing.jpg" },
  { name: "Exploring Rome", language: "Italian", image: "/images/rome.jpg" },
  { name: "German Road Trip", language: "German", image: "/images/germany.jpg" },
  { name: "Business in Shanghai", language: "Mandarin", image: "/images/shanghai.jpg" },
  { name: "French Literature", language: "French", image: "/images/french-lit.jpg" },
  { name: "Debating in Madrid", language: "Spanish", image: "/images/madrid.jpg" },
];

function LessonPage() {
  const navigate = useNavigate();

  const handleLessonClick = (lesson) => {
    if (lesson.name === "Spanish Fiesta") {
      navigate("/spanish-story");
    } else {
      navigate(`/lesson/${lesson.name.replace(/\s+/g, "-").toLowerCase()}`);
    }
  };

  return (
    <div className="lesson-page-container">
      <h2>Choose a Lesson</h2>
      <div className="lesson-scroll-container">
        {adventureLevels.map((lesson, index) => (
          <div 
            key={index} 
            className="lesson-card" 
            onClick={() => handleLessonClick(lesson)}
          >
            <img src={lesson.image} alt={lesson.name} className="lesson-image" />
            <p className="lesson-name">{lesson.name}</p>
            <p className="lesson-language">{lesson.language}</p> {/* Language Text */}
          </div>
        ))}
      </div>
      <button className="home-button" onClick={() => navigate("/home")}>
        Back to Home
      </button>
    </div>
  );
}

export default LessonPage;
