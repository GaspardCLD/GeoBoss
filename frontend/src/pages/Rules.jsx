import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import GameContext from "../../context/GameContext";
import StatesContext from "../../context/StatesContext";

function Rules() {
  const { isLoggedIn } = useContext(AuthContext);
  const { setGameStep } = useContext(GameContext);
  const { setOpenLoginModal } = useContext(StatesContext);
  const navigateTo = useNavigate();
  return (
    <div className="flex flex-col items-center mx-[6vw] my-[5vw]">
      <h1 className="text-2xl font-bold mb-4">Règles du jeu</h1>
      <p className="text-center font-bold">
        Bienvenue dans le jeu GeoBoss ! <br />
      </p>
      <br />

      <ol className="text-left mt-4">
        <p>
          L'objectif du jeu est de deviner le plus précisément possible la
          distance en kilomètres entre deux villes françaises pour te rapprocher
          des 1000 points.
        </p>
        <br />
        <li>Le jeu te présente plusieurs fois deux villes aléatoires.</li>
        <li>
          Tu dois deviner la distance entre ces deux villes en kilomètres.
        </li>
        <li>
          Après avoir soumis ton estimation, le jeu t'indiquera la distance
          réelle entre les deux villes et la précision de ta réponse.
        </li>
        <br />
        <li>
          Plus ton estimation est proche de la distance réelle, plus ton score
          sera élevé.
        </li>

        <li>Après 5 étapes, ton score final et ton classement sont révélés.</li>
      </ol>
      <p className="mt-4 font-bold">Prêt à te lancer ? </p>
      <br />

      <button
        className="w-[50vw] sm:w-[350px] sm h-[44px] flex justify-center items-center  shadow-xs rounded-[20px] px-[8px] mb-[8vw]   bg-[#257492] text-[#E3E4E2] font-semibold text-base hover:font-bold"
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
    </div>
  );
}

export default Rules;
