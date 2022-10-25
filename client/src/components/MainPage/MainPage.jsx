import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { GrTwitter } from "react-icons/gr";
import { FaPaw } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./MainPage.css";

const welcome = (
  <>
    WHERE THE MOST <br /> ACCURATE DOGGY INFO <br /> IS TRANSLATED
    <br />
    INTO SIMPLE WORDS.
  </>
);

const MainPage = (props) => {
  return (
    <>
      <div className="mainFlex">
        <h1 className="welcome">
          <FaPaw />
          <br />
          {welcome}
        </h1>

        <Link to={"/home"} className="textD">
          Press Start
        </Link>
      </div>

      <footer>
        <div>
          <ul className="footerS">
            <li className="social">
              <a href="https://github.com/agarzonsanchez" target="blank">
                <AiFillGithub className="socialCl" />
              </a>
            </li>
            <li className="social">
              <a
                href="https://linkedin.com/in/andrés-fabián-garzón-sánchez-3b614611b"
                target="blank"
              >
                <AiFillLinkedin className="socialCl" />
              </a>
            </li>

            <li className="social">
              <a href="https://www.twitter.com/AndresGSan" target="blank">
                <GrTwitter className="socialCl" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default MainPage;
