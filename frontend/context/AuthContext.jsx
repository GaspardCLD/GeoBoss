/* eslint-disable import/no-extraneous-dependencies */
import React, { createContext, useState, useMemo, useEffect } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
  const [userPseudo, setUserPseudo] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const storedPseudo = Cookies.get("pseudo");
    if (storedPseudo) {
      setUserPseudo(storedPseudo);
      setIsLoggedIn(true);
    }
  }, []);

  const authValue = useMemo(() => ({
    userPseudo,
    setUserPseudo,
    isLoggedIn,
    setIsLoggedIn,
    userID,
    setUserID,
  }));

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
