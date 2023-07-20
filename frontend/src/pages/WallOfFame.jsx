import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import StatesContext from "../../context/StatesContext";
import GameContext from "../../context/GameContext";

function WallOfFame() {
  const navigateTo = useNavigate();
  const { setGameStep } = useContext(GameContext);
  const { userPseudo, isLoggedIn } = useContext(AuthContext);
  const { setOpenLoginModal } = useContext(StatesContext);
  const [allScores, setAllScores] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/scores/ordered`)
      .then((response) => {
        setAllScores(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center my-[8vh] gap-6">
      <p className="text-center font-bold text-4xl mb-[32px]">WALL OF FAME</p>
      <ol>
        {allScores.map((score, index) => (
          <li
            key={score.id}
            className={
              score.user_name === userPseudo && userPseudo !== ""
                ? "text-[#257492] font-bold"
                : "text-black"
            }
          >
            <span
              className={
                index < 3
                  ? "text-3xl font-bold"
                  : (index === 2 && "text-xl font-normal mb-[100px]") ||
                    "text-xl font-normal"
              }
            >
              {index + 1}. {score.user_name} - {score.score}
            </span>
          </li>
        ))}
      </ol>
      <button
        className="w-[50vw] sm:w-[350px] sm h-[44px] flex justify-center items-center mt-[32px] shadow-xs rounded-[20px] px-[8px] mb-[32px]   bg-[#257492] text-[#E3E4E2] font-semibold text-base hover:font-bold"
        type="button"
        onClick={() => {
          if (!isLoggedIn) {
            setOpenLoginModal(true);
          } else {
            setGameStep(0);
            navigateTo("/game");
          }
        }}
      >
        On fait mieux ?
      </button>
    </div>
  );
}

export default WallOfFame;
