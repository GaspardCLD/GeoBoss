import React, { useContext } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Results from "./pages/Results";
import WallOfFame from "./pages/WallOfFame";
import Unauthorized from "./pages/Unauthorized";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Router>
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
        <Route
          path="/walloffame"
          element={isLoggedIn ? <WallOfFame /> : <Unauthorized />}
        />
      </Routes>
    </Router>
  );
}

export default App;
