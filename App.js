import React from "react";
import { Routes, Route } from "react-router-dom";  
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import LessonPage from "./components/LessonPage"; 
import SettingsPage from "./components/SettingsPage"; 
import SpanishStory from "./spanishStory/SpanishStory";
import TestYourself from "./components/TestYourself";

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
    </Routes>
  );
}

export default App;
