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
    <>
      <h1>Trouve les distances entre les villes et deviens le GEOBOSS</h1>
      <button
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
    </>
  );
}

export default Home;
