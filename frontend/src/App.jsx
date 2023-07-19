/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import StatesContext from "../context/StatesContext";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Results from "./pages/Results";
import WallOfFame from "./pages/WallOfFame";
import Unauthorized from "./pages/Unauthorized";
import NavBar from "./components/NavBar";
import Rules from "./pages/Rules";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const { setCitiesLoaded } = useContext(StatesContext);

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/cities`).then(() => {
      setCitiesLoaded(true);
    });
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/game"
          element={isLoggedIn ? <Game /> : <Unauthorized />}
        />
        <Route
          path="/results"
          element={isLoggedIn ? <Results /> : <Unauthorized />}
        />
        <Route path="/walloffame" element={<WallOfFame />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </Router>
  );
}

export default App;
