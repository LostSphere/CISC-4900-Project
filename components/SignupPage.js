import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

function SignupPage() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    setSelectedLanguage(savedLanguage);
  }, []);
  

  const translations = {
    en: {
      title: "Sign Up",
      fullName: "Full Name",
      email: "Email",
      password: "Password",
      signUp: "Sign Up",
      alreadyHaveAccount: "Already have an account?",
      login: "Login",
      emailInUse: "Email already in use. Please log in.",
      success: "Account created successfully! Redirecting to home...",
    },
    es: {
      title: "Registrarse",
      fullName: "Nombre Completo",
      email: "Correo Electrónico",
      password: "Contraseña",
      signUp: "Registrarse",
      alreadyHaveAccount: "¿Ya tienes una cuenta?",
      login: "Iniciar sesión",
      emailInUse: "El correo electrónico ya está en uso. Por favor, inicia sesión.",
      success: "¡Cuenta creada con éxito! Redirigiendo a la página de inicio...",
    },
    fr: {
      title: "S'inscrire",
      fullName: "Nom Complet",
      email: "E-mail",
      password: "Mot de passe",
      signUp: "S'inscrire",
      alreadyHaveAccount: "Vous avez déjà un compte?",
      login: "Se connecter",
      emailInUse: "L'e-mail est déjà utilisé. Veuillez vous connecter.",
      success: "Compte créé avec succès ! Redirection vers l'accueil...",
    },
    zh: { 
      title: "注册", 
      fullName: "全名", 
      email: "电子邮件", 
      password: "密码", 
      signUp: "注册", 
      alreadyHaveAccount: "已经有账户？",
      login: "登录",
      emailInUse: "电子邮件已被使用",
      success: "成功",
    },
    ja: { 
      title: "サインアップ", 
      fullName: "フルネーム", 
      email: "メール", 
      password: "パスワード", 
      signUp: "サインアップ", 
      alreadyHaveAccount: "すでにアカウントをお持ちですか？",
      login: "ログイン",
      emailInUse: "メールはすでに使用されています",
      success: "サクセス",
    },
  };

  const translation = translations[selectedLanguage] || translations["en"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.email === email)) {
      alert(translation.emailInUse);
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    alert(translation.success);
    navigate("/home");
  };

  return (
    <div className="signup-container">
      <h2>{translation.title}</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="name"
          placeholder={translation.fullName}
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder={translation.email}
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder={translation.password}
          required
          onChange={handleChange}
        />
        <button type="submit">{translation.signUp}</button>
      </form>
      <p>
        {translation.alreadyHaveAccount}{" "}
        <button onClick={() => navigate("/")} className="login-btn">
          {translation.login}
        </button>
      </p>
    </div>
  );
}

export default SignupPage;
