import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import translations from "../assets/translations.json";
import "./TestYourself.css";

const languageOptions = [
  { name: "French", image: "/images/IntroLevel/France.jpg", code: "fr" },
  { name: "Spanish", image: "/images/IntroLevel/Spain.jpg", code: "es" },
  { name: "Japanese", image: "/images/IntroLevel/Japan.jpg", code: "jp" },
  { name: "Mandarin", image: "/images/IntroLevel/China.jpg", code: "zh" },
  { name: "Italian", image: "/images/IntroLevel/Italy.jpg", code: "it" },
  { name: "German", image: "/images/IntroLevel/Germany.jpg", code: "de" },
];

const vocabulary = {
  fr: [
    { word: "Bonjour", translation: "Hello" },
    { word: "Merci", translation: "Thank you" },
  ],
  es: [
    { word: "Hola", translation: "Hello" },
    { word: "Gracias", translation: "Thank you" },
  ],
};

function TestYourself() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);

  const startQuiz = (language) => {
    setSelectedLanguage(language);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswer("");
  };

  const handleAnswer = () => {
    if (!selectedLanguage) return;

    const correctAnswer = vocabulary[selectedLanguage][currentQuestionIndex].translation.toLowerCase().trim();
    if (userAnswer.toLowerCase().trim() === correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < vocabulary[selectedLanguage].length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswer("");
    } else {
      setQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswer("");
  };

  return (
    <div className="test-yourself-container">
      {!selectedLanguage ? (
        <div>
          <h2>{translations.en.selectLanguage || "Select a language to start"}</h2>
          <div className="language-selection">
            {languageOptions.map((lang) => (
              <div key={lang.code} className="language-card" onClick={() => startQuiz(lang.code)}>
                <img src={lang.image} alt={lang.name} className="language-image" />
                <p>{lang.name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : quizCompleted ? (
        <div className="quiz-completed">
          <h2>{translations.en.quizCompleted || "Quiz Completed!"}</h2>
          <p>{translations.en.yourScore || "Your Score"}: {score} / {vocabulary[selectedLanguage].length}</p>
          <button onClick={handleResetQuiz}>{translations.en.tryAgain || "Try Again"}</button>
          <button onClick={() => setSelectedLanguage(null)}>{translations.en.selectAnotherLanguage || "Select Another Language"}</button>
        </div>
      ) : (
        <div className="quiz-question">
          <h2>{translations.en.question || "Translate the word:"}</h2>
          <p className="quiz-word">{vocabulary[selectedLanguage][currentQuestionIndex].word}</p>
          <input 
            type="text" 
            value={userAnswer} 
            onChange={(e) => setUserAnswer(e.target.value)} 
            placeholder={translations.en.enterAnswer || "Enter your answer"} 
            className="answer-input"
          />
          <button onClick={handleAnswer}>{translations.en.submit || "Submit"}</button>
        </div>
      )}

      <button className="home-button" onClick={() => navigate("/home")}>
        {translations.en.goHome || "Go Back to Home"}
      </button>
    </div>
  );
}

export default TestYourself;
