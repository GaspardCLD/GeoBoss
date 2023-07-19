import React, { useContext } from "react";
import GameContext from "../../context/GameContext";

function Results() {
  const { currentScore } = useContext(GameContext);
  return (
    <div>
      <p>Tu as eu le score de {currentScore}</p>
    </div>
  );
}

export default Results;
