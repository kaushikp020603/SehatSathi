import React, { Fragment, useEffect } from "react";
import NavBar from "./NavBar";
import Banner from "./Banner";
import Video from "./Video";
import Footer from "./Footer";
import Creators from "./Creators";
import ContactSection from "./ContactSection";
import AboutUsSection from "./AboutUsSection";
import SecondaryFooter from "./SecondaryFooter";
import ChatBotSection from "./ChatBotSection";
import Healthtip from "./HealthTip";
import HealthcareNews from "./HealthcareNews";
import { Toaster, toast } from "react-hot-toast";
import styled from "styled-components";
import DiseaseChatbot from "./DiseaseChatbot";

const StyledToaster = styled(Toaster)`
  .toast {
    background-color: #333; /* Dark background for the toast */
    color: #fff; /* White text color */
    border-radius: 5px; /* Rounded corners */
    padding: 10px 20px; /* Padding inside the toast */
    font-size: 14px; /* Font size */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Shadow for the toast */
  }

  .toast.success {
    background-color: #4caf50; /* Green background for success messages */
  }

  .toast.error {
    background-color: #f44336; /* Red background for error messages */
  }
  .react-hot-toast {
    top: 10px; /* Position from the top */
    left: 50%; /* Center horizontally */
    transform: translateX(-50%); /* Center horizontally */
    position: fixed; /* Fixed position */
    z-index: 9999; /* Ensure it's above other content */
  }
`;

function MainPage() {
  useEffect(() => {
    const currentTime = new Date().getHours();
    let greetingMessage = "";

    if (currentTime >= 5 && currentTime < 12) {
      greetingMessage = "🌅 Good Morning and Welcome! ☀️";
    } else if (currentTime >= 12 && currentTime < 18) {
      greetingMessage = "🌞 Good Afternoon and Welcome! 🌼";
    } else {
      greetingMessage = "🌙 Good Evening and Welcome! 🌟";
    }

    toast(greetingMessage, {
      duration: 3000, // Toast duration in milliseconds
      position: "top-center", // Position of the toast
      // Apply custom CSS class
    });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <StyledToaster />
      <div style={{ marginBottom: "-985x" }}>
        {" "}
        {/* Adjust the marginBottom value */}
        <Video />
      </div>
      <div style={{ marginTop: "1rem" }}>
        {" "}
        {/* Adjust the margin-top value as needed */}
        <Healthtip />
      </div>

      <AboutUsSection id="about-us" />

      <div style={{ marginTop: "-5rem" }}>
        <Banner />
      </div>

      <HealthcareNews />

      <Creators />

      <ChatBotSection />
      <ContactSection id="contact-section" />

      <Footer />
      <SecondaryFooter />
    </Fragment>
  );
}

export default MainPage;
