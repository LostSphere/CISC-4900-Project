import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "", 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    // Get existing users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      alert("Email already in use. Please log in.");
      return;
    }

    // Save new user
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Also store the new user as the logged-in user immediately
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    alert("Account created successfully! Redirecting to home...");
    navigate("/home"); // Redirect directly to home page
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <button onClick={() => navigate("/")} className="login-btn">Login</button></p>
    </div>
  );
}

export default SignupPage;
