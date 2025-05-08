import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import storyData from "./ItalianData.json"; 
import quizData from "./ItalianQuizData.json"; 
import "./AdvancedToItalian.css"; 

function AdvancedToItalian() {
  const navigate = useNavigate();
  const [currentScene, setCurrentScene] = useState(storyData[0]);
  const [history, setHistory] = useState([]);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const storageKey = "quizProgress_AdvancedItalian";

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

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem(storageKey));
    if (savedProgress) {
      setCurrentScene(savedProgress.currentScene);
      setHistory(savedProgress.history);
      setIsQuizActive(savedProgress.isQuizActive);
      setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
      setScore(savedProgress.score);
      setQuizCompleted(savedProgress.quizCompleted);
    }
  }, []);

  useEffect(() => {
    const progress = {
      currentScene,
      history,
      isQuizActive,
      currentQuestionIndex,
      score,
      quizCompleted
    };
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [currentScene, history, isQuizActive, currentQuestionIndex, score, quizCompleted]);

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
      window.speechSynthesis.cancel();
  
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'it-IT';
  
      const setVoiceAndSpeak = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          const selectedVoice = voices.find(voice => voice.lang === 'it-IT') || voices[0];
          utterance.voice = selectedVoice;
          window.speechSynthesis.speak(utterance);
        }
      };
  
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
      } else {
        setVoiceAndSpeak();
      }
    }
  };

  const handleQuizAnswer = (selectedOption) => {
    let updatedScore = score;
  
    if (quizData[currentQuestionIndex].answer.includes(selectedOption)) {
      updatedScore += 1;
      setScore(updatedScore);
    }
  
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
  
      const completionSound = new Audio("/sounds/quiz_complete.mp3");
      completionSound.play();
  
      localStorage.setItem("quizProgress_AdvancedItalian", JSON.stringify({ score: updatedScore }));
  
      const highestScore = parseInt(localStorage.getItem("highestScore_AdvancedToItalian"), 10) || 0;
      if (updatedScore > highestScore) {
        localStorage.setItem("highestScore_AdvancedToItalian", updatedScore);
      }
    }
  };

  const handleQuit = () => {
    const progress = {
      currentScene,
      history,
      isQuizActive,
      currentQuestionIndex,
      score,
      quizCompleted
    };
    localStorage.setItem('quizProgress', JSON.stringify(progress));
    navigate("/lesson");
  };

  const handleTryAgain = () => {
    setIsQuizActive(false);
    setQuizCompleted(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    setCurrentScene(storyData[0]);
    setHistory([]);
  };

  if (quizCompleted) {
    return (
      <div className="italian-story-container">
        <h2>Quiz Completed!</h2>
        <p>Your Score: {score} / {quizData.length}</p>
        <p>Bravo ! 🎉</p>
        <div className="button-container" style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <button className="story-button" onClick={() => navigate("/lesson")}>
            Return to Lesson Page
          </button>
          <button className="story-button" onClick={handleTryAgain}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isQuizActive) {
    return (
      <div className="italian-story-container">
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
        <div className="button-container" style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
          <button className="story-button" onClick={handleQuit}>Exit Lesson</button>
          <button className="story-button" onClick={handleTryAgain}>Back To Lesson</button>
        </div>
      </div>
    );
  }

  return (
    <div className="italian-story-container">
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
          {history.length > 0 && (
            <button className="story-button" onClick={handleGoBack}>⬅️ Go Back</button>
          )}
          <button className="story-button" onClick={handleNext}>Next ➡️</button>
          <button className="story-button" onClick={() => setIsQuizActive(true)}>Skip to Quiz</button>
        </div>
        <div className="button-container" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button className="story-button" onClick={() => navigate(-1)}>Exit Lesson</button>
        </div>
      </div>
    </div>
  );
}

export default AdvancedToItalian;
