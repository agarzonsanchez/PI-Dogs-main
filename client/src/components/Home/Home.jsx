import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import DogCard from "../DogCard/DogCard";
import Input from "../Input/Input";
import "./Home.css";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

//import Loading from "../Loading/Loading";
//import Pages from "../Pages/Pages";
//import Filter from "../Filter/Filter";

const Home = () => {
  let dogs = useSelector((store) => store.allDogs);
  let dogtemperaments = useSelector((store) => store.temperaments);
  const [page, setPage] = useState(0);
  const [dogsList, setDogList] = useState([]);
  const [inputState, setinputState] = useState("");

  const temp = (temperaments, arr = []) => {
    for (let i = 0; i < temperaments.length; i++) {
      arr.push(temperaments[i].temperament);
    }
    return arr;
  };

  const prevPage = () => {
    if (page >= 8) setPage(page - 8);
  };

  const nextPage = () => {
    if (dogsList.length > page + 8) setPage(page + 8);
  };
  const update = () => {
    return dogsList.slice(page, page + 8);
  };
  let perros = update();

  //////////////// sort dogs alphabetically AZ ////////////////

  let dogArr = [];
  let dogSorted = dogs.map((d) => d.name);

  const orderAZ = () => {
    dogArr = [];
    dogSorted = dogSorted.sort();
    dogSorted.forEach((d) => {
      dogs.forEach((dg) => {
        if (d === dg.name) {
          dogArr.push(dg);
        }
      });
    });
    setDogList(dogArr);
  };

  const orderZA = () => {
    dogArr = [];
    dogSorted = dogSorted.sort().reverse();
    dogSorted.forEach((d) => {
      dogs.forEach((dg) => {
        if (d === dg.name) {
          dogArr.push(dg);
        }
      });
    });
    setDogList(dogArr);
  };

  const reset = () => {
    setDogList(dogs);
    setinputState("");
  };

  //////////////// Temperaments Filters //////////////////
  const listValue = (e) => {
    const listValue = e.target.value;
    dogs.forEach((dg) => {
      for (let i = 0; i < dg.temperaments.length; i++) {
        if (listValue === dg.temperaments[i].temperament) {
          dogArr.push(dg);
        }
      }
    });
    setDogList(dogArr);
  };
  //////////////// Search Dog //////////////////
  const inputF = (value) => {
    setinputState(value);
  };

  const searchDog = (e) => {
    e.preventDefault();
    dogs.forEach((dog) => {
      if (dog.name.toLowerCase() === inputState.toLowerCase()) {
        dogArr.push(dog);
      } else {
        return "Dog doesn't found";
      }
    });

    e.target.value = "";
    setDogList(dogArr);
  };

  const highW = () => {
    const arrWeight = [];
    const dogArr1 = [];
    for (let i = 0; i < dogs.length; i++) {
      if ("65 – 85" === dogs[i].maxWeight) {
        arrWeight.push(85);
      } else {
        arrWeight.push(Math.floor(dogs[i].maxWeight));
      }
    }
    const a = arrWeight.sort((a, b) => a - b).reverse();
    const unique = Array.from(new Set(a));
    for (let k = 1; k < unique.length; k++) {
      dogs.forEach((d) => {
        if (d.maxWeight * 1 === unique[k]) {
          dogArr1.push(d);
        }
      });
    }

    setDogList(dogArr1);
  };

  const lowW = () => {
    const arrWeight = [];
    const dogArr2 = [];

    for (let i = 0; i < dogs.length; i++) {
      if ("65 – 85" === dogs[i].maxWeight) {
        arrWeight.push(85);
      } else {
        arrWeight.push(Math.floor(dogs[i].maxWeight));
      }
    }

    const a = arrWeight.sort((a, b) => a - b);
    const unique = Array.from(new Set(a));

    for (let k = 0; k < unique.length; k++) {
      dogs.forEach((d) => {
        if (d.minWeight * 1 === unique[k]) {
          dogArr2.push(d);
        }
      });
    }

    setDogList(dogArr2);
  };

  useEffect(() => {
    setDogList(dogs);
  }, [dogs]);

  return (
    <>
      <div className="navBar">
        <NavBar />
      </div>
      <div>
        <button className="btnStyles" onClick={orderAZ}>
          A-Z
        </button>
        <button className="btnStyles" onClick={orderZA}>
          Z-A
        </button>
        <button className="btnStyles" onClick={highW}>
          Higher Weight
        </button>
        <button className="btnStyles" onClick={lowW}>
          Lower Weight
        </button>
        <button className="btnStyles" onClick={reset}>
          RESET
        </button>
        <select
          className="selectStyle"
          onChange={(e) => listValue(e)}
          name="temperamentos"
        >
          <option value="">--PLEASE CHOOSE A TEMPERAMENT--</option>
          {dogtemperaments.map((temp) => (
            <option value={temp.temperament}>{temp.temperament}</option>
          ))}
        </select>
        <Input
          onChange={(value) => inputF(value)}
          onClick={(e) => searchDog(e)}
        />
      </div>
      <div>
        {perros.length > 0 ? (
          perros.map((d) => (
            <div className="cardsDogs">
              <DogCard
                key={d.id}
                name={d.name}
                image={d.image}
                temperaments={temp(d.temperaments).join(", ")}
                maxWeight={d.maxWeight}
                minWeight={d.minWeight}
                id={d.id}
              />
            </div>
          ))
        ) : (
          <div>
            <p>Dog not found</p>
          </div>
        )}
      </div>
      <button className="btnStyles" onClick={prevPage}>
        <AiFillCaretLeft />
        PREV
      </button>
      <button className="btnStyles" onClick={nextPage}>
        NEXT
        <AiFillCaretRight />
      </button>
    </>
  );
};

export default Home;
