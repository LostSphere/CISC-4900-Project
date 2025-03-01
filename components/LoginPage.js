import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [errorMessage, setErrorMessage] = useState("");

  // Translation object stored inside JavaScript
  const translations = {
    en: {
      login: "Login",
      chooseLanguage: "Choose your language:",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
      wrongCredentials: "Wrong email or password. Please try again.",
      noAccount: "Don't have an account?",
      signup: "Sign Up",
      welcome: "Welcome back",
    },
    es: {
      login: "Iniciar sesión",
      chooseLanguage: "Elige tu idioma:",
      emailPlaceholder: "Correo electrónico",
      passwordPlaceholder: "Contraseña",
      wrongCredentials: "Correo o contraseña incorrectos. Inténtalo de nuevo.",
      noAccount: "¿No tienes una cuenta?",
      signup: "Regístrate",
      welcome: "Bienvenido de nuevo",
    },
    fr: {
      login: "Connexion",
      chooseLanguage: "Choisissez votre langue :",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Mot de passe",
      wrongCredentials: "Email ou mot de passe incorrect. Veuillez réessayer.",
      noAccount: "Vous n'avez pas de compte?",
      signup: "S'inscrire",
      welcome: "Bon retour",
    },
    zh: {
      login: "登录",
      chooseLanguage: "选择您的语言",
      emailPlaceholder: "电子邮件",
      passwordPlaceholder: "密码",
      wrongCredentials: "电子邮件或密码无效。",
      noAccount: "没有账户？",
      signup: "注册",
      welcome: "欢迎",
    },
    ja: {
      login: "ログイン",
      chooseLanguage: "言語を選択してください",
      emailPlaceholder: "メール",
      passwordPlaceholder: "パスワード",
      wrongCredentials: "メールまたはパスワードが無効です。",
      noAccount: "アカウントをお持ちでないですか？",
      signup: "サインアップ",
      welcome: "いらっしゃいませ",
    },
  };

  // Load selected language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle language selection
  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    localStorage.setItem("selectedLanguage", language);
  };

  // Handle login logic
  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert(`${translations[selectedLanguage]?.welcome || "Welcome back"}, ${user.name}!`);
      navigate("/home");
    } else {
      setErrorMessage(
        translations[selectedLanguage]?.wrongCredentials || "Wrong email or password. Please try again."
      );
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <h2>{translations[selectedLanguage]?.login || "Login"}</h2>

      {/* Language Selection Dropdown */}
      <div>
        <label htmlFor="language">{translations[selectedLanguage]?.chooseLanguage || "Choose your language:"}</label>
        <select id="language" value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="zh">中文</option>
          <option value="ja">日本語</option>
        </select>
      </div>

      {/* Error message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder={translations[selectedLanguage]?.emailPlaceholder || "Email"}
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder={translations[selectedLanguage]?.passwordPlaceholder || "Password"}
          required
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">{translations[selectedLanguage]?.login || "Login"}</button>
      </form>

      <p>
        {translations[selectedLanguage]?.noAccount || "Don't have an account?"}{" "}
        <button onClick={handleSignup} className="signup-btn">
          {translations[selectedLanguage]?.signup || "Sign Up"}
        </button>
      </p>
    </div>
  );
}

export default LoginPage;
