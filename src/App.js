import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Main Pages
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import LessonPage from "./components/LessonPage";
import SettingsPage from "./components/SettingsPage";
import AboutPage from "./components/AboutPage";
import TestYourself from "./components/TestYourself";
import ViewProgress from "./components/ViewProgress";
import Chatbot from "./components/Chatbot";

// Intro Lessons
import IntroToEnglish from "./IntroLessons/IntroEnglish/IntroToEnglish";
import IntroToFrench from "./IntroLessons/IntroFrench/IntroToFrench";
import IntroToSpanish from "./IntroLessons/IntroSpanish/IntroToSpanish";
import IntroToJapanese from "./IntroLessons/IntroJapanese/IntroToJapanese";
import IntroToMandarin from "./IntroLessons/IntroMandarin/IntroToMandarin";
import IntroToItalian from "./IntroLessons/IntroItalian/IntroToItalian";
import IntroToGerman from "./IntroLessons/IntroGerman/IntroToGerman";

// Intermediate Lessons
import IntermediateToEnglish from "./IntermediateLessons/IntermediateEnglish/IntermediateToEnglish";
import IntermediateToFrench from "./IntermediateLessons/IntermediateFrench/IntermediateToFrench";
import IntermediateToGerman from "./IntermediateLessons/IntermediateGerman/IntermediateToGerman";
import IntermediateToItalian from "./IntermediateLessons/IntermediateItalian/IntermediateToItalian";
import IntermediateToJapanese from "./IntermediateLessons/IntermediateJapanese/IntermediateToJapanese";
import IntermediateToMandarin from "./IntermediateLessons/IntermediateMandarin/IntermediateToMandarin";
import IntermediateToSpanish from "./IntermediateLessons/IntermediateSpanish/IntermediateToSpanish";

// Advanced Lessons
import AdvancedToEnglish from "./AdvancedLessons/AdvancedEnglish/AdvancedToEnglish";
import AdvancedToFrench from "./AdvancedLessons/AdvancedFrench/AdvancedToFrench";
import AdvancedToGerman from "./AdvancedLessons/AdvancedGerman/AdvancedToGerman";
//import AdvancedToItalian from "./AdvancedLessons/AdvancedItalian/AdvancedToItalian";
//import AdvancedToJapanese from "./AdvancedLessons/AdvancedJapanese/AdvancedToJapanese";
//import AdvancedToMandarin from "./AdvancedLessons/AdvancedMandarin/AdvancedToMandarin";
//import AdvancedToSpanish from "./AdvancedLessons/AdvancedSpanish/AdvancedToSpanish";



// Adventure Lessons
import SpanishStory from "./AdventureLessons/SpanishFiesta/SpanishStory";
import JapaneseStory from "./AdventureLessons/LostTokyo/JapaneseStory";
import FrenchStory from "./AdventureLessons/ParisianCafe/FrenchStory";

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") || "off";
    document.body.classList.toggle("settings-dark-mode", savedDarkMode === "on");
  }, []);

  return (
    <div>
    <Routes>
      {/* Main */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/viewprogress" element={<ViewProgress />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Lessons */}
      <Route path="/lesson" element={<LessonPage />} />
      <Route path="/test-yourself" element={<TestYourself />} />

      {/* Intro Lessons */}
      <Route path="/intro-to-english" element={<IntroToEnglish />} />
      <Route path="/intro-to-french" element={<IntroToFrench />} />
      <Route path="/intro-to-spanish" element={<IntroToSpanish />} />
      <Route path="/intro-to-japanese" element={<IntroToJapanese />} />
      <Route path="/intro-to-mandarin" element={<IntroToMandarin />} />
      <Route path="/intro-to-italian" element={<IntroToItalian />} />
      <Route path="/intro-to-german" element={<IntroToGerman />} />

      {/* Intermediate Lessons */}
      <Route path="/intermediate-to-english" element={<IntermediateToEnglish />} />
      <Route path="/intermediate-to-french" element={<IntermediateToFrench />} />
      <Route path="/intermediate-to-german" element={<IntermediateToGerman />} />
      <Route path="/intermediate-to-italian" element={<IntermediateToItalian />} />
      <Route path="/intermediate-to-japanese" element={<IntermediateToJapanese />} />
      <Route path="/intermediate-to-mandarin" element={<IntermediateToMandarin />} />
      <Route path="/intermediate-to-spanish" element={<IntermediateToSpanish />} />

      {/* Advanced Lessons */}
      <Route path="/advanced-to-english" element={<AdvancedToEnglish />} />
      <Route path="/advanced-to-french" element={<AdvancedToFrench />} />
      <Route path="/advanced-to-german" element={<AdvancedToGerman />} />
      {/*<Route path="/advanced-to-italian" element={<AdvancedToItalian />} />
      <Route path="/advanced-to-japanese" element={<AdvancedToJapanese />} />
      <Route path="/advanced-to-mandarin" element={<AdvancedToMandarin />} />
      <Route path="/advanced-to-spanish" element={<AdvancedToSpanish />} />
      */}




      {/* Adventure Stories */}
      <Route path="/spanish-story" element={<SpanishStory />} />
      <Route path="/japanese-story" element={<JapaneseStory />} />
      <Route path="/french-story" element={<FrenchStory />} />

    </Routes>
    <div className="chatbot-icon" onClick={toggleChatbot}>
        🗨️
      </div>
      {isChatbotOpen && <Chatbot />}
      </div>
  );
}

export default App;
