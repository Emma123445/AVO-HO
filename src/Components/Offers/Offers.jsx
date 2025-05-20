import React from "react";
import "./Offers.css";
import exclusive_image from "../Assets/exclusive_image.jpg";
const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Offres Exclusives</h1>
        <button>Vérifier maintenant</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="offer" />
      </div>
    </div>
  );
};

export default Offers;
