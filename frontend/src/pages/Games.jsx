import React from "react";
import "./Games.css";
import { useNavigate } from "react-router-dom";

export default function Games() {
  const navigate = useNavigate();

  const options = [
    { 
      name: "Track Your Mood", 
      emoji: "📊", 
      bgColor: "bg-blue-50", 
      textColor: "text-blue-600", 
      externalLink: "http://localhost:5001" 
    },
    { 
      name: "Breathing Exercises", 
      route: "/tools/breathing", 
      emoji: "🌬️", 
      bgColor: "bg-blue-50", 
      textColor: "text-blue-600" 
    },
    { 
      name: "Play Games", 
      externalLink: "https://67cc906d5e0d2d9a79c652d7--regal-douhua-d16c0a.netlify.app/", 
      emoji: "🎮", 
      bgColor: "bg-green-50", 
      textColor: "text-green-600" 
    },
    
  ];

  return (
    <div className="games-container">
      <h1 className="title">Choose an Activity</h1>
      <div className="cards-container">
        {options.map((option, index) => (
          <div key={index} className={`card ${option.bgColor}`}>
            <div className="emoji">{option.emoji}</div>
            {option.externalLink ? (
              <a id="track"
                href={option.externalLink}
                className={`text-xl font-medium mt-4 ${option.textColor}`}
                target="_blank" // Opens in a new tab
                rel="noopener noreferrer" // Security best practice for external links
              >
                {option.name}
              </a>
            ) : (
              <h3
                className={`text-xl font-medium mt-4 ${option.textColor}`}
                onClick={() => navigate(option.route)}
              >
                {option.name}
              </h3>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
