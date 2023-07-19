import React, { useState, useRef, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactModal from "react-modal";
import PropTypes from "prop-types";

function Login({ openLoginModal, setOpenLoginModal }) {
  const [currentStep, setCurrentStep] = useState(1);
  const alibi = "";

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
            <p className="text-4xl font-semibold">Connectez-vous</p>
            <form className="flex flex-col gap-3 w-[70vw] sm:w-[350px]">
              <h3>Pseudo</h3>
              <input
                id="email"
                type="email"
                placeholder="user@domain.com"
                value={alibi}
              />
              <h3>Mot de passe</h3>
              <input id="password" type="password" value={alibi} />
            </form>
            <button
              ref={loginButtonRef}
              onClick={alibi}
              type="button"
              className="w-[47%] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#257492] text-[#E3E4E2] font-semibold text-base  hover:font-bold"
            >
              Connexion
            </button>
            {/* {wrongAssociation ? (
              <p className="text-red-500 text-sm italic">
                Email ou mot de passe incorrect
              </p>
            ) : null} */}
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col items-center gap-5">
            <p className="text-4xl font-semibold">Bienvenue</p>
            <p className="text-xl font-semibold">Choisissez une option</p>
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
            <form className="flex flex-col gap-3 w-[70vw] sm:w-[350px]">
              <h3>Pseudo*</h3>
              <label htmlFor="lastname">
                <input
                  className="border border-gray-300 rounded-[4px] p-1 w-[100%] outline-none"
                  type="text"
                  id="lastname"
                  name="userLastname"
                  placeholder="Saisissez votre nom"
                  maxLength={255}
                  value={alibi}
                />
              </label>

              <h3>Mot de passe*</h3>
              <label htmlFor="firstname">
                <input
                  className="border border-gray-300 rounded-[4px] p-1 w-[100%] outline-none"
                  type="text"
                  id="firstname"
                  maxLength={255}
                  name="userFirstname"
                  placeholder="Saisissez votre prénom"
                  value={alibi}
                />
              </label>
            </form>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <ReactModal
      isOpen={openLoginModal}
      onRequestClose={() => {
        setOpenLoginModal(false);
      }}
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
  );
}

Login.propTypes = {
  openLoginModal: PropTypes.bool.isRequired,
  setOpenLoginModal: PropTypes.func.isRequired,
};

export default Login;
