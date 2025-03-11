// BreathingAnimation.jsx
import React from 'react';
import "./Home.css";

export default function BreathingAnimation({ side }) {
  return (
    <div className={`breathing-animation ${side}`}>
      <div className="breathing-circle"></div>
      <p className="breathing-text">{side === "left" ? "Breathe In..." : "Breathe Out..."}</p>
    </div>
  );
}
