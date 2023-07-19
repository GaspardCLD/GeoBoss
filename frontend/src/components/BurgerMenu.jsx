/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import StatesContext from "../../context/StatesContext";
import arrow from "../assets/arrow.png";
import Login from "./Login";

function BurgerMenu({ burgerMenuOpen, setBurgerMenuOpen }) {
  const { setOpenLoginModal } = useContext(StatesContext);
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      zIndex: 1000,
    },
  };
  return (
    <>
      <ReactModal
        isOpen={burgerMenuOpen}
        onRequestClose={() => setBurgerMenuOpen(false)}
        ariaHideApp={false}
        className="w-[90vw] shadow-md z-20  drop-shadow-sm rounded-lg flex flex-col items-center mx-auto my-[8px]font-bold text-xl px-[20px] py-[10px] mt-[60px] justify-between gap-4 bg-white"
        style={customModalStyles}
      >
        <Link
          to="/"
          className="flex w-[100%] justify-between items-center py-[4px]"
          onClick={() => setBurgerMenuOpen(false)}
        >
          ACCUEIL
          <img src={arrow} alt="flèche" />
        </Link>
        <Link
          to="/walloffame"
          className="flex w-[100%] justify-between items-center pt-[4px]"
          onClick={() => {
            setBurgerMenuOpen(false);
            setOpenLoginModal(true);
          }}
        >
          INSCRIPTION / CONNEXION
          <img src={arrow} alt="flèche" />
        </Link>
        <Link
          to="/rules"
          className="flex w-[100%] justify-between items-center py-[4px]"
          onClick={() => setBurgerMenuOpen(false)}
        >
          REGLES DU JEU
          <img src={arrow} alt="flèche" />
        </Link>
        <Link
          to="/walloffame"
          className="flex w-[100%] justify-between items-center pt-[4px]"
          onClick={() => setBurgerMenuOpen(false)}
        >
          WALL OF FAME
          <img src={arrow} alt="flèche" />
        </Link>
      </ReactModal>
      <Login />
    </>
  );
}

BurgerMenu.propTypes = {
  burgerMenuOpen: PropTypes.bool.isRequired,
  setBurgerMenuOpen: PropTypes.func.isRequired,
};

export default BurgerMenu;
