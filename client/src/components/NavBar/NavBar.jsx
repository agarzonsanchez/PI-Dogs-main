import React from "react";
import { Link } from "react-router-dom";
import { FaDog } from "react-icons/fa";
import { GiDogHouse } from "react-icons/gi";
import "./NavBar.css";

const NavBar = (props) => {
  return (
    <nav>
      <ul className="listHome">
        <li>
          <button className="btnStyle">
            <Link className="linkStyle" to="/home">
              <GiDogHouse />
              HOME
            </Link>
          </button>
        </li>
        <li>
          <button className="btnStyle">
            <Link className="linkStyle" to="/createDog">
              <FaDog />
              CREATE A DOG
            </Link>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
