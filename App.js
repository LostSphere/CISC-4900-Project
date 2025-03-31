import React from "react";
import { Routes, Route } from "react-router-dom";  
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import LessonPage from "./components/LessonPage"; 
import SettingsPage from "./components/SettingsPage"; 
import TestYourself from "./components/TestYourself";
import SpanishStory from "./AdventureLessons/spanishStory/SpanishStory";
import IntroToFrench from "./IntroLessons/IntroFrench/IntroToFrench";
import IntroToSpanish from "./IntroLessons/IntroSpanish/IntroToSpanish";
import IntroToJapanese from "./IntroLessons/IntroJapanese/IntroToJapanese";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} /> 
      <Route path="/home" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/lesson" element={<LessonPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/spanish-story" element={<SpanishStory />} />
      <Route path="/test-yourself" element={<TestYourself />} /> 
      <Route path="/intro-to-french" element={<IntroToFrench />} />
      <Route path="/intro-to-spanish" element={<IntroToSpanish />} />
      <Route path="/intro-to-japanese" element={<IntroToJapanese />} />
    </Routes>
  );
}

export default App;
