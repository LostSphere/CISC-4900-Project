import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";  
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import LessonPage from "./components/LessonPage"; 
import SettingsPage from "./components/SettingsPage"; 
import AboutPage from './components/AboutPage'; 
import TestYourself from "./components/TestYourself";
import SpanishStory from "./AdventureLessons/spanishStory/SpanishStory";
import IntroToFrench from "./IntroLessons/IntroFrench/IntroToFrench";
import IntroToSpanish from "./IntroLessons/IntroSpanish/IntroToSpanish";
import IntroToJapanese from "./IntroLessons/IntroJapanese/IntroToJapanese";
import IntroToMandarin from "./IntroLessons/IntroMandarin/IntroToMandarin";
import IntroToItalian from "./IntroLessons/IntroItalian/IntroToItalian";
import IntroToGerman from "./IntroLessons/IntroGerman/IntroToGerman";
import "./App.css";

function App() {
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") || "off";
    if (savedDarkMode === "on") {
      document.body.classList.add("settings-dark-mode");
    } else {
      document.body.classList.remove("settings-dark-mode");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} /> 
      <Route path="/home" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/lesson" element={<LessonPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/spanish-story" element={<SpanishStory />} />
      <Route path="/test-yourself" element={<TestYourself />} /> 
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
