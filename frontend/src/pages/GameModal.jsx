import React, { useContext, useEffect } from "react";
import ReactModal from "react-modal";
import GameContext from "../../context/GameContext";

function GameModal() {
  const {
    gameModalOpen,
    setGameModalOpen,
    expectedDistance,
    userResponse,
    setUserResponse,
    gameStep,
  } = useContext(GameContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGameModalOpen(false);
      if (gameStep <= 5) {
        setUserResponse("");
      }
    }, 1500);
    return () => clearTimeout(timeout);
  }, [gameModalOpen]);

  const PercentageOfPrecision = Math.round(
    Math.abs((expectedDistance - userResponse) / expectedDistance) * 100
  );

  return (
    <ReactModal
      isOpen={gameModalOpen}
      onRequestClose={() => {
        setGameModalOpen(false);
        if (gameStep <= 5) {
          setUserResponse("");
        }
      }}
      ariaHideApp={false}
    >
      <div>
        <p>Distance attenduee : {expectedDistance}</p>
        <p>Tu as été précis à {PercentageOfPrecision} % !</p>
      </div>
    </ReactModal>
  );
}

export default GameModal;
