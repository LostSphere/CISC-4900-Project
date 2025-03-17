import React from "react";
import { useNavigate } from "react-router-dom";
import "./LessonPage.css";

const adventureLevels = [
  { name: "Lost in Tokyo (Japanese)", flag: "🇯🇵" },
  { name: "Parisian Café (French)", flag: "🇫🇷" },
  { name: "Spanish Fiesta", flag: "🇪🇸" },
  { name: "Mystery in Beijing (Mandarin)", flag: "🇨🇳" },
  { name: "Exploring Rome (Italian)", flag: "🇮🇹" },
  { name: "German Road Trip", flag: "🇩🇪" },
  { name: "Business in Shanghai", flag: "🇨🇳" },
  { name: "French Literature", flag: "🇫🇷" },
  { name: "Debating in Madrid", flag: "🇪🇸" },
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
      <h2>Choose an Adventure</h2>
      <div className="lesson-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", justifyContent: "center" }}>
        {adventureLevels.map((lesson, index) => (
          <button
            key={index}
            className="lesson-button"
            style={{
              padding: "20px",
              fontSize: "20px",
              width: "250px",
              height: "80px",
              margin: "10px auto",
            }}
            onClick={() => handleLessonClick(lesson)}
          >
            {lesson.flag} {lesson.name}
          </button>
        ))}
      </div>
      <button className="home-button" onClick={() => navigate("/home")}>
        Back to Home
      </button>
    </div>
  );
}

export default LessonPage;
