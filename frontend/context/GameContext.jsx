import React, { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const GameContext = createContext();

export default GameContext;

export function GameProvider({ children }) {
  const [currentScore, setCurrentScore] = useState(0);
  const [cities, setCities] = useState([
    { name: "", id: "" },
    { name: "", id: "" },
  ]);
  const [currentStep, setCurrentStep] = useState(1);
  const [userResponse, setUserResponse] = useState("");

  const GameValue = useMemo(() => ({
    currentScore,
    setCurrentScore,
    cities,
    setCities,
    currentStep,
    setCurrentStep,
    userResponse,
    setUserResponse,
  }));

  return (
    <GameContext.Provider value={GameValue}>{children}</GameContext.Provider>
  );
}

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
