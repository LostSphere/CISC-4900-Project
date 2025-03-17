import React, { useState } from "react";
import storyData from "./SpanishStoryData.json"; // Adjusted path
import "./SpanishStory.css"; // Adjusted path

function SpanishStory() {
  const [currentScene, setCurrentScene] = useState(storyData[0]);

  const handleChoiceClick = (nextId) => {
    const nextScene = storyData.find((scene) => scene.id === nextId);
    if (nextScene) setCurrentScene(nextScene);
  };

  return (
    <div className="spanish-story-container">
      <p className="story-text">{currentScene.text}</p>
      <div className="story-choices">
        {currentScene.choices.map((choice, index) => (
          <button 
            key={index} 
            className="story-button" 
            onClick={() => handleChoiceClick(choice.nextId)}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SpanishStory;

