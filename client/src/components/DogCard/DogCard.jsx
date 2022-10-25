import React from "react";
import "./DogCard.css";
import { Link } from "react-router-dom";

const DogCard = ({ id, name, image, temperaments, maxWeight, minWeight }) => {
  return (
    <Link to={`/details/${id}`} className="linkDog">
      <div className="cardShape">
        <h2 className="dogName">{name}</h2>

        <img className="imageDog" src={image} alt="dog" />
        <p className="descriptions">maxWeight: {maxWeight}</p>
        <p className="descriptions">minWeight: {minWeight}</p>
        <p className="descriptions">Temperaments: {temperaments}</p>
      </div>
    </Link>
  );
};

export default DogCard;
