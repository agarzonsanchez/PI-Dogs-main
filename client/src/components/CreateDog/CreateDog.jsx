import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { SiDatadog } from "react-icons/si";
import { postDog } from "../../Redux/Actions";
import "../CreateDog/CreateDog.css";

export const validate = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = "Dog name is required";
  } else if (!input.name.match(/^[A-Za-z]+$/)) {
    errors.name = "Name must contain only letters";
  } else if (!input.name.match(/^[A-Z][a-z]+$/)) {
    errors.name = "Name must start with a Capital letter";
  }
  if (parseFloat(input.minHeight) === 0 || parseFloat(input.maxHeight) === 0) {
    errors.minHeight = "The height can't be 0";
    errors.maxHeight = "The height can't be 0";
  } else if (parseFloat(input.minHeight) > parseFloat(input.maxHeight)) {
    errors.minHeight = "The min height can't be greater than the max height";
  }
  if (parseFloat(input.minWeight) === 0 || parseFloat(input.maxWeight) === 0) {
    errors.minWeight = "The weight can't be 0";
    errors.maxWeight = "The weight can't be 0";
  } else if (parseFloat(input.minWeight) > parseFloat(input.maxWeight)) {
    errors.minWeight = "The min weight can't be greater than the max weight";
  }
  if (
    parseFloat(input.lifeSpanMin) === 0 ||
    parseFloat(input.lifeSpanMax) === 0
  ) {
    errors.lifeSpanMin = "The life span can't be 0";
    errors.lifeSpanMax = "The life span can't be 0";
  }
  return errors;
};

const CreateDog = () => {
  const dispatch = useDispatch();
  let dogtemperaments = useSelector((store) => store.temperaments);
  const [input, setInput] = useState({
    name: "",
    maxHeight: "",
    minHeight: "",
    maxWeight: "",
    minWeight: "",
    lifeSpanMin: "",
    lifeSpanMax: "",
    image: "",
    temperaments1: "",
    temperaments2: "",
    temperaments3: "",
    temperaments4: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    maxHeight: "",
    minHeight: "",
    maxWeight: "",
    minWeight: "",
    lifeSpanMin: "",
    lifeSpanMax: "",
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    const property = e.target.name;
    setInput({ ...input, [property]: value });
    setErrors(validate({ ...input, [property]: value }));
  };

  //// Submit Button
  const handleSubmit = (e) => {
    e.preventDefault();
    const dogFinal = {
      name: input.name,
      maxHeight: input.maxHeight,
      minHeight: input.minHeight,
      maxWeight: input.maxWeight,
      minWeight: input.minWeight,
      life_expectancy: `${input.lifeSpanMin} - ${input.lifeSpanMax} years`,
      image: input.image,
      temperament: [
        input.temperaments1,
        input.temperaments2,
        input.temperaments3,
        input.temperaments4,
      ],
    };

    dispatch(postDog(dogFinal));
    window.location.reload();
  };
  return (
    <>
      <div>
        <div className="navBar">
          <NavBar />
        </div>

        <h2>
          CREATE A DOG <SiDatadog />
        </h2>
        <form onSubmit={handleSubmit} className="formBack">
          <label>Dog Breed:</label>
          <input
            className="inputStyle"
            name="name"
            type="text"
            value={input.name}
            onChange={handleInputChange}
            placeholder="Dog Breed"
          />
          {errors.name && <p className="errorStyle">{errors.name}</p>}
          <div>
            <label>Height:</label>
            <input
              className="inputStyle"
              name="maxHeight"
              type="text"
              value={input.maxHeight}
              onChange={handleInputChange}
              placeholder="Max Height"
            />
            {errors.maxHeight && (
              <p className="errorStyle">{errors.maxHeight}</p>
            )}
            <input
              className="inputStyle"
              name="minHeight"
              type="text"
              value={input.minHeight}
              onChange={handleInputChange}
              placeholder="Min Height"
            />
            {errors.minHeight && (
              <p className="errorStyle">{errors.minHeight}</p>
            )}
          </div>
          <div>
            <label>Weight:</label>
            <input
              className="inputStyle"
              name="maxWeight"
              type="text"
              value={input.maxWeight}
              onChange={handleInputChange}
              placeholder="Max Weight"
            />
            {errors.maxWeight && (
              <p className="errorStyle">{errors.maxWeight}</p>
            )}
            <input
              className="inputStyle"
              name="minWeight"
              type="text"
              value={input.minWeight}
              onChange={handleInputChange}
              placeholder="Min Weight"
            />
            {errors.minWeight && (
              <p className="errorStyle">{errors.minWeight}</p>
            )}
          </div>
          <div>
            <label>Life expectancy:</label>
            <input
              className="inputStyle"
              name="lifeSpanMin"
              type="text"
              value={input.lifeSpanMin}
              onChange={handleInputChange}
              placeholder="Min Life Expectancy"
            />
            {errors.lifeSpanMin && (
              <p className="errorStyle">{errors.lifeSpanMin}</p>
            )}
            <input
              className="inputStyle"
              name="lifeSpanMax"
              type="text"
              value={input.lifeSpanMax}
              onChange={handleInputChange}
              placeholder="Max Life Expectancy"
            />
            {errors.lifeSpanMax && (
              <p className="errorStyle">{errors.lifeSpanMax}</p>
            )}
          </div>
          <div>
            <label>Image:</label>
            <input
              className="inputStyle"
              name="image"
              type="text"
              value={input.image}
              onChange={handleInputChange}
              placeholder="Image URL"
            />
          </div>

          <label>Temperaments:</label>
          <select
            className="inputStyle"
            onChange={handleInputChange}
            name="temperaments1"
          >
            <option value="">--none--</option>
            {dogtemperaments.map((temp, index) => (
              <option key={index} value={temp.temperament}>
                {temp.temperament}
              </option>
            ))}
          </select>
          <select
            className="inputStyle"
            onChange={handleInputChange}
            name="temperaments2"
          >
            <option value="none">--none--</option>
            {dogtemperaments.map((temp, index) => (
              <option key={index} value={temp.temperament}>
                {temp.temperament}
              </option>
            ))}
          </select>
          <select
            className="inputStyle"
            onChange={handleInputChange}
            name="temperaments3"
          >
            <option value="none">--none--</option>
            {dogtemperaments.map((temp, index) => (
              <option key={index} value={temp.temperament}>
                {temp.temperament}
              </option>
            ))}
          </select>
          <select
            className="inputStyle"
            onChange={handleInputChange}
            name="temperaments4"
          >
            <option value="none">--none--</option>
            {dogtemperaments.map((temp, index) => (
              <option key={index} value={temp.temperament}>
                {temp.temperament}
              </option>
            ))}
          </select>
          <div>
            <button className="btnStyles" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateDog;
