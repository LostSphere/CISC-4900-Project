import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LessonPage.css";

const lessonsData = {
  Spanish: {
    Basics: [
      { title: "Hola y Adiós", content: "Learn how to say 'Hello' and 'Goodbye' in Spanish." },
      { title: "Números", content: "Learn how to count from 1 to 10 in Spanish." },
    ],
    Intermediate: [
      { title: "Frases Comunes", content: "Learn common phrases like 'How are you?' and 'Good morning.'" },
      { title: "Verbos Básicos", content: "Learn basic verbs like 'to be' and 'to have' in Spanish." },
    ],
    Advanced: [
      { title: "Tiempos Verbales", content: "Learn about verb tenses like past, present, and future." },
      { title: "Frases Complejas", content: "Learn complex sentences for more fluent conversations." },
    ],
  },
  // Add other languages and topics here
};

function LessonPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [lessonIndex, setLessonIndex] = useState(0); // Track the current lesson
  const [completedLessons, setCompletedLessons] = useState([]); // Track completed lessons
  const navigate = useNavigate();

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setSelectedTopic(""); // Reset topic selection when language changes
    setLessonIndex(0);
    setCompletedLessons([]);
  };

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
    setLessonIndex(0); // Reset lesson index when topic changes
  };

  const handleNextLesson = () => {
    const lessons = lessonsData[selectedLanguage][selectedTopic];
    if (lessonIndex < lessons.length - 1) {
      setLessonIndex(lessonIndex + 1);
    } else {
      alert("You've completed all the lessons in this topic!");
    }
  };

  const handleCompleteLesson = () => {
    const lesson = `${selectedLanguage}-${selectedTopic}-${lessonIndex}`;
    if (!completedLessons.includes(lesson)) {
      setCompletedLessons([...completedLessons, lesson]);
    }
    handleNextLesson();
  };

  return (
    <div className="lesson-container">
      <h1>Choose a Language and Topic</h1>

      <div className="language-select">
        <label>Select a language:</label>
        <select value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="">--Select Language--</option>
          <option value="Spanish">Spanish</option>
          {/* Add more languages here */}
        </select>
      </div>

      {selectedLanguage && (
        <div className="topic-select">
          <label>Select a topic:</label>
          <select value={selectedTopic} onChange={handleTopicChange}>
            <option value="">--Select Topic--</option>
            {Object.keys(lessonsData[selectedLanguage]).map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedLanguage && selectedTopic && (
        <div className="lesson-card">
          <h2>
            {lessonsData[selectedLanguage][selectedTopic][lessonIndex].title}
          </h2>
          <p>
            {lessonsData[selectedLanguage][selectedTopic][lessonIndex].content}
          </p>
          <button onClick={handleCompleteLesson}>Complete Lesson</button>
          <button onClick={handleNextLesson}>Next Lesson</button>
        </div>
      )}

      <button className="back-btn" onClick={() => navigate("/home")}>
        Back to Home
      </button>
    </div>
  );
}

export default LessonPage;

