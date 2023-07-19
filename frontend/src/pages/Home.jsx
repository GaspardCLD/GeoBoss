import React, { useState } from "react";
import Login from "../components/Login";

function Home() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
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
