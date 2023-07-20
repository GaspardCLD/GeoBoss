import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import GameContext from "../../context/GameContext";

function Rules() {
  const { isLoggedIn, setOpenLoginModal } = useContext(AuthContext);
  const { setGameStep } = useContext(GameContext);
  const navigateTo = useNavigate();
  return (
    <div className="flex flex-col items-center mx-[6vw] my-[5vw]">
      <h1 className="text-2xl font-bold mb-4">Règles du jeu</h1>
      <p className="text-center font-bold">
        Bienvenue dans le jeu GeoBoss ! <br />
      </p>
      <br />
      <p>
        L'objectif du jeu est de deviner le plus précisément possible la
        distance en kilomètres entre deux villes françaises.
      </p>
      <ol className="text-left mt-4">
        <li>Le jeu vous présente plusieurs fois deux villes aléatoires.</li>
        <li>
          Vous devez deviner la distance entre ces deux villes en kilomètres
          dans la zone de saisie.
        </li>
        <li>
          Après avoir soumis votre estimation, le jeu vous indiquera la distance
          réelle entre les deux villes et la précision de votre réponse.
        </li>
        <br />
        <li>
          Plus votre estimation est proche de la distance réelle, plus votre
          score sera élevé.
        </li>

        <li>
          Après 5 étapes, votre score final et votre classement sont révélés.
        </li>
      </ol>
      <p className="mt-4">Prêt à commencer ? </p>
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
