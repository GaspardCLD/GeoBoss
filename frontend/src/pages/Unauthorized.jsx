/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div>
      <h1>Unauthorized</h1>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
}

export default Unauthorized;
