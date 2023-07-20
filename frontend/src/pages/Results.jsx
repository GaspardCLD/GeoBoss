import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GameModal from "./GameModal";
import GameContext from "../../context/GameContext";

function Results() {
  const { currentScore, setGameStep, setCurrentScore } =
    useContext(GameContext);
  const [userRank, setUserRank] = useState(0);
  const [numberOfScores, setNumberOfScores] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/scores/all`)
      .then((response) => {
        setNumberOfScores(response.data.length);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/score/${currentScore}/rank/`)
      .then((response) => {
        setUserRank(response.data.rank);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <>
      <div className="flex flex-col">
        <p>Ton score est de </p>
        <p> {currentScore}</p>

        <p>Bravo, tu te classes</p>
        <p>
          {" "}
          {userRank} / {numberOfScores}
        </p>
        <Link
          to="/game"
          onClick={() => {
            setGameStep(0);
          }}
        >
          Rejouer ?
        </Link>
        <Link to="/" onClick={() => setCurrentScore(0)}>
          Retour à l'accueil
        </Link>
      </div>
      <GameModal />
    </>
  );
}

export default Results;
