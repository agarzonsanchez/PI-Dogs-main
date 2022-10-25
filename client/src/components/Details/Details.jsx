import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Details.css";

const Details = (props) => {
  const [dogDetail, setDogDetail] = useState({});
  const id = props.match.params.id;
  useEffect(() => {
    dogDetails();
  }, []);

  const dogDetails = async () => {
    const data = await fetch(`http://localhost:3001/dogs/${id}`, {
      method: "GET",
    });
    const dataJ = await data.json();
    let arr = [];
    if (dataJ.temperaments) {
      for (let i = 0; i < dataJ.temperaments.length; i++) {
        arr.push(dataJ.temperaments[i].temperament);
      }
      dataJ["temperamento"] = arr.join(", ");
    }

    setDogDetail(dataJ);
  };

  return (
    <div>
      <div className="navBar">
        <NavBar />
      </div>

      <h1>DOG DETAILS</h1>
      <div className="cardsDogss">
        <h2>{dogDetail.name}</h2>
        <img className="imageDogs" src={dogDetail.image} alt="dog" />
        <p>Max Weight: {dogDetail.maxWeight}</p>
        <p>Min Weight: {dogDetail.minWeight}</p>
        <p>Temperament: {dogDetail.temperamento}</p>
        <p>Max Hight: {dogDetail.maxHeight}</p>
        <p>Min Hight:{dogDetail.minHeight}</p>
        <p>Life Expectancy: {dogDetail.life_expectancy}</p>
      </div>
    </div>
  );
};

export default Details;
