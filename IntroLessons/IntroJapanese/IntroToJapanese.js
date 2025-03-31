import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import storyData from "./JapaneseData.json";
import quizData from "./JapaneseQuizData.json";
import "./IntroToJapanese.css";

function IntroToJapanese() {
  const navigate = useNavigate();
  const [currentScene, setCurrentScene] = useState(storyData[0]);
  const [history, setHistory] = useState([]);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    const currentIndex = storyData.findIndex(scene => scene.id === currentScene.id);
    if (currentIndex !== -1 && currentIndex < storyData.length - 1) {
      const nextScene = storyData[currentIndex + 1];
      setHistory([...history, currentScene]);
      setCurrentScene(nextScene);
    } else {
      setIsQuizActive(true);
    }
  };

  const handleGoBack = () => {
    if (history.length > 0) {
      const newHistory = [...history];
      const previousScene = newHistory.pop();
      setCurrentScene(previousScene);
      setHistory(newHistory);
    }
  };

  const handleTextToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      speechSynthesis.speak(utterance);
    }
  };

  const handleQuizAnswer = (selectedOption) => {
    if (selectedOption === quizData[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
      const completionSound = new Audio("/sounds/quiz_complete.mp3");
      completionSound.play();
    }
  };

  if (quizCompleted) {
    return (
      <div className="japanese-story-container">
        <h2>Quiz Completed</h2>
        <p>Your score: {score} / {quizData.length}</p>
        <p>Greatjob！ 🎉</p>
        <button className="story-button" onClick={() => navigate("/lesson")}>
          Return to Lesson Page
        </button>
      </div>
    );
  }

  if (isQuizActive) {
    return (
      <div className="japanese-story-container">
        <div className="progress-bar-container" style={{ marginBottom: "20px" }}>
          <div style={{ width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%`, height: "10px", background: "#007bff", borderRadius: "10px", transition: "width 0.3s ease-in-out" }}></div>
        </div>
        <div>
          <p className="story-text">{quizData[currentQuestionIndex].question}</p>
          <div className="quiz-options" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {quizData[currentQuestionIndex].options.map((option, index) => (
              <button key={index} className="story-button" onClick={() => handleQuizAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="japanese-story-container">
      <div className="progress-bar-container" style={{ marginBottom: "20px" }}>
        <div style={{ width: `${((storyData.findIndex(scene => scene.id === currentScene.id) + 1) / storyData.length) * 100}%`, height: "10px", background: "#007bff", borderRadius: "10px", transition: "width 0.3s ease-in-out" }}></div>
      </div>
      <div>
        <img src={currentScene.image} alt="Scene" className="story-image" />
        <p className="story-text" onClick={() => handleTextToSpeech(currentScene.text)} style={{ cursor: "pointer" }}>
          {currentScene.text} ({currentScene.partOfSpeech}) 🔊
        </p>
        <p className="story-translation">{currentScene.translation}</p>
        <p className="story-example" onClick={() => handleTextToSpeech(currentScene.example)} style={{ cursor: "pointer" }}>
          <strong>Example:</strong> <em>{currentScene.example} 🔊</em>
        </p>
        <p className="story-example-translation">{currentScene.exampleTranslation}</p>
        <div className="button-container" style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <button className="story-button" onClick={handleNext}>Next ➡️</button>
          {history.length > 0 && (
            <button className="story-button" onClick={handleGoBack}>⬅️ Go Back</button>
          )}
          <button className="story-button" onClick={() => navigate(-1)}>Exit lesson</button>
        </div>
      </div>
    </div>
  );
}

export default IntroToJapanese;
