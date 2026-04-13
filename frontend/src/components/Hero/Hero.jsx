import React from "react";
import "./Hero.css";
import { assets } from "../../assets/assets";
const Hero = () => {
  return (
    <div className="hero">
      <video
        className="hero-video"
        src={assets.Hero}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};

export default Hero;
