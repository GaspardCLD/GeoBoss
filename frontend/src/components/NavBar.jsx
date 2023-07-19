/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import { Turn as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";

function NavBar() {
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

  return (
    <div className="w-[100%] z-10  top-0 left-0">
      <div className="navbar-header flex justify-between items-center bg-[#257492] h-[52px] lg:h-[60px] px-3 shadow-[0px_-3px_15px_#333]">
        <img
          className="logo h-[35px] w-auto sm:h-[55px] "
          src="../assets/logo.svg"
          alt="logo"
        />
        <div className="desktopLinks hidden lg:flex navbar-links items-center gap-[120px] text-white ">
          <Link to="/" className="hover:font-medium flex items-center w-[28px]">
            <p>HOME</p>
          </Link>
          <Link
            to="/rules"
            className="hover:font-medium flex items-center w-[28px]"
          >
            <p>REGLES</p>
          </Link>
          <Link
            to="/walloffame"
            className="hover:font-medium flex items-center w-[28px] whitespace-nowrap"
          >
            <p>Wall of fame</p>
          </Link>
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
