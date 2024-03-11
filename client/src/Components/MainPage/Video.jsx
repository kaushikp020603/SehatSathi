import React, { useEffect, useRef } from "react";
import videoFile from "../../assets/homevideo.mp4"; // Importing the video file

const Video = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Autoplay was prevented:", error);
      });
    }
  }, []);

  return (
    <div style={{ marginTop: "75px" }}>
      <video
        ref={videoRef}
        controls
        autoPlay
        loop
        muted
        style={{ width: "1375px", height: "600px" }}
      >
        <source src={videoFile} type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
