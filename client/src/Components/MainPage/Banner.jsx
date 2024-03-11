import React from "react";

import ImageSlider from "./ImageSlider";
import Banner1 from "../../assets/banner1.png";
import Banner2 from "../../assets/banner2.png";
import Banner3 from "../../assets/banner3.png";
import Banner4 from "../../assets/banner4.png";
import Banner5 from "../../assets/banner5.png";

const Banner = () => {
  const slides = [
    {
      url: Banner1,
      title: "hospital",
    },
    {
      url: Banner2,
      title: "hospital2",
    },
    { url: Banner3, title: "hospital3" },
    { url: Banner4, title: "hospital4" },
    { url: Banner5, title: "hospital5" },
  ];
  const containerStyles = {
    width: "100%", // Take up the full width of the viewport
    height: "690px", // Adjusting height to fit the viewport height minus 83px for marginTop
    margin: "0 auto",
    marginTop: "83px", // Adjust the marginTop to create space between NavBar and ImageSlider
    overflow: "hidden", // Prevents the image from overflowing its container
    position: "relative",
  };

  return (
    <div style={containerStyles}>
      <ImageSlider slides={slides} />
    </div>
  );
};

export default Banner;
