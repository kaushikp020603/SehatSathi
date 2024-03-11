import { useState, useEffect } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderStyles = {
    height: "100%",
    position: "relative",
  };

  const slideStyles = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: "10px",
    backgroundSize: "cover",
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  const arrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };

  const leftArrowStyles = {
    ...arrowStyles,
    left: "32px",
  };

  const rightArrowStyles = {
    ...arrowStyles,
    right: "32px",
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change 3000 to adjust autoplay interval in milliseconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div style={sliderStyles}>
      <div style={leftArrowStyles} onClick={handlePrevSlide}>
        <ArrowLeftIcon />
      </div>
      <div style={rightArrowStyles} onClick={handleNextSlide}>
        <ArrowRightIcon />
      </div>
      <div style={slideStyles}></div>
    </div>
  );
};

export default ImageSlider;
