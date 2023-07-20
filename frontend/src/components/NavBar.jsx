/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useContext } from "react";
import { Turn as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import BurgerMenu from "./BurgerMenu";
import logo from "../assets/geoguess_logo.png";
import AuthContext from "../../context/AuthContext";
import StatesContext from "../../context/StatesContext";

function NavBar() {
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { setOpenLoginModal } = useContext(StatesContext);

  const handleLogOut = () => {
    Cookies.remove("pseudo");
    setIsLoggedIn(false);
    setBurgerMenuOpen(false);
  };
  return (
    <div className="w-[100%] z-10  top-0 left-0 ">
      <div className="navbar-header flex justify-between items-center bg-[#257492] h-[58px] lg:h-[64px] px-3 shadow-[0px_-3px_15px_#333]">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img
              className="logo h-[55px] w-auto sm:h-[55px] m-[4px] "
              src={logo}
              alt="logo"
            />
          </Link>{" "}
          <h1 className="text-3xl font-bold text-white">GeoBoss</h1>
        </div>
        <div className="desktopLinks hidden text-center lg:flex navbar-links items-center gap-[120px] text-white ">
          <Link
            to="/"
            className="flex w-[100%] justify-between items-center whitespace-nowrap py-[4px]"
            onClick={() => setBurgerMenuOpen(false)}
          >
            ACCUEIL
          </Link>
          {!isLoggedIn && (
            <button
              type="button"
              className="flex w-[100%] justify-between whitespace-nowrap items-center py-[4px]"
              onClick={() => {
                setBurgerMenuOpen(false);
                setOpenLoginModal(true);
              }}
            >
              INSCRIPTION / CONNEXION
            </button>
          )}
          <Link
            to="/rules"
            className="flex w-[100%] justify-between whitespace-nowrap items-center py-[4px]"
            onClick={() => setBurgerMenuOpen(false)}
          >
            REGLES DU JEU
          </Link>
          <Link
            to="/walloffame"
            className="flex w-[100%] justify-between whitespace-nowrap items-center py-[4px]"
            onClick={() => setBurgerMenuOpen(false)}
          >
            WALL OF FAME
          </Link>
          {isLoggedIn && (
            <Link
              to="/"
              className="flex w-[100%] justify-between items-center py-[4px]"
              onClick={() => {
                handleLogOut();
              }}
            >
              DECONNEXION
            </Link>
          )}
        </div>
        <div className="navbar-links flex items-center gap-1.7 sm:gap-[10px] ">
          <div className="Hamburger lg:hidden">
            <Hamburger
              color="#fff"
              size={24}
              toggled={burgerMenuOpen}
              toggle={setBurgerMenuOpen}
            />
          </div>
        </div>
      </div>

      <BurgerMenu
        burgerMenuOpen={burgerMenuOpen}
        setBurgerMenuOpen={setBurgerMenuOpen}
      />
    </div>
  );
}

export default NavBar;
