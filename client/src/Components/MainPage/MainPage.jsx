import React, { Fragment } from "react";
import NavBar from "./NavBar";
import Banner from "./Banner";
import Video from "./Video";
import Footer from "./Footer";
import Creators from "./Creators";
import ContactSection from "./ContactSection";
import AboutUsSection from "./AboutUsSection";
import SecondaryFooter from "./SecondaryFooter";
import ChatBotSection from "./ChatBotSection";

function MainPage() {
  return (
    <Fragment>
      <NavBar />
      <div style={{ marginBottom: "-85px" }}>
        {" "}
        {/* Adjust the marginBottom value */}
        <Video />
      </div>
      <div style={{ marginTop: "3.5rem" }}>
        {" "}
        {/* Adjust the margin-top value as needed */}
        <AboutUsSection id="about-us" />
      </div>
      <Banner />

      <Creators />
      <ChatBotSection />
      <ContactSection id="contact-section" />

      <Footer />
      <SecondaryFooter />
    </Fragment>
  );
}

export default MainPage;
