import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import StatesContext from "../../context/StatesContext";
import AuthContext from "../../context/AuthContext";
import GameContext from "../../context/GameContext";

function Home() {
  const navigateTo = useNavigate();
  const { setGameStep } = useContext(GameContext);
  const { openLoginModal, setOpenLoginModal } = useContext(StatesContext);
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="home flex flex-col justify-between gap-10 my-[15vh] mx-[15vw] items-center flex-1">
      <h1 className="text-center text-4xl">
        Trouve les distances entre les villes et deviens le
      </h1>
      <p className="font-bold text-6xl">GEOBOSS</p>
      <button
        className="w-[50vw] sm:w-[350px] sm h-[44px] flex justify-center items-center  shadow-xs rounded-[20px] px-[8px]   bg-[#257492] text-[#E3E4E2] font-semibold text-base hover:font-bold"
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
        Commencer
      </button>
      <Login
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />
    </div>
  );
}

export default Home;
