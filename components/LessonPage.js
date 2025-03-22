import React from "react";
import { useNavigate } from "react-router-dom";
import "./LessonPage.css";

const Introduction = [
  { name: "Intro to French", image: "/images/IntroLevel/France.jpg" },
  { name: "Intro to Spanish", image: "/images/IntroLevel/Spain.jpg" },
  { name: "Intro to Japanese", image: "/images/IntroLevel/Japan.jpg" },
  { name: "Intro to Mandarin", image: "/images/IntroLevel/China.jpg" },
  { name: "Intro to Italian", image: "/images/IntroLevel/Italy.jpg" },
  { name: "Intro to German", image: "/images/IntroLevel/Germany.jpg" }
];

const adventureLevels = [
  { name: "Lost in Tokyo", language: "Japanese", image: "/images/AdventureLevel/lost_in_Tokyo.jpg" },
  { name: "Parisian Café", language: "French", image: "/images/AdventureLevel/parisian_cafe.jpg" },
  { name: "Spanish Fiesta", language: "Spanish", image: "/images/AdventureLevel/spanish_fiesta.jpg" },
  { name: "Mystery in Beijing", language: "Mandarin", image: "/images/AdventureLevel/mystery_in_beijing.jpg" },
  { name: "Exploring Rome", language: "Italian", image: "/images/AdventureLevel/exploring_Rome.jpg" },
  { name: "German Road Trip", language: "German", image: "/images/AdventureLevel/road_trip.jpg" },
  { name: "Business in Shanghai", language: "Mandarin", image: "/images/AdventureLevel/business_in_shanghai.jpg" },
  { name: "French Literature", language: "French", image: "/images/AdventureLevel/french_literature.jpg" },
  { name: "Debating in Madrid", language: "Spanish", image: "/images/AdventureLevel/debating_Madrid.webp" },
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
      <h1>Choose a Lesson</h1>

      <h3>Introduction Lessons</h3>
      <div className="lesson-scroll-container">
        {Introduction.map((lesson, index) => (
    <div
      key={index}
      className="lesson-card"
      onClick={() => handleLessonClick(lesson)}
    >
      <img src={lesson.image} alt={lesson.name} className="lesson-image" />
      <p className="lesson-name introduction-name">{lesson.name}</p> {/* New Class */}
    </div>
  ))}
</div>


      <h3>Adventure Lessons</h3>
      <div className="lesson-scroll-container">
        {adventureLevels.map((lesson, index) => (
          <div
            key={index}
            className="lesson-card"
            onClick={() => handleLessonClick(lesson)}
          >
            <img src={lesson.image} alt={lesson.name} className="lesson-image" />
            <p className="lesson-name">{lesson.name}</p>
            <p className="lesson-language">{lesson.language}</p>
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
