import React from "react";
import { Routes, Route } from "react-router-dom";  // No BrowserRouter here
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import LessonPage from "./components/LessonPage"; // Import Lesson Page

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />  {/* Default login route */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/lesson" element={<LessonPage />} />
    </Routes>
  );
}

export default App;
