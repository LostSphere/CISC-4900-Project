import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LessonPage.css";

const translations = {
  en: {
    chooseLanguage: "Choose a Language",
    startLesson: "Start Lesson",
    previousLesson: "⬅ Previous Lesson",
    nextLesson: "➡ Next Lesson",
    playSound: "🔊 Play Sound",
    backToHome: "Back to Home",
  },
  es: {
    chooseLanguage: "Elige un idioma",
    startLesson: "Iniciar lección",
    previousLesson: "⬅ Lección anterior",
    nextLesson: "➡ Próxima lección",
    playSound: "🔊 Reproducir sonido",
    backToHome: "Volver a Inicio",
  },
  fr: {
    chooseLanguage: "Choisissez une langue",
    startLesson: "Commencer la leçon",
    previousLesson: "⬅ Leçon précédente",
    nextLesson: "➡ Leçon suivante",
    playSound: "🔊 Jouer le son",
    backToHome: "Retour à l'accueil",
  },
  zh: {
    chooseLanguage: "选择语言",
    startLesson: "开始课程",
    previousLesson: "⬅ 上一课",
    nextLesson: "➡ 下一课",
    playSound: "🔊 播放声音",
    backToHome: "返回首页",
  },
  ja: {
    chooseLanguage: "言語を選択してください",
    startLesson: "レッスンを始める",
    previousLesson: "⬅ 前のレッスン",
    nextLesson: "➡ 次のレッスン",
    playSound: "🔊 音声を再生",
    backToHome: "ホームへ戻る",
  },
};

const lessonsData = {
  Spanish: [
    { title: "Hola y Adiós", meaning: "Hello and Goodbye", content: "Aprende a decir 'Hola' y 'Adiós' en español." },
    { title: "Números", meaning: "Numbers", content: "Aprende a contar del 1 al 10 en español." },
    { title: "Frases Comunes", meaning: "Common Phrases", content: "Aprende frases comunes como '¿Cómo estás?' y 'Buenos días'." },
  ],
  French: [
    { title: "Bonjour et Au revoir", meaning: "Hello and Goodbye", content: "Apprenez à dire 'Bonjour' et 'Au revoir' en français." },
    { title: "Les Nombres", meaning: "Numbers", content: "Apprenez à compter de 1 à 10 en français." },
    { title: "Phrases Courantes", meaning: "Common Phrases", content: "Apprenez des phrases courantes comme 'Comment ça va?' et 'Bonjour'." },
  ],
  Chinese: [
    { title: "你好和再见", meaning: "Hello and Goodbye", content: "学习如何用中文说'你好'和'再见'。" },
    { title: "数字", meaning: "Numbers", content: "学习如何从1数到10。" },
    { title: "常见短语", meaning: "Common Phrases", content: "学习像'你好吗？'和'早上好'这样的短语。" },
  ],
  Japanese: [
    { title: "こんにちはとさようなら", meaning: "Hello and Goodbye", content: "日本語で「こんにちは」と「さようなら」を言う方法を学びます。" },
    { title: "数字", meaning: "Numbers", content: "1から10まで数える方法を学びます。" },
    { title: "よく使うフレーズ", meaning: "Common Phrases", content: "「お元気ですか？」や「おはようございます」などのフレーズを学びます。" },
  ],
};

function LessonPage() {
  const navigate = useNavigate();
  const [selectedLanguage] = useState(localStorage.getItem("language") || "en");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [lessonIndex, setLessonIndex] = useState(0);

  const handleLanguageChange = (e) => {
    setSelectedLesson(e.target.value);
    setLessonIndex(0);
  };

  const handleNextLesson = () => {
    if (lessonIndex < lessonsData[selectedLesson]?.length - 1) {
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
    utterance.lang =
      selectedLesson === "Spanish" ? "es-ES" :
      selectedLesson === "French" ? "fr-FR" :
      selectedLesson === "Chinese" ? "zh-CN" :
      selectedLesson === "Japanese" ? "ja-JP" :
      "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="lesson-container">
      <h1>{translations[selectedLanguage].chooseLanguage}</h1>
      <div className="language-select">
        <select value={selectedLesson} onChange={handleLanguageChange}>
          <option value="">-- {translations[selectedLanguage].chooseLanguage} --</option>
          <option value="Spanish">Español</option>
          <option value="French">Français</option>
          <option value="Chinese">中文</option>
          <option value="Japanese">日本語</option>
        </select>
      </div>
      {selectedLesson && (
        <div className="lesson-card">
          <h2>{lessonsData[selectedLesson][lessonIndex].title}</h2>
          <p className="lesson-meaning">({lessonsData[selectedLesson][lessonIndex].meaning})</p>
          <p>{lessonsData[selectedLesson][lessonIndex].content}</p>
          <div className="lesson-buttons">
            <button onClick={() => playSound(lessonsData[selectedLesson][lessonIndex].title)}>
              {translations[selectedLanguage].playSound}
            </button>
            <button onClick={handlePreviousLesson} disabled={lessonIndex === 0}>
              {translations[selectedLanguage].previousLesson}
            </button>
            <button onClick={handleNextLesson}>
              {translations[selectedLanguage].nextLesson}
            </button>
          </div>
        </div>
      )}
      <button className="back-btn" onClick={() => navigate("/home")}>
        {translations[selectedLanguage].backToHome}
      </button>
    </div>
  );
}

export default LessonPage;
