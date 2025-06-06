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

const Intermediate = [
  { name: "Intermediate English", image: "/images/IntermediateLessons/IntermediateLevel/English.jpg", language: "English" },
  { name: "Intermediate French", image: "/images/IntermediateLessons/IntermediateLevel/French.jpg", language: "French" },
  { name: "Intermediate Spanish", image: "/images/IntermediateLessons/IntermediateLevel/Spanish.jpg", language: "Spanish" },
  { name: "Intermediate Japanese", image: "/images/IntermediateLessons/IntermediateLevel/Japanese.jpg", language: "Japanese" },
  { name: "Intermediate Mandarin", image: "/images/IntermediateLessons/IntermediateLevel/Mandarin.jpg", language: "Mandarin" },
  { name: "Intermediate Italian", image: "/images/IntermediateLessons/IntermediateLevel/Italian.jpg", language: "Italian" },
  { name: "Intermediate German", image: "/images/IntermediateLessons/IntermediateLevel/German.jpg", language: "German" }
];

const Advanced = [
  { name: "Advanced English", image: "/images/AdvancedLessons/AdvancedLevel/English.jpg", language: "English" },
  { name: "Advanced French", image: "/images/AdvancedLessons/AdvancedLevel/French.jpg", language: "French" },
  { name: "Advanced Spanish", image: "/images/AdvancedLessons/AdvancedLevel/Spanish.jpg", language: "Spanish" },
  { name: "Advanced Japanese", image: "/images/AdvancedLessons/AdvancedLevel/Japanese.jpg", language: "Japanese" },
  { name: "Advanced Mandarin", image: "/images/AdvancedLessons/AdvancedLevel/Mandarin.jpg", language: "Mandarin" },
  { name: "Advanced Italian", image: "/images/AdvancedLessons/AdvancedLevel/Italian.jpg", language: "Italian" },
  { name: "Advanced German", image: "/images/AdvancedLessons/AdvancedLevel/German.jpg", language: "German" }
];

const adventureLevels = [
  { name: "Lost in Tokyo", image: "/images/AdventureLevel/AdventureLessons/lost_in_Tokyo.jpg", language: "Japanese" },
  { name: "Parisian Café", image: "/images/AdventureLevel/AdventureLessons/parisian_cafe.jpg", language: "French" },
  { name: "Spanish Fiesta", image: "/images/AdventureLevel/AdventureLessons/spanish_fiesta.jpg", language: "Spanish" },
  { name: "Mystery in Beijing", image: "/images/AdventureLevel/AdventureLessons/mystery_in_beijing.jpg", language: "Mandarin" },
  { name: "Exploring Rome", image: "/images/AdventureLevel/AdventureLessons/exploring_Rome.jpg", language: "Italian" },
  { name: "German Road Trip", image: "/images/AdventureLevel/AdventureLessons/road_trip.jpg", language: "German" },
  { name: "Business in Shanghai", image: "/images/AdventureLevel/AdventureLessons/business_in_shanghai.jpg", language: "Mandarin" },
  { name: "French Literature", image: "/images/AdventureLevel/AdventureLessons/french_literature.jpg", language: "French" },
  { name: "Debating in Madrid", image: "/images/AdventureLevel/AdventureLessons/debating_Madrid.webp", language: "Spanish" }
];

// LessonSection component
const LessonSection = ({ title, subTitle, filteredLessons, noLessonsText, handleLessonClick }) => (
  <div>
    <h2 className="lesson-section-heading">{title}</h2>
    <h3>{subTitle}</h3>
    <div className="lesson-scroll-container">
      {filteredLessons.length > 0 ? (
        filteredLessons.map((lesson, index) => (
          <div
            key={index}
            className="lesson-card"
            onClick={() => handleLessonClick(lesson)}
          >
            <img src={lesson.image} alt={lesson.name} className="lesson-image" />
            <p className="lesson-name">{lesson.name}</p>
            {lesson.language && <p className="lesson-language">{lesson.language}</p>}
          </div>
        ))
      ) : (
        <p>{noLessonsText}</p>
      )}
    </div>
  </div>
);

function LessonPage({ language = "en" }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const currentTranslations = translations[language] || translations["en"];

  const handleLessonClick = (lesson) => {
    const routeMap = {
      // Intro Courses
      "Intro to English": "/intro-to-english",
      "Intro to French": "/intro-to-french",
      "Intro to Spanish": "/intro-to-spanish",
      "Intro to Japanese": "/intro-to-japanese",
      "Intro to Mandarin": "/intro-to-mandarin",
      "Intro to Italian": "/intro-to-italian",
      "Intro to German": "/intro-to-german",

      // Intermediate Courses
      "Intermediate English": "/intermediate-to-english",
      "Intermediate French": "/intermediate-to-french",
      "Intermediate German": "/intermediate-to-german",
      "Intermediate Italian": "/intermediate-to-italian",
      "Intermediate Japanese": "/intermediate-to-japanese",
      "Intermediate Mandarin": "/intermediate-to-mandarin",
      "Intermediate Spanish": "/intermediate-to-spanish",

      // Advanced Courses
      "Advanced English": "/advanced-to-english",
      "Advanced French": "/advanced-to-french",
      "Advanced German": "/advanced-to-german",
      "Advanced Italian": "/advanced-to-Italian",
      "Advanced Japanese": "/advanced-to-japanese",
      "Advanced Mandarin": "/advanced-to-mandarin",
      "Advanced Spanish": "/advanced-to-spanish",


      // Cultural Adventures
      "Spanish Fiesta": "/spanish-story",
      "Lost in Tokyo": "/japanese-story",
      "Parisian Café": "/french-story",
      "Mystery in Beijing": "/mandarin-story",
      "Exploring Rome": "/italian-story",
      "German Road Trip": "/german-story",
      "French Literature": "/literature-story",
      "Debating in Madrid": "/debating-story",
      "Business in Shanghai": "/business-story",
    };
    navigate(routeMap[lesson.name] || `/lesson/${lesson.name.replace(/\s+/g, "-").toLowerCase()}`);
  };

  const filteredIntroduction = Introduction.filter(
    (lesson) =>
      lesson.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredIntermediate = Intermediate.filter(
    (lesson) =>
      lesson.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAdvanced = Advanced.filter(
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

      <LessonSection
        title="Introduction"
        subTitle={currentTranslations.introductionLessons}
        filteredLessons={filteredIntroduction}
        noLessonsText={currentTranslations.noLessonsFound}
        handleLessonClick={handleLessonClick}
      />

      <LessonSection
        title="Intermediate"
        subTitle={currentTranslations.introductionLessons}
        filteredLessons={filteredIntermediate}
        noLessonsText={currentTranslations.noLessonsFound}
        handleLessonClick={handleLessonClick}
      />

      <LessonSection
        title="Advanced"
        subTitle={currentTranslations.advancedLessons}
        filteredLessons={filteredAdvanced}
        noLessonsText={currentTranslations.noLessonsFound}
        handleLessonClick={handleLessonClick}
      />

      <LessonSection
        title="Cultural Adventures"
        subTitle={currentTranslations.adventureLessons}
        filteredLessons={filteredAdventure}
        noLessonsText={currentTranslations.noLessonsFound}
        handleLessonClick={handleLessonClick}
      />

      <button className="home-button" onClick={() => navigate("/home")}>
        {currentTranslations.backToHome}
      </button>
    </div>
  );
}

export default LessonPage;
