import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import translations from "../assets/translations.json";
import "./LessonPage.css";

const Introduction = [
  { name: "Intro to English", image: "/images/IntroLevel/IntroductionLessons/America.jpg", language: "English" },
  { name: "Intro to French", image: "/images/IntroLevel/IntroductionLessons/France.jpg", language: "French" },
  { name: "Intro to Spanish", image: "/images/IntroLevel/IntroductionLessons/Spain.jpg", language: "Spanish" },
  { name: "Intro to Japanese", image: "/images/IntroLevel/IntroductionLessons/Japan.jpg", language: "Japanese" },
  { name: "Intro to Mandarin", image: "/images/IntroLevel/IntroductionLessons/China.jpg", language: "Mandarin" },
  { name: "Intro to Italian", image: "/images/IntroLevel/IntroductionLessons/Italy.jpg", language: "Italian" },
  { name: "Intro to German", image: "/images/IntroLevel/IntroductionLessons/Germany.jpg", language: "German" }
];

const adventureLevels = [
  { name: "Lost in Tokyo", language: "Japanese", image: "/images/AdventureLevel/AdventureLessons/lost_in_Tokyo.jpg" },
  { name: "Parisian Café", language: "French", image: "/images/AdventureLevel/AdventureLessons/parisian_cafe.jpg" },
  { name: "Spanish Fiesta", language: "Spanish", image: "/images/AdventureLevel/AdventureLessons/spanish_fiesta.jpg" },
  { name: "Mystery in Beijing", language: "Mandarin", image: "/images/AdventureLevel/AdventureLessons/mystery_in_beijing.jpg" },
  { name: "Exploring Rome", language: "Italian", image: "/images/AdventureLevel/AdventureLessons/exploring_Rome.jpg" },
  { name: "German Road Trip", language: "German", image: "/images/AdventureLevel/AdventureLessons/road_trip.jpg" },
  { name: "Business in Shanghai", language: "Mandarin", image: "/images/AdventureLevel/AdventureLessons/business_in_shanghai.jpg" },
  { name: "French Literature", language: "French", image: "/images/AdventureLevel/AdventureLessons/french_literature.jpg" },
  { name: "Debating in Madrid", language: "Spanish", image: "/images/AdventureLevel/AdventureLessons/debating_Madrid.webp" },
];

function LessonPage({ language = "en" }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const currentTranslations = translations[language] || translations['en'];

  const handleLessonClick = (lesson) => {
    const routeMap = {
      //Intro Courses
      "Intro to English": "/intro-to-english",
      "Intro to French": "/intro-to-french",
      "Intro to Spanish": "/intro-to-spanish",
      "Intro to Japanese": "/intro-to-japanese",
      "Intro to Mandarin": "/intro-to-mandarin",
      "Intro to Italian": "/intro-to-italian",
      "Intro to German": "/intro-to-german",

      // Cultural Adventures
      "Spanish Fiesta": "/spanish-story",
      "Lost in Tokyo": "/japanese-story",
      "Parisian Café": "/french-story",
    };
    navigate(routeMap[lesson.name] || `/lesson/${lesson.name.replace(/\s+/g, "-").toLowerCase()}`);
  };

  const filteredIntroduction = Introduction.filter(
    (lesson) =>
      lesson.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAdventure = adventureLevels.filter(
    (lesson) =>
      lesson.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="lesson-page-container">
      <div className="lesson-header">
        <h1>{currentTranslations.chooseLesson}</h1>
        <input
          type="text"
          placeholder={currentTranslations.searchLessons || "Search lessons..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="lesson-search-bar"
        />
      </div>

      <h2 className="lesson-section-heading">Introduction</h2>
      <h3>{currentTranslations.introductionLessons}</h3>
      <div className="lesson-scroll-container">
        {filteredIntroduction.length > 0 ? (
          filteredIntroduction.map((lesson, index) => (
            <div
              key={index}
              className="lesson-card"
              onClick={() => handleLessonClick(lesson)}
            >
              <img src={lesson.image} alt={lesson.name} className="lesson-image" />
              <p className="lesson-name">{lesson.name}</p>
            </div>
          ))
        ) : (
          <p>{currentTranslations.noLessonsFound}</p>
        )}
      </div>

      <h2 className="lesson-section-heading">Cultural Adventures</h2>
      <h3>{currentTranslations.adventureLessons}</h3>
      <div className="lesson-scroll-container">
        {filteredAdventure.length > 0 ? (
          filteredAdventure.map((lesson, index) => (
            <div
              key={index}
              className="lesson-card"
              onClick={() => handleLessonClick(lesson)}
            >
              <img src={lesson.image} alt={lesson.name} className="lesson-image" />
              <p className="lesson-name">{lesson.name}</p>
              <p className="lesson-language">{lesson.language}</p>
            </div>
          ))
        ) : (
          <p>{currentTranslations.noLessonsFound}</p>
        )}
      </div>

      <button className="home-button" onClick={() => navigate("/home")}>
        {currentTranslations.backToHome}
      </button>
    </div>
  );
}

export default LessonPage;
