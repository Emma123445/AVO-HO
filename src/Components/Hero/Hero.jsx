import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Hero.css";
import hero_image from "../Assets/vlisco-5.png";

const Hero = () => {
  const navigate = useNavigate();

  const handleProtectedRedirect = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/upload');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="hero">
      <div className="hero-left">
        <h2>Chaque pagne, une histoire!</h2>
        <p>
          Avec <span>AVO-HO AI</span>, découvrez l'histoire que cache chaque motif
          de pagne juste en important une image
        </p>
        <div className="hero-latest-btn">
          <div onClick={handleProtectedRedirect} className="test">Tester notre IA</div>
          <div onClick={handleProtectedRedirect} className="Generate">Générer un motif pagne</div>
        </div>
      </div>
      <div className="hero_right">
        <img src={hero_image} alt="hero_image" />
      </div>
    </div>
  );
};

export default Hero;
