import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import SecondaryFooter from "./SecondaryFooter";

function Chatbot() {
  const textSectionRef = useRef(null); // Create a ref to the text section
  const [scrollTriggered, setScrollTriggered] = useState(false); // State to track if scrolling has been triggered

  // Scroll to the text section when the page is loaded or when user interacts
  const handleUserInteraction = () => {
    if (!scrollTriggered) {
      textSectionRef.current.scrollIntoView({ behavior: "smooth" });
      setScrollTriggered(true); // Prevent repeated scrolls
    }
  };

  useEffect(() => {
    const chatbotIframe = document.querySelector("iframe");

    // Trigger scroll when user interacts with the iframe
    if (chatbotIframe) {
      chatbotIframe.addEventListener("focus", handleUserInteraction);
      chatbotIframe.addEventListener("click", handleUserInteraction);
    }

    return () => {
      if (chatbotIframe) {
        chatbotIframe.removeEventListener("focus", handleUserInteraction);
        chatbotIframe.removeEventListener("click", handleUserInteraction);
      }
    };
  }, [scrollTriggered]);

  const iframeContainerStyle = {
    marginTop: "50px",
    height: "600px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const iframeStyle = {
    width: "100%",
    height: "100%",
    border: "none",
  };

  const textContainerStyle = {
    padding: "20px",
    backgroundColor: "#e8f5e9", // Light green for healthcare theme
    borderRadius: "8px",
    lineHeight: "1.6",
    color: "#333",
  };

  return (
    <div>
      <NavBar />
      <div style={iframeContainerStyle}>
        <iframe
          src="https://donna-chatbot-0123.vercel.app"
          title="Healthcare Chatbot"
          style={iframeStyle}
        />
      </div>

      <div ref={textSectionRef} style={textContainerStyle}>
        <p>
          💡 <strong>How to use the chatbot:</strong>
        </p>
        <ul>
          <li>
            Type your queries in simple sentences to get the best results.
          </li>
          <li>
            The chatbot is here to help you solve healthcare-related issues or
            provide guidance.
          </li>
          <li>
            Click on the chat window and start typing your question or issue to
            begin.
          </li>
        </ul>
        <p>
          📋 <strong>Rules & Regulations:</strong>
        </p>
        <ul>
          <li>
            Ensure that the information you provide is accurate to get the best
            responses.
          </li>
          <li>
            The chatbot is not a replacement for professional medical advice.
            Please consult a doctor for serious health concerns.
          </li>
          <li>
            Avoid spamming or entering irrelevant data as this may limit the
            bot's ability to assist you.
          </li>
        </ul>
      </div>

      <Footer />
      <SecondaryFooter />
    </div>
  );
}

export default Chatbot;
