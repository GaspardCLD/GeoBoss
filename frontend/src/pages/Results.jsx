import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GameModal from "./GameModal";
import GameContext from "../../context/GameContext";

function Results() {
  const { currentScore, setGameStep, setCurrentScore, setUserResponse } =
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
        setUserRank(response.data.rank - 1);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <>
      <div className="flex flex-col items-center h-[100%] justify-between gap-6 my-[10vw]">
        <p className="text-3xl">Ton score est de </p>
        <p className="text-8xl text-[#257492] font-bold">
          {" "}
          {currentScore} <span className="text-6xl">pts</span>
        </p>

        <p className="text-3xl">Bravo, tu te classes</p>
        <p className="text-6xl text-[#257492] font-bold">
          {" "}
          {userRank} / {numberOfScores}
        </p>
        <div className="flex flex-col items-center gap-4 mt-[6vh] ">
          <Link
            to="/game"
            className="w-[70vw] sm:w-[350px] sm h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#257492] text-[#E3E4E2] font-semibold text-base hover:font-bold"
            onClick={() => {
              setGameStep(0);
              setUserResponse("");
            }}
          >
            Rejouer ?
          </Link>
          <Link
            to="/"
            className="w-[70vw] sm:w-[350px] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#E3E4E2] text-[#257492] font-semibold text-base  hover:font-bold"
            onClick={() => {
              setCurrentScore(0);
              setUserResponse("");
            }}
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
      <GameModal />
    </>
  );
}

export default Results;
