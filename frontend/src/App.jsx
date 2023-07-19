// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Results from "./pages/Results";
import WallOfFame from "./pages/WallOfFame";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:step" element={<Game />} />
        <Route path="/results" element={<Results />} />
        <Route path="/walloffame" element={<WallOfFame />} />
      </Routes>
    </Router>
  );
}

export default App;
