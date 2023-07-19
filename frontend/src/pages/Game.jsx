import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GameContext from "../../context/GameContext";
import StatesContext from "../../context/StatesContext";
import GameModal from "./GameModal";

function Game() {
  const [toggleFetch, setToggleFetch] = useState(false);
  const [randomReady, setRandomReady] = useState(false);

  const navigateTo = useNavigate();

  const {
    cities,
    setCities,
    userResponse,
    setUserResponse,
    currentScore,
    setCurrentScore,
    setGameModalOpen,
    setExpectedDistance,
    gameStep,
    setGameStep,
  } = useContext(GameContext);
  const { citiesLoaded } = useContext(StatesContext);

  useEffect(() => {
    if (citiesLoaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/cities/random`)
        .then((response) => {
          setCities(response.data);
        })
        .then(() => {
          setRandomReady(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [citiesLoaded, toggleFetch]);

  const handleUserResponse = (event) => {
    setUserResponse(event.target.value);
  };

  function degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }

  function calculateDistance(city1, city2) {
    const earthRadiusKm = 6371; // Earth's radius in kilometers

    const lat1 = city1.lat;
    const lon1 = city1.lon;
    const lat2 = city2.lat;
    const lon2 = city2.lon;

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    return distance;
  }

  const handleValidateClick = () => {
    if (gameStep <= 4) {
      const city1 = cities[0];
      const city2 = cities[1];
      const currentDistance = Math.round(calculateDistance(city1, city2));
      const difference = Math.abs(currentDistance - userResponse);
      setExpectedDistance(currentDistance);

      if (difference > currentDistance) {
        setUserResponse("");
        setToggleFetch(!toggleFetch);
      } else {
        setCurrentScore(
          currentScore + Math.round((1 - difference / currentDistance) * 200)
        );
        setUserResponse("");
        setGameModalOpen(true);
        setGameStep(gameStep + 1);
        setToggleFetch(!toggleFetch);
      }
    } else {
      setGameModalOpen(true);
      navigateTo("/results");
    }
  };

  return (
    citiesLoaded &&
    randomReady && (
      <>
        <div className="flex flex-col  items-center">
          <h1>Quelle est la distance entre </h1>
          <div className="flex justify-between w-[80vw] ">
            <h3 className="border border-solid w-[35vw] flex justify-center ">
              {cities[0].name}
            </h3>
            <h3 className="border border-solid w-[35vw] flex justify-center">
              {cities[1].name}
            </h3>
          </div>
          <div className="flex">
            <input
              id="userResponse"
              type="number"
              placeholder="Entrer une valeur"
              onChange={(event) => handleUserResponse(event)}
              value={userResponse}
            />
            <h3>Km</h3>
          </div>
          <button
            type="button"
            onClick={() => {
              handleValidateClick();
            }}
          >
            {gameStep <= 4 ? "Suivant" : "Terminer"}
          </button>
          <p>Score : {currentScore}</p>
          <p>Etape : {gameStep}/5</p>
        </div>
        <GameModal />
      </>
    )
  );
}
export default Game;
