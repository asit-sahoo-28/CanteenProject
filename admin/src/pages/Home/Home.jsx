import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="hero">
      <video
        className="hero-video"
        src="/Hero.mp4"   // ✅ direct public path
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};

export default Home;

