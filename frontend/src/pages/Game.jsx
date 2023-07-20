import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import GameContext from "../../context/GameContext";
import StatesContext from "../../context/StatesContext";
import GameModal from "./GameModal";

function Game() {
  const [randomReady, setRandomReady] = useState(false);
  const [userBestScoreLoaded, setUserBestScoreLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    userBestScore,
    setUserBestScore,
  } = useContext(GameContext);
  const { citiesLoaded } = useContext(StatesContext);

  useEffect(() => {
    const userId = parseInt(Cookies.get("id"), 10);

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/score/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      })
      .then((response) => {
        setUserBestScore(
          response.data.length !== 0 ? response.data[0].score : 0
        );
      })
      .then(() => {
        setUserBestScoreLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (gameStep === 0) {
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/cities/resetusage`)
        .then(() => {
          setCurrentScore(0);
          setGameStep(1);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [gameStep]);

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
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [citiesLoaded, gameStep]);

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
    const city1 = cities[0];
    const city2 = cities[1];
    const currentDistance = Math.round(calculateDistance(city1, city2));
    const difference = Math.abs(currentDistance - userResponse);
    setExpectedDistance(currentDistance);

    if (difference <= currentDistance) {
      setCurrentScore(
        currentScore + Math.round((1 - difference / currentDistance) * 200)
      );
    }
    setGameModalOpen(true);

    if (gameStep <= 4) {
      setGameStep(gameStep + 1);
    } else {
      setGameStep(gameStep + 1);
      const userId = parseInt(Cookies.get("id"), 10);
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/score/${userId}/${
            currentScore + Math.round((1 - difference / currentDistance) * 200)
          }`
        )
        .then(() => {
          navigateTo("/results");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleValidateClick();
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    citiesLoaded && userBestScoreLoaded && randomReady && (
      <>
        <div className="flex flex-col gap-7 items-center my-[10vh] h-[100%]">
          <h1 className="text-center text-4xl mx-[10vw]">
            Quelle est la distance entre{" "}
          </h1>
          <div className="flex justify-between items-center w-[90vw] text-3xl">
            <h3 className="shadow-xs rounded-[8px] px-[8px] border border-solid border-gray-400  w-[40vw] flex justify-center text-center py-auto">
              {cities[0].name}
            </h3>
            <h3 className="shadow-xs rounded-[8px] px-[8px] border border-solid border-gray-400  w-[40vw] flex justify-center text-center ">
              {cities[1].name}
            </h3>
          </div>
          <div className="flex items-center gap-2 mt-[5vh]">
            <input
              className="w-[50vw] sm:w-[350px] h-[44px] flex justify-center items-center shadow-xs rounded-[5px] px-[8px] border border-solid border-gray-300 text-center text-2xl"
              id="userResponse"
              type="text"
              inputMode="numeric"
              pattern="^[0-9]*$"
              placeholder="Entrer une valeur"
              onChange={(event) => handleUserResponse(event)}
              value={userResponse}
              onKeyPress={handleKeyPress}
            />
            <h3 className="text-xl font-bold">Km</h3>
          </div>
          <button
            className={`w-[30vw] sm:w-[350px] h-[44px] flex justify-center items-center shadow-xs rounded-[25px] px-[8px] border border-solid border-[#257492] bg-[${
              gameStep <= 4 ? "#FFFFFF" : "#257492"
            }] text-[${
              gameStep <= 4 ? "#257492" : "#E3E4E2"
            }] font-semibold text-base hover:font-bold`}
            type="button"
            onClick={() => {
              handleValidateClick();
            }}
          >
            {gameStep <= 4 ? "Suivant" : "Terminer"}
          </button>
          <div className="flex justify-between items-center w-full px-[5vw]">
            <div>
              <p>
                Score : <span className="font-bold"> {currentScore}</span>
              </p>
              <p>
                Ton meilleur score :{" "}
                <span className="font-bold">{userBestScore}</span>
              </p>
            </div>
            <p className="text-xl font-bold">{gameStep}/5</p>
          </div>
        </div>
        <GameModal />
      </>
    )
  );
}
export default Game;
