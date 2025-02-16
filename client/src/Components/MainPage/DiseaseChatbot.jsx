import React from "react";

function DiseaseChatbot() {
  const handleRedirect = () => {
    window.location.href = "http://127.0.0.1:5000/";
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 Try Our Latest Innovation!</h1>
      <h2 style={styles.subtitle}>
        🤖 Meet the Chatbot that Can Sense Your Disease!
      </h2>
      <p style={styles.description}>
        Our cutting-edge chatbot uses advanced algorithms to analyze your
        symptoms and provide potential insights into your health. Just answer a
        few questions, and let our chatbot guide you! 🌟
      </p>
      <button style={styles.button} onClick={handleRedirect}>
        💬 Check It Out!
      </button>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f8ff", // Light background color
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s ease",
  },
  title: {
    fontSize: "3rem",
    color: "#2e8b57", // Forest green color
  },
  subtitle: {
    fontSize: "2rem",
    color: "#4682b4", // Steel blue color
    margin: "10px 0",
  },
  description: {
    fontSize: "1.2rem",
    color: "#333",
    maxWidth: "600px",
    lineHeight: "1.5",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "1.5rem",
    color: "#fff",
    backgroundColor: "#ff6347", // Tomato color
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

// Add hover effect for the button
styles.button.hover = {
  backgroundColor: "#ff4500", // Orange red color on hover
};

export default DiseaseChatbot;
