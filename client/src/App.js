import "./App.css";
import MainPage from "./components/MainPage/MainPage.jsx";
import Home from "./components/Home/Home.jsx";
import Details from "./components/Details/Details.jsx";
import CreateDog from "./components/CreateDog/CreateDog.jsx";
import { BrowserRouter, Route } from "react-router-dom";
import { useEffect } from "react";
import { getDogs, getTemperaments } from "./Redux/Actions";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  });
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path={"/"} component={MainPage} />
        <Route path={"/home"} component={Home} />
        <Route path={"/details/:id"} component={Details} />
        <Route path={"/createDog"} component={CreateDog} />
      </BrowserRouter>
    </div>
  );
}

export default App;
