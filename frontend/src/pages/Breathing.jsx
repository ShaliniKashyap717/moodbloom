import React, { useState, useEffect } from "react";
import "./Breathing.css"; // Import CSS for styling

const breathingTechniques = [
  { name: "Box Breathing", cycle: [4, 4, 4, 4] }, // Inhale 4s, Hold 4s, Exhale 4s, Hold 4s
  { name: "4-7-8 Breathing", cycle: [4, 7, 8, 0] }, // Inhale 4s, Hold 7s, Exhale 8s, No Hold
  { name: "Alternate Nostril Breathing", cycle: [5, 5, 5, 5] }, // Equal 5s for all steps
  { name: "Equal Breathing", cycle: [4, 4, 4, 4] }, // All steps equal
];

export default function Breathing() {
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const [timer, setTimer] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (selectedTechnique && !isPaused) {
      clearInterval(timer); // Clear previous timer before setting a new one

      let currentCycle = selectedTechnique.cycle;
      let index = stepIndex; // Keep track of current step
      let duration = currentCycle[index]; // Get duration for the current step
      setCounter(duration); // Set the countdown for the step

      const newTimer = setInterval(() => {
        setCounter((prev) => {
          if (prev > 1) return prev - 1; // Decrease timer
          
          // Move to next step when timer reaches 1 (not 0)
          index = (index + 1) % currentCycle.length;
          setStepIndex(index);
          return currentCycle[index]; // Reset counter to new phase duration
        });
      }, 1000);

      setTimer(newTimer);
    }

    return () => clearInterval(timer);
  }, [selectedTechnique, isPaused]);

  const handlePauseResume = () => setIsPaused(!isPaused);

  const handleStop = () => {
    clearInterval(timer);
    setSelectedTechnique(null);
    setStepIndex(0);
    setCounter(0);
    setIsPaused(false);
  };

  const stepNames = ["Inhale", "Hold", "Exhale", "Hold"];

  return (
    <div className="breathing-container">
      <h1 className="title">Breathing Exercises</h1>
      <div className="techniques">
        {breathingTechniques.map((technique, index) => (
          <button
            key={index}
            className={`technique-button ${
              selectedTechnique?.name === technique.name ? "active" : ""
            }`}
            onClick={() => {
              clearInterval(timer); // Reset if new technique is selected
              setSelectedTechnique(technique);
              setStepIndex(0);
              setCounter(technique.cycle[0]); // Set initial counter correctly
              setIsPaused(false);
            }}
          >
            {technique.name}
          </button>
        ))}
      </div>

      {selectedTechnique && (
        <div className="breathing-box">
          <h2>{selectedTechnique.name}</h2>
          <p className="step">{stepNames[stepIndex]}</p>
          <p className="counter">{counter}s</p>

          <div className="controls">
            <button className="control-button" onClick={handlePauseResume}>
              {isPaused ? "Resume" : "Pause"}
            </button>
            <button className="control-button stop" onClick={handleStop}>
              Stop
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
