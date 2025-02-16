import React, { useState, useEffect } from "react";

const HealthTip = () => {
  // Array of healthcare tips
  const tips = [
    "Drink plenty of water throughout the day.",
    "Eat a balanced diet rich in fruits and vegetables.",
    "Exercise regularly to maintain a healthy body.",
    "Get at least 7-8 hours of sleep each night.",
    "Avoid smoking and excessive alcohol consumption.",
    "Practice good hygiene, including handwashing.",
    "Maintain a healthy weight through diet and exercise.",
    "Manage stress through relaxation techniques and hobbies.",
    "Regularly visit your healthcare provider for check-ups.",
    "Avoid processed foods high in sugar and fat.",
    "Incorporate whole grains into your diet.",
    "Limit your intake of caffeine and sugary drinks.",
    "Stay up-to-date with vaccinations and preventive measures.",
    "Practice safe sun exposure and use sunscreen.",
    "Engage in mental exercises to keep your brain active.",
    "Avoid excessive screen time and take regular breaks.",
    "Stay socially connected with friends and family.",
    "Keep your living environment clean and safe.",
    "Stay hydrated and avoid sugary beverages.",
    "Incorporate healthy fats from sources like avocados and nuts.",
  ];

  const [tipOfTheDay, setTipOfTheDay] = useState("");

  useEffect(() => {
    // Function to get a random tip
    const getRandomTip = () => {
      const randomIndex = Math.floor(Math.random() * tips.length);
      return tips[randomIndex];
    };

    // Set the random tip of the day
    setTipOfTheDay(getRandomTip());
  }, []);

  // Styling for the component
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    margin: "20px auto",
  };

  const headingStyle = {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "15px",
  };

  const tipStyle = {
    fontSize: "1.2rem",
    color: "#555",
    textAlign: "center",
    fontStyle: "italic",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Health Tip of the Day</h2>
      <p style={tipStyle}>{tipOfTheDay}</p>
    </div>
  );
};

export default HealthTip;
