import React, { useContext } from "react";
import Login from "../components/Login";
import StatesContext from "../../context/StatesContext";

function Home() {
  const { openLoginModal, setOpenLoginModal } = useContext(StatesContext);
  return (
    <>
      <h1>Trouve les distances entre les villes et deviens le GEOBOSS</h1>
      <button type="button" onClick={() => setOpenLoginModal(true)}>
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
