import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import frenchVocabulary from "../IntroLessons/IntroFrench/FrenchData.json";
import spanishVocabulary from "../IntroLessons/IntroSpanish/SpanishData.json";
import mandarinVocabulary from "../IntroLessons/IntroMandarin/MandarinData.json";
import japaneseVocabulary from "../IntroLessons/IntroJapanese/JapaneseData.json";
import italianVocabulary from "../IntroLessons/IntroItalian/ItalianData.json";
import germanVocabulary from "../IntroLessons/IntroGerman/GermanData.json";
import "./TestYourself.css";

const languageOptions = [
  { name: "French", image: "/images/CountryFlag/France.png", file: "frenchVocabulary" },
  { name: "Spanish", image: "/images/CountryFlag/Spain.png", file: "spanishVocabulary" },
  { name: "Mandarin", image: "/images/CountryFlag/China.png", file: "mandarinVocabulary" },
  { name: "Japanese", image: "/images/CountryFlag/Japan.png", file: "japaneseVocabulary" },
  { name: "Italian", image: "/images/CountryFlag/Italy.png", file: "italianVocabulary" },
  { name: "German", image: "/images/CountryFlag/German.png", file: "germanVocabulary" },
];

function TestYourself() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [wordOrder, setWordOrder] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [vocabulary, setVocabulary] = useState([]);

  const buttonStyle = {
    padding: '12px 24px',
    fontSize: '1rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    margin: '10px',
    transition: 'background-color 0.3s ease',
  };

  const shuffleVocabulary = (vocab) => {
    const shuffled = [...vocab];
    if (selectedLanguage === "Mandarin" || selectedLanguage === "Japanese") {
      shuffled.forEach((item, index) => {
        const example = item.example;
        const shuffledExample = example.split('').sort(() => Math.random() - 0.5).join('');
        shuffled[index] = { ...item, example: shuffledExample };
      });
    } else {
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
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
    const vocabFiles = {
      French: frenchVocabulary,
      Spanish: spanishVocabulary,
      Mandarin: mandarinVocabulary,
      Japanese: japaneseVocabulary,
      Italian: italianVocabulary,
      German: germanVocabulary,
    };
    const vocab = vocabFiles[language] || [];
    const shuffledVocab = shuffleVocabulary(vocab);
    setVocabulary(shuffledVocab);
  };

  const shuffleSentence = useCallback((index) => {
    if (vocabulary.length > 0) {
      const example = vocabulary[index]?.example;
      if (example && typeof example === 'string') {
        let wordsWithPunctuation = [];
        if (selectedLanguage === "Mandarin" || selectedLanguage === "Japanese") {
          wordsWithPunctuation = example.split('').filter(Boolean);
        } else {
          wordsWithPunctuation = example.split(/([.,!?;:])|\s+/).filter(Boolean);
        }
        setWordOrder(wordsWithPunctuation.sort(() => Math.random() - 0.5));
      }
    }
  }, [vocabulary, selectedLanguage]);

  useEffect(() => {
    if (selectedLanguage !== null && vocabulary.length > 0) {
      shuffleSentence(currentQuestionIndex);
    }
  }, [selectedLanguage, currentQuestionIndex, shuffleSentence, vocabulary]);

  const calculateProgress = () => {
    if (vocabulary.length === 0) return 0;
    if (quizCompleted) return 100;
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

  const speakSentence = (example) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(example);
      switch (selectedLanguage) {
        case "French":
          utterance.lang = "fr-FR";
          break;
        case "Spanish":
          utterance.lang = "es-ES";
          break;
        case "Mandarin":
          utterance.lang = "zh-CN";
          break;
        case "Japanese":
          utterance.lang = "ja-JP";
          break;
        case "Italian":
          utterance.lang = "it-IT";
          break;
        case "German":
          utterance.lang = "de-DE";
          break;
        default:
          utterance.lang = "en-US";
          break;
      }
      speechSynthesis.speak(utterance);
    }
  };

  const checkAnswer = () => {
    if (vocabulary.length > 0) {
      const correctSentence = vocabulary[currentQuestionIndex]?.example;
      const cleanUserInput = selectedWords.join(" ").trim();
      const normalizedUserInput = normalizeUserInput(cleanUserInput);
      const normalizedCorrectSentence = normalizeUserInput(correctSentence.trim());

      if (selectedLanguage === "Mandarin" || selectedLanguage === "Japanese") {
        if (checkMandarinOrJapaneseAnswer(normalizedUserInput, normalizedCorrectSentence)) {
          playCorrectSound();
          proceedToNextQuestion();
        } else {
          playWrongSound();
          setTimeout(() => setSelectedWords([]), 1000);
        }
      } else {
        if (normalizedUserInput === normalizedCorrectSentence) {
          playCorrectSound();
          proceedToNextQuestion();
        } else {
          playWrongSound();
          setTimeout(() => setSelectedWords([]), 1000);
        }
      }
    }
  };

  const checkMandarinOrJapaneseAnswer = (userInput, correctSentence) => {
    const cleanUserInput = userInput.replace(/[\s.,!?;:]+/g, '');
    const cleanCorrectSentence = correctSentence.replace(/[\s.,!?;:]+/g, '');
    if (cleanUserInput === cleanCorrectSentence) {
      return true;
    }
    return false;
  };

  const proceedToNextQuestion = () => {
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
          <button style={buttonStyle} className="home-button" onClick={() => navigate("/home")}>
            🏠 Back to Home
          </button>
        </div>
      ) : quizCompleted ? (
        <div className="quiz-completed">
          <h2>Quiz Completed!</h2>
          <p>Great job! 🎉</p>
          <button style={buttonStyle}  onClick={() => startQuiz(selectedLanguage)} className="try-again-button">
            🔄 Try Again
          </button>
          <button style={buttonStyle} onClick={() => setSelectedLanguage(null)} className="select-language-button">
            🌍 Select Another Language
          </button>
          <button style={buttonStyle} onClick={() => navigate("/home")} className="home-button">
            🏠 Back to Home
          </button>
        </div>
      ) : (
        <div className="quiz-container">
          <h2>Listen and Arrange the Sentence</h2>
          <div className="speech-container">
            <button onClick={() => speakSentence(vocabulary[currentQuestionIndex]?.example)} className="repeat-button">
              🔊 Repeat
            </button>
          </div>
          <p className="exampleTranslation">({vocabulary[currentQuestionIndex]?.exampleTranslation || 'Loading translation...'})</p>
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

          <div style={{ display: "flex", flexWrap: "nowrap", justifyContent: "center", gap: "10px", flexDirection: "row" }}>
            <button style={buttonStyle} onClick={() => setSelectedLanguage(null)}>
              🌍 Select Another Language
            </button>
            <button style={buttonStyle} onClick={checkAnswer}>
              ➡️ Enter
            </button>
            <button style={buttonStyle} onClick={() => navigate("/home")}>
              🏠 Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestYourself;
