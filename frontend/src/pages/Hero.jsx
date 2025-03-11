// Hero.jsx
import React from 'react';
import "./Home.css";
import { Link } from 'react-router-dom';


export default function Hero() {
  return (
    <div className="hero-container">
      {/* Left Breathe In Animation */}
      <div className="breath-animation left">
        <div className="geometric-pulse in"></div>
        <div className="breath-text in">Breathe In</div>
      </div>

      {/* Center Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title">Find Your Balance with MoodBloom</h1>
        <p className="hero-subtitle">
          Track your moods, discover patterns, and cultivate emotional wellness
        </p>
        <button className="hero-cta" id = "track"> 
    <Link to="http://localhost:5001" className='track'>Track Your Mood Now</Link>
        </button>
      </div>

 
      <div className="breath-animation right">
        <div className="geometric-pulse out"></div>
        <div className="breath-text out">Breathe Out</div>
      </div>
    </div>
  );
}
