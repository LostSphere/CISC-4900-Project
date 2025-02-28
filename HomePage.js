import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LessonPage.css";

const lessonsData = {
  Spanish: [
    { title: "Hola y Adiós", meaning: "Hello and Goodbye", content: "Learn how to say 'Hello' and 'Goodbye' in Spanish." },
    { title: "Números", meaning: "Numbers", content: "Learn how to count from 1 to 10 in Spanish." },
    { title: "Frases Comunes", meaning: "Common Phrases", content: "Learn common phrases like 'How are you?' and 'Good morning.'" },
  ],
  French: [
    { title: "Bonjour et Au revoir", meaning: "Hello and Goodbye", content: "Learn how to say 'Hello' and 'Goodbye' in French." },
    { title: "Les Nombres", meaning: "Numbers", content: "Learn how to count from 1 to 10 in French." },
    { title: "Phrases Courantes", meaning: "Common Phrases", content: "Learn common phrases like 'How are you?' and 'Good morning.'" },
  ],
};

function LessonPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [lessonIndex, setLessonIndex] = useState(0);
  const navigate = useNavigate();

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setLessonIndex(0);
  };

  const handleNextLesson = () => {
    if (lessonIndex < lessonsData[selectedLanguage].length - 1) {
      setLessonIndex(lessonIndex + 1);
    } else {
      alert("You've completed all the lessons!");
    }
  };

  const handlePreviousLesson = () => {
    if (lessonIndex > 0) {
      setLessonIndex(lessonIndex - 1);
    }
  };

  const playSound = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = selectedLanguage === "Spanish" ? "es-ES" : "fr-FR";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="lesson-container">
      <h1>Choose a Language</h1>

      <div className="language-select">
        <select value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="">--Select Language--</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>
      </div>

      {selectedLanguage && (
        <div className="lesson-card">
          <h2>{lessonsData[selectedLanguage][lessonIndex].title}</h2>
          <p className="lesson-meaning">({lessonsData[selectedLanguage][lessonIndex].meaning})</p>
          <p>{lessonsData[selectedLanguage][lessonIndex].content}</p>
          
          {/* Button Container for Proper Spacing */}
          <div className="lesson-buttons">
            <button onClick={() => playSound(lessonsData[selectedLanguage][lessonIndex].title)}>🔊 Play Sound</button>
            <button onClick={handlePreviousLesson} disabled={lessonIndex === 0}>⬅ Previous Lesson</button>
            <button onClick={handleNextLesson}>➡ Next Lesson</button>
          </div>
        </div>
      )}

      <button className="back-btn" onClick={() => navigate("/home")}>
        Back to Home
      </button>
    </div>
  );
}

export default LessonPage;
