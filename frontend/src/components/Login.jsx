/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useRef, useEffect, useContext } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ConfirmationModal from "./ConfirmationModal";

function Login({ openLoginModal, setOpenLoginModal }) {
  const { setUserPseudo, setIsLoggedIn } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState({ pseudo: "", password: "", password2: "" });
  const [alreadyUsedPseudo, setAlreadyUsedPseudo] = useState(false);
  const [wrongAssociation, setWrongAssociation] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const navigateTo = useNavigate();

  const resetParameters = () => {
    setUser({ pseudo: "", password: "", password2: "" });
    setAlreadyUsedPseudo(false);
    setWrongAssociation(false);
    setCurrentStep(1);
    setOpenLoginModal(false);
  };

  const handleLoginButtonClick = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/login`, user)
      .then((response) => {
        const { token } = response.data;
        Cookies.set("jwt", token, { secure: true, sameSite: "strict" });
        const jwtToken = Cookies.get("jwt");

        if (jwtToken) {
          const decodedToken = jwtDecode(jwtToken);
          const { pseudo } = decodedToken;
          Cookies.set("pseudo", pseudo);
          setUserPseudo(pseudo);
          setIsLoggedIn(true);
          navigateTo("/game");
        }
        setConfirmationModalOpen(true);
        resetParameters();
      })
      .catch((error) => {
        setWrongAssociation(true);
        console.error(error);
      });
  };

  const handleSignUpButtonClick = () => {
    if (user.password.length >= 8 && user.password === user.password2) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/signup`, user)
        .then(() => {
          setConfirmationModalOpen(true);
          navigateTo("/");
          resetParameters();
        })
        .catch((error) => {
          if (error.response.status === 409) {
            setAlreadyUsedPseudo(true);
          }
        });
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUser({ ...user, [id]: value });
  };

  function renderContent() {
    const loginButtonRef = useRef(null);

    useEffect(() => {
      function handleEnterKey(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          loginButtonRef.current.click();
        }
      }

      document.addEventListener("keydown", handleEnterKey);
      return () => {
        document.removeEventListener("keydown", handleEnterKey);
      };
    }, []);

    switch (currentStep) {
      case 0:
        return (
          <div className="loginModal flex flex-col items-center gap-5">
            <p className="text-4xl text-center font-semibold">Connecte-toi</p>
            <form className="flex flex-col gap-3 w-[70vw] sm:w-[350px]">
              <h3>Pseudo</h3>
              <input
                id="pseudo"
                type="text  "
                placeholder="Entre ton pseudo"
                onChange={(event) => handleInputChange(event)}
                value={user.pseudo}
              />
              <h3>Mot de passe</h3>
              <input
                id="password"
                type="password"
                placeholder="**********"
                onChange={(event) => handleInputChange(event)}
                value={user.password}
              />
            </form>
            <button
              ref={loginButtonRef}
              onClick={handleLoginButtonClick}
              type="button"
              className="w-[47%] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#257492] text-[#E3E4E2] font-semibold text-base  hover:font-bold"
            >
              Jouer !
            </button>
            {wrongAssociation ? (
              <div className="flex flex-col">
                <p className="text-red-500 text-sm italic">
                  Pseudo ou mot de passe incorrect.
                </p>
                <button
                  type="button"
                  className="text-sm underline"
                  onClick={() => {
                    setCurrentStep(2);
                    setUser({ pseudo: "", password: "", password2: "" });
                  }}
                >
                  S'inscrire ?
                </button>
              </div>
            ) : null}
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col items-center gap-5">
            <p className="text-4xl font-semibold">Bienvenue</p>
            <p className="text-xl font-semibold">Choisis une option</p>
            <div className="flex flex-col gap-3">
              <button
                className="w-[70vw] sm:w-[350px] sm h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#257492] text-[#E3E4E2] font-semibold text-base hover:font-bold"
                type="button"
                onClick={() => setCurrentStep(0)}
              >
                <p>Connexion</p>
              </button>
              <button
                className="w-[70vw] sm:w-[350px] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#E3E4E2] text-[#257492] font-semibold text-base  hover:font-bold"
                onClick={() => setCurrentStep(2)}
                type="button"
              >
                <p>Inscription</p>
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center justify-between gap-5">
            <p className="text-3xl font-semibold text-[#257492]">INSCRIPTION</p>
            <form className="flex flex-col gap-2 w-[70vw] sm:w-[350px]">
              <h3>Pseudo*</h3>
              <label htmlFor="pseudo">
                <input
                  className="border border-gray-300 rounded-[4px] p-1 w-[100%] outline-none"
                  type="text"
                  id="pseudo"
                  name="userpseudo"
                  placeholder="Choisis ton pseudo"
                  maxLength={50}
                  onChange={(event) => handleInputChange(event)}
                  value={user.pseudo}
                />
              </label>
              <h3>Mot de passe (8 caractères min.)*</h3>
              {user.password.length < 8 && user.password ? (
                <p className="text-red-500 text-xs italic">min. 8 caractères</p>
              ) : null}

              <label htmlFor="userpassword">
                <input
                  className="border border-gray-300 rounded-[4px] p-1 w-[100%] outline-none"
                  type="password"
                  id="password"
                  maxLength={255}
                  name="userPassword"
                  placeholder="Saisis un mot de passe"
                  onChange={(event) => handleInputChange(event)}
                  value={user.password}
                />
              </label>
              <div className="flex flex-col ">
                <h3>Confirmer le mot de passe*</h3>
                {user.password !== user.password2 ? (
                  <p className="text-red-500 text-xs italic">
                    Les mots de passe ne sont pas identiques
                  </p>
                ) : null}
              </div>
              <label htmlFor="userpassword">
                <input
                  className="border border-gray-300 rounded-[4px] p-1 w-[100%] outline-none"
                  type="password"
                  id="password2"
                  maxLength={255}
                  name="userPassword"
                  placeholder="Confirme ton mot de passe"
                  onChange={(event) => handleInputChange(event)}
                  value={user.password2}
                />
              </label>
            </form>
            <button
              ref={loginButtonRef}
              type="button"
              onClick={() => {
                handleSignUpButtonClick();
              }}
              className="w-[55%] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#257492] text-[#E3E4E2] font-semibold text-base  hover:font-bold"
            >
              Je m'inscris
            </button>
            {alreadyUsedPseudo ? (
              <p className="text-red-500 text-sm italic">
                Ce pseudo est déjà pris !
              </p>
            ) : null}
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <ReactModal
        isOpen={openLoginModal}
        onRequestClose={() => {
          setOpenLoginModal(false);
          setCurrentStep(1);
          setUser({ pseudo: "", password: "", password2: "" });
          setWrongAssociation(false);
          setAlreadyUsedPseudo(false);
        }}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
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
            padding: "32px",
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
        {renderContent()}
      </ReactModal>
      {confirmationModalOpen ? (
        <ConfirmationModal
          confirmationModalOpen={confirmationModalOpen}
          setConfirmationModalOpen={setConfirmationModalOpen}
        />
      ) : null}
    </>
  );
}

Login.propTypes = {
  openLoginModal: PropTypes.bool.isRequired,
  setOpenLoginModal: PropTypes.func.isRequired,
};

export default Login;
