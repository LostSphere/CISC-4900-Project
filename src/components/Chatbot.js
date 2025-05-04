import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Chatbot.css";
import chatData from "../assets/chatResponses.json";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today? 😃", fromUser: false },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  
  const messagesEndRef = useRef(null);
  const location = useLocation();

  const responseOptionsLookup = {
    "/intro-to-english": chatData.introEnglishResponses,
    "/intro-to-french": chatData.introFrenchResponses,
    "/intro-to-spanish": chatData.introSpanishResponses,
    "/intro-to-japanese": chatData.introJapaneseResponses,
    "/intro-to-mandarin": chatData.introMandarinResponses,
    "/intro-to-italian": chatData.introItalianResponses,
    "/intro-to-german": chatData.introGermanResponses
  };

  const responseOptions = responseOptionsLookup[location.pathname] || chatData.defaultResponses;
  const manualResponses = chatData.manualResponses;

  useEffect(() => {
    if (!location.pathname.includes("/intro-to-")) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleResponseClick = (userInput) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userInput, fromUser: true },
    ]);

    const botResponse = manualResponses[userInput] || manualResponses.default;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: botResponse, fromUser: false },
    ]);
  };

  const handleToggleChatbot = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <div
        className="chatbot-icon"
        onClick={handleToggleChatbot}
        tabIndex={0}
      >
        🗨️
      </div>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span>Chatbot</span>
            <button className="close-btn" onClick={handleToggleChatbot}>
              X
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={message.fromUser ? "user-message" : "bot-message"}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="response-box">
            {responseOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleResponseClick(option.userInput)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
