import React, { useEffect } from "react";
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

// Adventure Lessons
import SpanishStory from "./AdventureLessons/SpanishFiesta/SpanishStory";
import JapaneseStory from "./AdventureLessons/LostTokyo/JapaneseStory";

// Intro Lessons
import IntroToEnglish from "./IntroLessons/IntroEnglish/IntroToEnglish";
import IntroToFrench from "./IntroLessons/IntroFrench/IntroToFrench";
import IntroToSpanish from "./IntroLessons/IntroSpanish/IntroToSpanish";
import IntroToJapanese from "./IntroLessons/IntroJapanese/IntroToJapanese";
import IntroToMandarin from "./IntroLessons/IntroMandarin/IntroToMandarin";
import IntroToItalian from "./IntroLessons/IntroItalian/IntroToItalian";
import IntroToGerman from "./IntroLessons/IntroGerman/IntroToGerman";

function App() {
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") || "off";
    document.body.classList.toggle("settings-dark-mode", savedDarkMode === "on");
  }, []);

  return (
    <Routes>
      {/* Main */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Lessons */}
      <Route path="/lesson" element={<LessonPage />} />
      <Route path="/test-yourself" element={<TestYourself />} />

      {/* Adventure Stories */}
      <Route path="/spanish-story" element={<SpanishStory />} />
      <Route path="/japanese-story" element={<JapaneseStory />} />

      {/* Intro Lessons */}
      <Route path="/intro-to-english" element={<IntroToEnglish />} />
      <Route path="/intro-to-french" element={<IntroToFrench />} />
      <Route path="/intro-to-spanish" element={<IntroToSpanish />} />
      <Route path="/intro-to-japanese" element={<IntroToJapanese />} />
      <Route path="/intro-to-mandarin" element={<IntroToMandarin />} />
      <Route path="/intro-to-italian" element={<IntroToItalian />} />
      <Route path="/intro-to-german" element={<IntroToGerman />} />
    </Routes>
  );
}

export default App;
