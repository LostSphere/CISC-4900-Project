import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import translations from "../assets/translations.json";
import "./TestYourself.css";

const languageOptions = [
  { name: "French", image: "/images/CountryFlag/France.png" },
  { name: "Spanish", image: "/images/CountryFlag/Spain.png" },
];

const vocabulary = {
  French: [
    { sentence: "Bonjour tout le monde", translation: "Hello everyone" },
    { sentence: "Merci beaucoup", translation: "Thank you very much" },
  ],
  Spanish: [
    { sentence: "Hola amigos", translation: "Hello friends" },
    { sentence: "Muchas gracias", translation: "Thank you very much" },
  ],
};

function TestYourself() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [wordOrder, setWordOrder] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);

  const startQuiz = (language) => {
    setSelectedLanguage(language);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    shuffleSentence(language, 0);
    setSelectedWords([]);
  };

  const shuffleSentence = useCallback((language, index) => {
    if (language) {
      const words = vocabulary[language][index].sentence.split(" ");
      setWordOrder([...words].sort(() => Math.random() - 0.5));
    }
  }, []);

  useEffect(() => {
    if (selectedLanguage !== null) {
      shuffleSentence(selectedLanguage, currentQuestionIndex);
    }
  }, [selectedLanguage, currentQuestionIndex, shuffleSentence]);

  const handleWordClick = (word) => {
    setSelectedWords([...selectedWords, word]);
    playClickSound();
  };

  const playClickSound = () => {
    const clickSound = new Audio("/sounds/tap.mp3");
    clickSound.play();
  };

  const speakSentence = (sentence) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = selectedLanguage === "French" ? "fr-FR" : "es-ES";
      speechSynthesis.speak(utterance);
    }
  };

  const checkAnswer = () => {
    const correctSentence = vocabulary[selectedLanguage][currentQuestionIndex].sentence;

    if (selectedWords.join(" ") === correctSentence) {
        playCorrectSound();
        if (currentQuestionIndex < vocabulary[selectedLanguage].length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedWords([]);
            }, 1000); 
        } else {
            setTimeout(() => {
                playCompletionSound();
                setQuizCompleted(true);
            }, 1000);
        }
    } else {
        playWrongSound();
        setTimeout(() => setSelectedWords([]), 1000); 
    }
};

const playCompletionSound = () => {
    const completionSound = new Audio("/sounds/quiz_complete.mp3");
    completionSound.play();
};

  const playCorrectSound = () => {
    const correctSound = new Audio("/sounds/correct.mp3");
    correctSound.play();
  };

  const playWrongSound = () => {
    const wrongSound = new Audio("/sounds/wrong.mp3");
    wrongSound.play();
  };

  return (
    <div className="test-yourself-container">
      {!selectedLanguage ? (
        <div>
          <h2>{translations.en.selectLanguage || "Select a language to start"}</h2>
          <div className="language-selection">
            {languageOptions.map((lang) => (
              <div key={lang.name} className="language-card-container">
                <div className="language-card" onClick={() => startQuiz(lang.name)}>
                  <img src={lang.image} alt={lang.name} className="language-image" />
                  <p>{lang.name}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="home-button" onClick={() => navigate("/home")}>
            🏠 Go Back to Home
          </button>
        </div>
      ) : quizCompleted ? (
        <div className="quiz-completed">
          <h2>Quiz Completed!</h2>
          <p>Great job! 🎉</p>
          <button onClick={() => startQuiz(selectedLanguage)} className="try-again-button">
            🔄 Try Again
          </button>
          <button onClick={() => setSelectedLanguage(null)} className="select-language-button">
            🌍 Select Another Language
          </button>
          <button onClick={() => navigate("/home")} className="home-button">
            🏠 Go Back to Home
          </button>
        </div>
      ) : (
        <div className="quiz-container">
          <h2>Listen and Arrange the Sentence</h2>
          <div className="speech-container">
            <button onClick={() => speakSentence(vocabulary[selectedLanguage][currentQuestionIndex].sentence)} 
                    className="repeat-button">
              🔊 Repeat
            </button>
          </div>
          <p className="translation">({vocabulary[selectedLanguage][currentQuestionIndex].translation})</p>

          <div className="user-input-container">
            <p className="user-input">{selectedWords.join(" ") || "Select words to form the sentence..."}</p>
          </div>

          <div className="word-container">
            {wordOrder.map((word, index) => (
              <button key={index} className="word-button" onClick={() => handleWordClick(word)}>
                {word}
              </button>
            ))}
          </div>

          <button onClick={checkAnswer} className="submit-button">Enter</button>
          <button onClick={() => setSelectedLanguage(null)} className="go-back-button">⬅️ Go Back</button>
          <button className="home-button" onClick={() => navigate("/home")}>
            🏠 Go Back to Home
          </button>
        </div>
      )}
    </div>
  );
}

export default TestYourself;
