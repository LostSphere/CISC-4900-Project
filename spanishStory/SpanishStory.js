import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import storyData from "./SpanishStoryData.json";
import "./SpanishStory.css";

function SpanishStory() {
  const navigate = useNavigate();
  const [currentScene, setCurrentScene] = useState(storyData[0]);
  const [history, setHistory] = useState([]);

  const handleNext = () => {
    const currentIndex = storyData.findIndex(scene => scene.id === currentScene.id);
    if (currentIndex !== -1 && currentIndex < storyData.length - 1) {
      const nextScene = storyData[currentIndex + 1];
      setHistory([...history, currentScene]);
      setCurrentScene(nextScene);
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
      utterance.lang = 'es-ES'; // Spanish voice
      speechSynthesis.speak(utterance);
    }
  };

  const progress = (storyData.findIndex(scene => scene.id === currentScene.id) + 1) / storyData.length * 100;

  return (
    <div className="spanish-story-container">
      <div className="progress-bar-container" style={{ width: "100%", background: "#e0e0e0", borderRadius: "10px", marginBottom: "10px" }}>
        <div style={{ width: `${progress}%`, height: "10px", background: "#007bff", borderRadius: "10px", transition: "width 0.3s ease-in-out" }}></div>
      </div>
      <div>
        <img src={currentScene.image} alt="Scene" className="story-image" />
        <p 
          className="story-text" 
          onClick={() => handleTextToSpeech(currentScene.text)} 
          style={{ cursor: "pointer" }}
        >
          {currentScene.text} ({currentScene.partOfSpeech}) 🔊
        </p>
        <p className="story-translation">{currentScene.translation}</p>
        <p 
          className="story-example" 
          onClick={() => handleTextToSpeech(currentScene.example)} 
          style={{ cursor: "pointer" }}
        >
          <strong>Example:</strong> <em>{currentScene.example} 🔊</em>
        </p>
        <p className="story-example-translation">{currentScene.exampleTranslation}</p>
        <div className="button-container" style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <button className="story-button" onClick={handleNext}>
            Next ➡️
          </button>
          {history.length > 0 && (
            <button className="story-button" onClick={handleGoBack}>
              ⬅️ Go Back
            </button>
          )}
          <button className="story-button" onClick={() => navigate(-1)}>
            Exit Story
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpanishStory;
