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

  const PercentageOfPrecision =
    100 -
    Math.round(
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
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.15)",
          zIndex: 1000,
          backdropFilter: "blur(6px)",
        },
        content: {
          backgroundColor: "#fff",
          color: "#000",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px",
          height: "fit-content",
          width: "fit-content",
          maxWidth: "90vw",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "15px",
        },
      }}
    >
      <div className="flex flex-col gap-7 items-center">
        <p className="text-3xl">
          Distance attenduee :{" "}
          <span className="font-bold text-[#257492]">{expectedDistance}</span>
        </p>
        <p className="text-2xl">
          Tu as été précis à{" "}
          <span className="font-bold text-[#257492] ">
            {PercentageOfPrecision}
          </span>{" "}
          % !
        </p>
      </div>
    </ReactModal>
  );
}

export default GameModal;
