import React, { useContext } from "react";
import ReactModal from "react-modal";
import GameContext from "../../context/GameContext";

function GameModal() {
  const { gameModalOpen, setGameModalOpen, expectedDistance } =
    useContext(GameContext);
  return (
    <ReactModal
      isOpen={gameModalOpen}
      onRequestClose={() => setGameModalOpen(false)}
      ariaHideApp={false}
    >
      <p>Distance attenduee : {expectedDistance}</p>
    </ReactModal>
  );
}

export default GameModal;
