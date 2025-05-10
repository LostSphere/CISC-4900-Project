import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Chatbot.css";
import chatData from "../assets/chatResponses.json";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today? 😃", fromUser: false },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [botIsTyping, setBotIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const location = useLocation();

  const responseOptionsLookup = {
    
    // Intro courses
    "/intro-to-english": chatData.introEnglishResponses,
    "/intro-to-french": chatData.introFrenchResponses,
    "/intro-to-spanish": chatData.introSpanishResponses,
    "/intro-to-japanese": chatData.introJapaneseResponses,
    "/intro-to-mandarin": chatData.introMandarinResponses,
    "/intro-to-italian": chatData.introItalianResponses,
    "/intro-to-german": chatData.introGermanResponses,

    // Intermediate Courses
    "/intermediate-to-english": chatData.intermediateEnglishResponses,
    "/intermediate-to-french": chatData.intermediateFrenchResponses,
    "/intermediate-to-spanish": chatData.intermediateSpanishResponses,
    "/intermediate-to-japanese": chatData.intermediateJapaneseResponses,
    "/intermediate-to-mandarin": chatData.intermediateMandarinResponses,
    "/intermediate-to-italian": chatData.intermediateItalianResponses,
    "/intermediate-to-german": chatData.intermediateGermanResponses,

    // Advanced Courses
    "/advanced-to-english": chatData.advancedEnglishResponses,
    "/advanced-to-french": chatData.advancedFrenchResponses,
    "/advanced-to-spanish": chatData.advancedSpanishResponses,
    "/advanced-to-japanese": chatData.advancedJapaneseResponses,
    "/advanced-to-mandarin": chatData.advancedMandarinResponses,
    "/advanced-to-italian": chatData.advancedItalianResponses,
    "/advanced-to-german": chatData.advancedGermanResponses,

    // Cultural Adventures
    "/spanish-story": chatData.SpanishStoryResponses,
    "/japanese-story": chatData.JapaneseStoryResponses,
    "/french-story": chatData.FrenchStoryResponses,
    "/mandarin-story": chatData.MandarinStoryResponses,
    "/italian-story": chatData.ItalianStoryResponses,
    "/german-story": chatData.GermanStoryResponses,
    "/literature-story": chatData.LiteratureStoryResponses,
    "/debating-story": chatData.DebatingStoryResponses,
    "/business-story": chatData.BusinessStoryResponses,
  };

  const responseOptions = responseOptionsLookup[location.pathname] || chatData.defaultResponses;
  const manualResponses = chatData.manualResponses;

  useEffect(() => {
      if (!location.pathname.includes("/intro-to-") && !location.pathname.includes("/intermediate-")) {
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

    setBotIsTyping(true);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, fromUser: false },
      ]);
      setBotIsTyping(false);
    }, 1000);
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
            {botIsTyping && (
              <div className="bot-message">💬</div>
            )}
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
