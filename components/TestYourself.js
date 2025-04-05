import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import frenchVocabulary from "../assets/frenchVocabulary.json";
import spanishVocabulary from "../assets/spanishVocabulary.json";
import "./TestYourself.css";

const languageOptions = [
  { name: "French", image: "/images/CountryFlag/France.png", file: "frenchVocabulary" },
  { name: "Spanish", image: "/images/CountryFlag/Spain.png", file: "spanishVocabulary" },
];

function TestYourself() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [wordOrder, setWordOrder] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [vocabulary, setVocabulary] = useState([]);

  const shuffleVocabulary = (vocab) => {
    const shuffled = [...vocab];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startQuiz = (language) => {
    setSelectedLanguage(language);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    loadVocabulary(language);
    setSelectedWords([]);
  };

  const loadVocabulary = (language) => {
    let vocab = [];
    if (language === "French") {
      vocab = frenchVocabulary;
    } else if (language === "Spanish") {
      vocab = spanishVocabulary;
    }
    const shuffledVocab = shuffleVocabulary(vocab);
    setVocabulary(shuffledVocab);
  };
  
  const shuffleSentence = useCallback((index) => {
    if (vocabulary.length > 0) {
      const sentence = vocabulary[index]?.sentence;
      if (sentence && typeof sentence === 'string') {
        const wordsWithPunctuation = sentence.split(/([.,!?;:])|\s+/).filter(Boolean);
        setWordOrder(wordsWithPunctuation.sort(() => Math.random() - 0.5));
      }
    }
  }, [vocabulary]);

  useEffect(() => {
    if (selectedLanguage !== null && vocabulary.length > 0) {
      shuffleSentence(currentQuestionIndex);
    }
  }, [selectedLanguage, currentQuestionIndex, shuffleSentence, vocabulary]);

  const calculateProgress = () => {
    if (vocabulary.length === 0) return 0;
    return (currentQuestionIndex / vocabulary.length) * 100;
  };

  const handleWordClick = (word) => {
    const updatedWords = [...selectedWords, word];
    setSelectedWords(updatedWords);
    playClickSound();
  };

  const normalizeUserInput = (input) => {
    return input
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/\s([.,!?])/g, '$1')
      .replace(/([.,!?])\s+/g, '$1')
      .trim();
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
    if (vocabulary.length > 0) {
      const correctSentence = vocabulary[currentQuestionIndex]?.sentence;
      const cleanUserInput = selectedWords.join(" ").trim();
      const cleanCorrectSentence = correctSentence.trim();
      const normalizedUserInput = normalizeUserInput(cleanUserInput);
      const normalizedCorrectSentence = normalizeUserInput(cleanCorrectSentence);

      if (normalizedUserInput === normalizedCorrectSentence) {
        playCorrectSound();
        if (currentQuestionIndex < vocabulary.length - 1) {
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

  const removeWord = (index) => {
    const newSelectedWords = selectedWords.filter((_, i) => i !== index);
    setSelectedWords(newSelectedWords);
  };

  return (
    <div className="test-yourself-container">
      {selectedLanguage && (
  <div className="progress-bar-container">
    <div
      className="progress-bar"
      style={{ width: `${calculateProgress()}%` }}
    />
  </div>
)}


      {!selectedLanguage ? (
        <div>
          <h2>Select a language to start</h2>
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
            🏠 Back to Home
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
            🏠 Back to Home
          </button>
        </div>
      ) : (
        <div className="quiz-container">
          <h2>Listen and Arrange the Sentence</h2>
          <div className="speech-container">
            <button onClick={() => speakSentence(vocabulary[currentQuestionIndex]?.sentence)} className="repeat-button">
              🔊 Repeat
            </button>
          </div>
          <p className="translation">({vocabulary[currentQuestionIndex]?.translation || 'Loading translation...'})</p>
          <div className="user-input-container">
            <p className="user-input">
              {selectedWords.map((word, index) => (
                <span
                  key={index}
                  style={{
                    color: '#333',
                    marginRight: '8px',
                    cursor: 'pointer',
                  }}
                  onClick={() => removeWord(index)}
                >
                  {word}
                </span>
              )) || "Select words to form the sentence..."}
            </p>
          </div>

          <div className="word-container">
            {wordOrder.map((word, index) => (
              <button key={index} className="word-button" onClick={() => handleWordClick(word)}>
                {word}
              </button>
            ))}
          </div>

          <div className="button-container">
            <button onClick={() => setSelectedLanguage(null)} className="go-back-button">⬅️ Select Another Language</button>
            <button onClick={checkAnswer} className="submit-button">⌨️ Enter</button>
            <button className="home-button" onClick={() => navigate("/home")}>
              🏠 Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestYourself;
