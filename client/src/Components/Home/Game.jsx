import React, { useState } from "react";
import "./Game.css"; // Import CSS for animations
import Layout from "../Layout";

const Game = () => {
  const [currentScene, setCurrentScene] = useState(1);
  const [score, setScore] = useState(0);

  const handleChoice = (isPositive) => {
    if (isPositive) {
      setScore(score + 1);
    }
    // Move to the next scene
    setCurrentScene(currentScene + 1);
  };

  const restartGame = () => {
    setCurrentScene(1);
    setScore(0);
  };

  // Define different scenes and their choices
  const scenes = [
    {
      id: 1,
      description: "You wake up feeling groggy. What do you do?",
      choices: [
        { text: "Practice deep breathing", isPositive: true },
        { text: "Check your phone immediately", isPositive: false },
      ],
    },
    {
      id: 2,
      description: "You're stuck in traffic. What's your response?",
      choices: [
        { text: "Listen to calming music or a podcast", isPositive: true },
        { text: "Get frustrated and honk the horn", isPositive: false },
      ],
    },
    {
      id: 3,
      description:
        "You receive criticism from a colleague. How do you handle it?",
      choices: [
        { text: "Take a deep breath and respond calmly", isPositive: true },
        { text: "React defensively and argue back", isPositive: false },
      ],
    },
    {
      id: 4,
      description:
        "You're feeling overwhelmed with tasks. What's your approach?",
      choices: [
        {
          text: "Prioritize tasks and break them into smaller steps",
          isPositive: true,
        },
        { text: "Panic and procrastinate", isPositive: false },
      ],
    },
    {
      id: 5,
      description:
        "You notice negative thoughts creeping in. How do you counter them?",
      choices: [
        {
          text: "Practice gratitude and focus on positive aspects",
          isPositive: true,
        },
        {
          text: "Dwell on negative thoughts and spiral into worry",
          isPositive: false,
        },
      ],
    },
    {
      id: 6,
      description:
        "You're feeling stressed before an important presentation. How do you prepare?",
      choices: [
        {
          text: "Practice deep breathing and visualization techniques",
          isPositive: true,
        },
        {
          text: "Panic and procrastinate until the last minute",
          isPositive: false,
        },
      ],
    },
    {
      id: 7,
      description: "You receive an upsetting email. How do you respond?",
      choices: [
        {
          text: "Take a break and go for a walk before crafting a response",
          isPositive: true,
        },
        { text: "Immediately fire off an angry reply", isPositive: false },
      ],
    },
    {
      id: 8,
      description: "You're feeling tired and unmotivated. What do you do?",
      choices: [
        {
          text: "Take a short nap or engage in a relaxing activity",
          isPositive: true,
        },
        { text: "Caffeinate heavily to push through", isPositive: false },
      ],
    },
    {
      id: 9,
      description:
        "You experience a setback in a personal project. How do you handle it?",
      choices: [
        {
          text: "Reflect on the lessons learned and adjust your approach",
          isPositive: true,
        },
        { text: "Give up and abandon the project", isPositive: false },
      ],
    },
    {
      id: 10,
      description:
        "You're feeling overwhelmed with responsibilities. How do you manage?",
      choices: [
        { text: "Delegate tasks and ask for help if needed", isPositive: true },
        {
          text: "Try to do everything yourself and burn out",
          isPositive: false,
        },
      ],
    },
    // Add more scenes and choices here
  ];

  return (
    <Layout>
      <h1
        style={{
          textAlign: "center",
          fontSize: "48px",
          color: "#2c3e50",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
        }}
      >
        Mindfulness Check
      </h1>

      <div className="mindful-moments-game">
        {currentScene <= scenes.length ? (
          <div className="scene">
            <h2>Scene {currentScene}</h2>
            <p>{scenes[currentScene - 1].description}</p>
            <div className="choices">
              {scenes[currentScene - 1].choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(choice.isPositive)}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="result">
            <h2>Game Over!</h2>
            <p>
              Your mindfulness score: {score}/{scenes.length}
            </p>
            <button onClick={restartGame}>Restart</button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Game;
