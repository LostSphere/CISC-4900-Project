import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./HomePage.css"; 

function HomePage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  // Translation object
  const translations = {
    en: {
      hello: "Hello",
      welcome: "Welcome to the Language Learning App!",
      startLearning: "Start learning a new language today.",
      startLesson: "Start Lesson",
      takeQuiz: "Take Quiz",
      viewProgress: "View Progress",
      settings: "Settings",
      logout: "Logout",
    },
    es: {
      hello: "Hola",
      welcome: "¡Bienvenido a la aplicación de aprendizaje de idiomas!",
      startLearning: "Comienza a aprender un nuevo idioma hoy.",
      startLesson: "Comenzar lección",
      takeQuiz: "Hacer prueba",
      viewProgress: "Ver progreso",
      settings: "Configuraciones",
      logout: "Cerrar sesión",
    },
    fr: {
      hello: "Bonjour",
      welcome: "Bienvenue sur l'application d'apprentissage des langues !",
      startLearning: "Commencez à apprendre un nouveau langage aujourd'hui.",
      startLesson: "Commencer la leçon",
      takeQuiz: "Faire un quiz",
      viewProgress: "Voir les progrès",
      settings: "Paramètres",
      logout: "Se déconnecter",
    },
    zh: {
      hello: "你好",
      welcome: "欢迎来到语言学习应用！",
      startLearning: "今天开始学习一门新语言。",
      startLesson: "开始课程",
      takeQuiz: "参加测验",
      viewProgress: "查看进度",
      settings: "设置",
      logout: "登出",
    },
    ja: {
      hello: "こんにちは",
      welcome: "言語学習アプリへようこそ！",
      startLearning: "今日から新しい言語を学びましょう。",
      startLesson: "レッスンを始める",
      takeQuiz: "クイズを受ける",
      viewProgress: "進捗を見る",
      settings: "設定",
      logout: "ログアウト",
    }
  };

  useEffect(() => {
    // Retrieve logged-in user
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    
    if (loggedInUser && loggedInUser.name) {
      setUserName(loggedInUser.name);
    } else {
      navigate("/");
    }

    // Retrieve the saved language selection from localStorage
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    setSelectedLanguage(savedLanguage);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="home-container">
      <h1>{translations[selectedLanguage]?.hello || "Hello"} {userName}!</h1>
      <p>{translations[selectedLanguage]?.welcome || "Welcome to the Language Learning App!"}</p>
      <p>{translations[selectedLanguage]?.startLearning || "Start learning a new language today."}</p>

      <nav>
        <ul>
          <li><Link to="/lesson">{translations[selectedLanguage]?.startLesson || "Start Lesson"}</Link></li>
          <li><a href="/quiz">{translations[selectedLanguage]?.takeQuiz || "Take Quiz"}</a></li>
          <li><a href="/progress">{translations[selectedLanguage]?.viewProgress || "View Progress"}</a></li>
          <li><Link to="/settings">{translations[selectedLanguage]?.settings || "Settings"}</Link></li>
        </ul>
      </nav>

      <button onClick={handleLogout}>
        {translations[selectedLanguage]?.logout || "Logout"}
      </button>
    </div>
  );
}

export default HomePage;
